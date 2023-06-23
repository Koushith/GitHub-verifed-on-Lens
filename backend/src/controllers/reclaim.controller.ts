// =post - email, repo and generate template url

import { PrismaClient } from "@prisma/client";
import { Proof, reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import { generateUuid } from "@reclaimprotocol/reclaim-sdk/dist/utils";
import { Request, Response } from "express";
import { extractUsernameFromRepoLink, isValidRepo } from "../utils";
import { isEqual } from "lodash";

const prisma = new PrismaClient();
const reclaim = new reclaimprotocol.Reclaim();

export const initSession = async (req: Request, res: Response) => {
  const { email, repoFullName, lensProfile, repoLink } = req.body;
  console.log("email-", repoLink);

  const extractGitUserName = extractUsernameFromRepoLink(repoLink);
  console.log("extractedGituser name", extractGitUserName);

  const CALLBACK_URL = process.env.CALLBACK_URL! + "/" + "callback/";
  const CALLBACK_PREFIX = "gitlens-";

  if (!email && !repoFullName) {
    res.status(400).json({
      message: "email and github are required",
    });
    return;
  }
  try {
    const isEmailExist = await prisma.gitLinks.findMany({
      where: {
        email: { equals: email },
        status: { equals: "VERIFIED" },
      },
    });

    if (isEmailExist.length > 0) {
      res.status(200).json({
        status: 302,
        message: "Email already exist and it is verified",
        data: isEmailExist,
      });
    } else {
      const callbackId = CALLBACK_PREFIX + generateUuid();
      const template = reclaim
        .connect(
          "Github",
          [
            {
              provider: "github-commits",
              payload: {
                repository: repoFullName,
                type: "github-commits",
                searchQuery: {
                  keywords: [],
                  qualifiers: {},
                },
              },
              templateClaimId: reclaimprotocol.utils.generateUuid(),
            },
          ],
          CALLBACK_URL
        )
        .generateTemplate(callbackId);

      const templateUrl = template.url;
      const templateId = template.id;

      const record = await prisma.gitLinks.create({
        data: {
          callback_id: callbackId,
          email: email,
          repo: repoFullName,
          template_id: templateId,
          template_url: templateUrl,
          status: "PENDING",
          isVerified: false,
          lensProfile: lensProfile,
        },
      });
      //add reponame to user schema
      await prisma.user.updateMany({
        where: {
          lensHandle: lensProfile,
        },
        data: {
          github: extractGitUserName,
          email: email,
        },
      });
      if (reclaim) {
        res.status(200).json({
          message: "record created",
          callbackId: record.callback_id,
          templateUrl: record.template_url,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "something wrong.. couldnt create a cb url",
      error: error,
    });
  }
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const callbackId = req.params.id;
    console.log("callback id", callbackId);
    if (!callbackId) {
      res.send("callbackid is required");
      return;
    }

    const query = await prisma.gitLinks.findFirst({
      where: {
        callback_id: callbackId,
      },
    });

    console.log(query);

    if (!query) {
      res.status(404).send(`404 - Not Found: CallbackId not found`);
      return;
    }

    res.status(200).json({
      query,
    });
  } catch (error) {
    res.status(500).json({
      message: "Soeme error occured while fetching the status",
      error,
    });
  }
};

export const responseFromReclaimWallet = async (
  req: Request,
  res: Response
) => {
  console.log(req.params);
  console.log("route was here");
  if (!req.params.callbackId) {
    res.status(400).send(`400 - Bad Request: callbackId is required`);
    return;
  }

  if (!req.body) {
    res.status(400).send(`400 - Bad Request: body is required`);
    return;
  }
  try {
    let reqBody: any;

    reqBody = JSON.parse(decodeURIComponent(req.body));

    if (!reqBody.proofs || !reqBody.proofs.length) {
      res.status(400).send(`400 - Bad Request: proofs are required`);
      return;
    }

    const callbackId = req.params.callbackId;
    const proofs = reqBody.proofs as Proof[];

    console.log("proofs array", proofs);
    console.log("callback id", callbackId);

    // verify the proof
    const isValidProofs = await reclaim.verifyCorrectnessOfProofs(proofs);

    console.log("is valid proof-----", isValidProofs);

    //check if proof already exists
    const existingProofs = await prisma.gitLinks.findMany({
      select: {
        proofs: true,
      },
      where: {
        status: "VERIFIED",
      },
    });

    const combinedArray: Proof["onChainClaimId"][] = [];

    existingProofs.forEach((item) => {
      if (item.proofs) {
        try {
          const parsedProofs = JSON.parse(item.proofs) as Proof[];
          parsedProofs.forEach((item) => {
            combinedArray.push(item.onChainClaimId);
          });
        } catch (error) {
          throw new Error(`Error parsing JSON for item: ${item.proofs}`);
        }
      }
    });

    let isExistingProof = false;

    proofs.forEach((proof) => {
      const isProofsExists = combinedArray.some((item) =>
        isEqual(item, proof.onChainClaimId)
      );
      if (isProofsExists) {
        isExistingProof = true;
      }
    });

    if (isExistingProof) {
      res.status(400).send(`Existing proof exists`);
      return;
    }

    if (!isValidProofs || isExistingProof) {
      res.status(400).send(`Bad requests. Invalid proofs`);
      return;
    }

    const record = await prisma.gitLinks.findFirst({
      where: {
        callback_id: callbackId,
      },
    });

    if (!record) {
      res.status(404).send("Callback id not found");
      return;
    }
    console.log("record---final--", record);
    if (record.status === "VERIFIED") {
      res.status(400).send(`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0">
      </head>
      <body style="height: 100vh;">
	  <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <p style='text-align: center; font-size: 20px;'>
           Oops! This claim is already verified!
       </p>
	   </div>
      </body>
    </html>`);
      return;
    }
    //todo- fetch user table and update-> we are storing email aswell. use .lens handle as ref and update it

    await prisma.gitLinks.update({
      where: {
        id: record.id,
      },
      data: {
        isVerified: true,
        status: "VERIFIED",
        proofs: JSON.stringify(proofs),
      },
    });

    // update user's email

    await prisma.user.updateMany({
      where: {
        lensHandle: record.lensProfile!,
      },
      data: {
        email: record.email,
        isVerified: true,
      },
    });

    const htmlResponse = `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0">
      </head>
      <body style="height: 100vh;">
	  <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <p style='text-align: center; font-size: 20px;'>
           Congratulations on verifying your contribution to the repository! You are now Verified
       </p>
	   </div>
      </body>
    </html>`;

    res.send(htmlResponse);
  } catch (error) {
    res.status(500).send(`Some error occured ${error}`);
  }
};
