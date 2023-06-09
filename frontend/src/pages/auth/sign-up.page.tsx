import { Button, Input, RichTextEditor } from "../../components";
import { Container } from "../../components/common";
import {
  ProgressStatus,
  QRCcodeContainer,
  Spinner,
  VerifyContainer,
} from "./auth.styles";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";

export const SignUpPage = () => {
  return (
    <Container>
      <VerifyContainer>
        <div className="left">
          <>
            <div className="form-container">
              <h1 className="title">Fillout your Profile Info</h1>
              {/* <div className="form-group">
                <Input
                  placeholder="Your Lens Id- it will be autofilled"
                  value={"Koushith.lens"}
                  required
                  //   onChange={(e: any) => setEmail(e.target.value)}
                />
              </div> */}

              <div className="form-group">
                <Input
                  placeholder="Handle"
                  value={"Handle"}
                  required
                  label="Lens Handle"
                  //   onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  placeholder="GitHub URL"
                  value={"repo"}
                  label="GitHub Profile"
                  required
                  //   onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <RichTextEditor label="Bio" />
              </div>

              <Button
                label="Save"
                style={{ width: "100%" }}
                //   onClick={submitHandler}
                className="prove-button"
              />
            </div>
          </>
        </div>

        {/* right side------------------------- */}

        <div className="right">
          <h1>Claim your Github Contributions on Lens</h1>

          <p>Verifying github contribution for pseudonymous Lens profiles</p>
          <div className="dev-list">
            <div className="list">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlJTIwcG90cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG90cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
              <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80" />
              <img src="https://images.unsplash.com/photo-1546791737-97c81ec08179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" />
            </div>
            <div>Join other 100+ Devs</div>
          </div>
        </div>
      </VerifyContainer>
    </Container>
  );
};

export const QRCode = ({ appUrl }: any) => {
  return (
    <QRCcodeContainer>
      <h1 className="title">Almost there. Lets get Verified!!</h1>

      <a className="link" target="_blank" rel="noreferrer" href={appUrl}>
        {" "}
        Click here to open in Reclaim Wallet
      </a>

      <p className="seperator">OR</p>

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
    </QRCcodeContainer>
  );
};
