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
