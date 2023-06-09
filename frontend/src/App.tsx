//@ts-nocheck

import { useEffect, useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/common";
import MetaMaskSDK from "@metamask/sdk";
import {
  LensClient,
  ProfileFragment,
  development,
} from "@lens-protocol/client";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lensProfile, setLensProfile] = useState<ProfileFragment>();

  const authendicate = async () => {
    try {
      setIsLoading(true);

      const lensClient = new LensClient({
        environment: development,
      });

      const MMSDK = new MetaMaskSDK();
      const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
      const res = await ethereum?.request({
        method: "eth_requestAccounts",
        params: [],
      });
      console.log(res);

      let isAuthenticated = await lensClient?.authentication?.isAuthenticated();

      if (!isAuthenticated) {
        const challange = await lensClient?.authentication?.generateChallenge(
          res[0]
        );
        console.log(challange);

        const sign = await ethereum?.request({
          method: "personal_sign",
          params: [res[0], challenge],
          id: 1,
        });
        console.log(sign);
        await lensClient?.authentication?.authenticate(res[0], sign);
        isAuthenticated = await lensClient?.authentication?.isAuthenticated();
        console.log(isAuthenticated);
        if (isAuthenticated) {
          const allOwnedProfiles = await lensClient?.profile?.fetchAll({
            ownedBy: [res[0]],
          });
          allOwnedProfiles.items.forEach((i) => {
            setLensProfile(i);
          });
        }
        setIsLoading(false);
      }
    } catch (e) {
      console.log("errpr", e);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("lensProfile", lensProfile);
  }, []);

  console.log();
  return (
    <>
      {/* header */}
      <Navbar />
      {/* <button onClick={authendicate}>clicl</button> */}
      <Outlet />
    </>
  );
}

export default App;
