import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input } from "../../components";
import { Container } from "../../components/common";
import {
  ProgressStatus,
  QRCcodeContainer,
  Spinner,
  VerifyContainer,
} from "./verify.styles";
import { extractGitHubRepoPath } from "../../utils";

export const Verify = () => {
  const { lensProfile } = useSelector((state: any) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    repo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(extractGitHubRepoPath(formData.repo));
    console.log(lensProfile.lensHandle);

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BACKEND_BASE_URL}/verify/init`, {
        email: formData.email,
        lensProfile: lensProfile?.lensHandle,
        repoFullName: extractGitHubRepoPath(formData.repo),
        repoLink: formData.repo,
      });

      setCallbackId(data?.callbackId);
      setTemplateUrl(data?.templateUrl);
    } catch (err) {
      console.log("some error occured");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(callbackId, templateurl);

  const getStatus = async (callbackId: string) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_BASE_URL}/verify/status/${callbackId}`
      );

      setStatus(data.query.status);
      console.log(data.query.status);

      if (data.query.status === "VERIFIED") {
        setStatus("VERIFIED");
        toast.success("Verified!! you got a tick mark");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error while getting status:", error);
      // Handle the error appropriately (e.g., show an error message)
      toast.error("Could'nt verify your repo");
    }
  };

  useEffect(() => {
    if (!callbackId) return;

    const intervalId = setInterval(() => {
      getStatus(callbackId);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [callbackId]);

  return (
    <Container>
      {status === "VERIFIED" && <Confetti width={1920} height={900} />}

      <Toaster
        containerClassName="toast"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
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
                      value={lensProfile?.lensHandle}
                      required
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
                    />
                  </div>

                  <Button
                    label={isLoading ? "Generating Link..." : "Prove"}
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
