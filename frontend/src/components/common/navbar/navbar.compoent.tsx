// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";
// import Bars from "../../../assets/icons/bars.svg";
// import Close from "../../../assets/icons/close.svg";

import { styled } from "styled-components";
import { phones, tablets } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { LensClient, development } from "@lens-protocol/client";
import { telosTestnet } from "wagmi/chains";
import MetaMaskSDK from "@metamask/sdk";

export const NavbarContainer = styled.div`
  background-color: #fffefe;
  box-shadow: 0 0 1px 1px rgba(33, 41, 63, 0.1);
  /* position:fixed;
  top:0;
  width:100%; */
  nav {
    height: 8rem;
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mobile-nav {
      display: none;
    }

    .logo {
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: #21293c;
      transition: all 0.3s ease;
      &:hover {
        color: rgb(111, 207, 151);
      }
    }

    ul {
      list-style: none;

      button {
        padding: 0.8rem 1.6rem;
        font-family: inherit;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        border: none;
        border-radius: 4px;
        background-color: #8a5cf7;
        cursor: pointer;
        transition: 0.3s all;
        margin-left: 2rem;
        &:hover {
          opacity: 0.9;
        }
      }

      a {
        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 500;
        color: #4b587c;
        margin-left: 2rem;
        transition: all 0.3s ease;
        &:hover {
          color: rgb(111, 207, 151);
        }
      }
    }
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 0 2rem;
    nav {
      ul {
        display: none;
      }
      .mobile-nav {
        display: block;

        height: 20px;
        width: 20px;
      }
    }
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const { isElegible, lensHandle } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authendicate = async () => {
    try {
      const lensClient = new LensClient({
        environment: development,
      });

      const MMSDK = MetaMaskSDK();

      const etherium = MMSDK;

      const wallet = "get wallet frm mm and replace the hardcoded value";
      const address = "0x9ccCA0a968A9bc5916E0de43Ea2D68321655ae67";
      const challange = await lensClient.authentication.generateChallenge(
        address
      );
      const signature = await lensClient.authentication.authenticate();
    } catch (error) {
      console.log("auth error", error);
    }
  };

  return (
    <NavbarContainer>
      <nav>
        <NavLink className="logo" to="/">
          GIT VERIFIED
        </NavLink>
        <ul>
          <li>
            <NavLink to="/verify"> Get Verified</NavLink>
            <NavLink to="/job-listings"> Job Listings</NavLink>
            <NavLink to="/about">Profile</NavLink>

            <button onClick={() => navigate("/signup")}>Login</button>
          </li>
        </ul>
        {/* mobile-nav */}

        {open ? (
          <div className="mobile-nav">
            {/* {" "}
            <img src={Close} alt="close" /> */}
            x
          </div>
        ) : (
          <div className="mobile-nav">
            {/* <img src={Bars} alt="open" /> */}o
          </div>
        )}
      </nav>
    </NavbarContainer>
  );
};
