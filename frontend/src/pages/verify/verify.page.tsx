import { Button, Input } from "../../components";
import { Container } from "../../components/common";
import {
  ProgressStatus,
  QRCcodeContainer,
  Spinner,
  VerifyContainer,
} from "./verify.styles";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import { useSelector } from "react-redux";

export const Verify = () => {
  const { isElegible, lensHandle } = useSelector((state: any) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    repo: "",
  });

  const [status, setStatus] = useState("");
  const [callbackId, setCallbackId] = useState("");
  const [templateurl, setTemplateUrl] = useState("");
  const navigate = useNavigate();

  const BACKEND_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

  const handleFormData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    console.log(formData);

    try {
      const { data } = await axios.post(`${BACKEND_BASE_URL}/verify/init`, {
        email: formData.email,
        repoFullName: formData.repo,
      });
      console.log("res", data);
      setCallbackId(data?.callbackId);
      setTemplateUrl(data?.templateUrl);
    } catch (err) {
      console.log("some error occured");
    }
  };
  console.log(callbackId, templateurl);

  const getStatus = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/status/${callbackId}`);
      console.log(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      getStatus();
    }, 3000);

    return () => clearTimeout(id);
  }, [callbackId]);

  return (
    <Container>
      <VerifyContainer>
        <div className="left">
          <>
            {!callbackId && !templateurl ? (
              <>
                <div className="form-container">
                  <h1 className="title">Get your verified Tick mark</h1>
                  <div className="form-group">
                    <Input
                      placeholder="Your Lens Id- it will be autofilled"
                      value={lensHandle?.handle}
                      required

                      //   onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      placeholder="Enter your Email"
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleFormData}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      placeholder="Enter the GitHub repo link"
                      name="repo"
                      value={formData.repo}
                      required
                      onChange={handleFormData}
                      //   onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    label="Prove"
                    style={{ width: "100%" }}
                    onClick={submitHandler}
                    className="prove-button"
                  />
                </div>
              </>
            ) : (
              <QRCode appUrl={templateurl} />
            )}
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
