//@ts-nocheck

import {
  Environment,
  LensClient,
  ProfileFragment,
  development,
  production,
} from "@lens-protocol/client";
import MetaMaskSDK from "@metamask/sdk";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState, setVerified } from "../slices/auth.slice";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import { useState } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isElegible, lensHandle, authendicate, lensProfile, isAuthendicated } =
    useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const authenticate = async () => {
    try {
      const lensClient = new LensClient({
        environment: production,
      });

      const MMSDK = new MetaMaskSDK();
      const ethereum = MMSDK.getProvider();

      setIsLoading(true);
      const wallet = await ethereum?.request({
        method: "eth_requestAccounts",
        params: [],
      });

      const address = wallet[0];

      let isAuthenticated = await lensClient.authentication.isAuthenticated();

      if (!isAuthenticated) {
        console.log("insiode if block");
        const challenge = await lensClient.authentication.generateChallenge(
          address
        );
        console.log(challenge);
        const sign = await ethereum?.request({
          method: "personal_sign",
          params: [address, challenge],
        });
        console.log(sign);
        await lensClient.authentication.authenticate(address, String(sign));
      }

      isAuthenticated = await lensClient.authentication.isAuthenticated();

      if (isAuthenticated) {
        const allOwnedProfiles = await lensClient.profile.fetchAll({
          ownedBy: address,
        });

        console.log("all ownered profile", allOwnedProfiles.items);
        if (allOwnedProfiles.items?.length <= 0) {
          toast.error(
            "You dont own any lens profile. please switch the wallet and try again!!"
          );
        } else {
          console.log("code was here------------");
          const request = await axios.post(
            `${BACKEND_BASE_URL}/user/register`,
            {
              lensProfile: allOwnedProfiles.items[0],
            }
          );

          if (request.status === 200 || request.status === 201) {
            const { data } = await axios.get(
              `${BACKEND_BASE_URL}/user/${request.data.user.lensHandle}`
            );

            if (data?.user?.isVerified) {
              dispatch(setVerified(true));
            }

            toast.success("Signing in success!!");
            dispatch(setAuthState(request.data.user));

            //check for verification tick marl
          }
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong...");
      console.log("auth error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { authenticate, isLoading };
};
