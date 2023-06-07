import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* header */}
      <Outlet />
    </>
  );
}

export default App;
