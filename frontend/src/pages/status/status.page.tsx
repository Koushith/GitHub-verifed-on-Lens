import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "../../components/primitives";
import { VerifyContainer, StyledDiv } from "./status.styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #005ef6;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spinAnimation} 1s linear infinite;
  margin-right: 8px;
`;

const ProgressStatus = styled.div`
  margin-top: 16px;
  gap: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border: 1px solid #d9e1ec;
  padding: 2rem;
  border-radius: 4px;
`;

export const StatusPage = () => {
  let appUrl,
    callbackId = true;
  return (
    <StyledDiv className="verify">
      {/* <GoBack style={{ maxWidth: "50rem", margin: "1rem auto" }} /> */}
      <VerifyContainer>
        {appUrl && callbackId ? (
          <QRCode appUrl={"appUrl"} />
        ) : (
          <div className="form-container">
            <div className="logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcF5cMoocGXwUQCvZYa5Vd_5cSynczdUpVWA" />
            </div>
            <h1 className="title">The Content is Locked. Verify to View</h1>
            <Input
              placeholder="Enter your Email"
              //   value={email}
              required
              //   onChange={(e: any) => setEmail(e.target.value)}
            />
            <Button
              label="Verify with BookFace Access"
              style={{ width: "100%" }}
              //   onClick={submitHandler}
            />
          </div>
        )}
      </VerifyContainer>
    </StyledDiv>
  );
};

export const QRCode = ({ appUrl }: any) => {
  return (
    <div className="form-container">
      <h1 className="title">
        Almost there. verify and avail exclusive Deals!!
      </h1>

      <a className="link" target="_blank" rel="noreferrer" href={appUrl}>
        {" "}
        Click here to open in Reclaim Wallet
      </a>

      <span>OR</span>

      <div className="qr-code">
        <QRCodeSVG value={appUrl} className="react-qr" />
      </div>

      <p className="scan-helper-text">
        <span>Scan the QR </span> to submit your claim on the Reclaim app
      </p>

      <ProgressStatus>
        <Spinner />
        Waiting to be verified. Please don't close this tab
      </ProgressStatus>
    </div>
  );
};

export const Failed = () => {
  return (
    <StyledDiv className="verify">
      {/* <GoBack style={{ maxWidth: "50rem", margin: "1rem auto" }} /> */}
      <VerifyContainer>
        <div className="form-container">
          <div className="failed-container">
            <h1>Verificatio Failed.</h1>
            <img src={"Fail"} alt="filed" />
            <p>
              Looks like you dont have bookface access. please try again with
              another ID
            </p>
          </div>
        </div>
      </VerifyContainer>
    </StyledDiv>
  );
};
