// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { NavLink, useNavigate } from "react-router-dom";

import { useWalletLogin, useWalletLogout } from "@lens-protocol/react-web";
import { useState, useEffect } from "react";
// import Bars from "../../../assets/icons/bars.svg";
// import Close from "../../../assets/icons/close.svg";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useActiveWallet } from "@lens-protocol/react-web";
import { styled } from "styled-components";
import { phones, tablets } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../../../slices/auth.slice";
import {
  Environment,
  LensClient,
  ProfileFragment,
  development,
  production,
} from "@lens-protocol/client";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lensProfile, setLensProfile] = useState<ProfileFragment>();
  const [isAuthendicated, setIsAuthendicated] = useState(false);

  const authenticate = async () => {
    try {
      const lensClient = new LensClient({
        environment: production,
      });

      const MMSDK = new MetaMaskSDK();

      const ethereum = MMSDK.getProvider();

      const wallet = await ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });

      const address = wallet[0];
      console.log("address", address);

      let isAuthenticated = await lensClient.authentication.isAuthenticated();
      console.log("isAuthendicated", isAuthenticated);

      if (!isAuthenticated) {
        console.log("insiode if block");
        const challenge = await lensClient.authentication.generateChallenge(
          address
        );
        console.log(challenge);
        const sign = await ethereum.request({
          method: "personal_sign",
          params: [address, challenge],
          id: 1,
        });
        console.log(sign);
        await lensClient.authentication.authenticate(address, sign);
      }

      isAuthenticated = await lensClient.authentication.isAuthenticated();
      console.log(isAuthenticated);

      if (isAuthenticated) {
        const allOwnedProfiles = await lensClient.profile.fetchAll({
          ownedBy: address,
        });

        console.log("all ownered profile", allOwnedProfiles.items);
        allOwnedProfiles.items.forEach((i) => {
          dispatch(setAuthState(i));
        });

        setIsAuthendicated(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("auth error", error.message);
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
            <NavLink to="/profile">Profile</NavLink>

            {isAuthendicated ? (
              <>
                <span>{lensHandle?.handle}</span>{" "}
              </>
            ) : (
              <button onClick={authenticate}>Login</button>
            )}
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
