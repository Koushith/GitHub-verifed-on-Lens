//@ts-nocheck

import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Bars from "../../../assets/icons/bars.svg";
import Close from "../../../assets/icons/close.svg";
import Logo from "../../../assets/icons/logo.svg";
import { styled } from "styled-components";
import { phones, tablets } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";

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
      display: flex;
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: #21293c;
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        color: rgb(111, 207, 151);
      }

      img {
        height: 24px;
        width: 24px;
        margin-right: 0.4rem;
      }
    }

    ul {
      list-style: none;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }

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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isElegible, lensHandle, authendicate, lensProfile, isAuthendicated } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { authenticate } = useAuth();

  return (
    <NavbarContainer>
      <Toaster
        containerClassName="toast"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      <nav>
        <NavLink className="logo" to="/">
          <img src={Logo} alt="logo" /> Verified
        </NavLink>
        <ul>
          <li>
            <NavLink to="/job-listings"> Job Listings</NavLink>

            {isAuthendicated && (
              <>
                <>
                  <NavLink to="/verify"> Get Verified</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <button className="icon-btn">
                    {" "}
                    <span>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 350 350"
                        fill="#fff"
                        height={20}
                        width={20}
                      >
                        <path
                          d="M151.86 161.438C147.365 168.996 77.2467 170.266 38.9937 148.828C0.740742 127.39 19.3255 61.8415 58.1254 44.6293C96.9253 27.4171 156.355 153.881 151.86 161.438Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M151.329 187.672C155.824 195.23 121.899 254.808 83.6457 276.246C45.3927 297.684 -3.79578 249.287 0.247804 208.065C4.2914 166.842 146.834 180.114 151.329 187.672Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M174.469 201.234C183.46 201.234 219.651 259.543 219.651 302.419C219.651 345.294 151.878 362.446 117.122 338.435C82.3656 314.425 165.479 201.233 174.469 201.234Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M198.14 188.567C202.635 181.008 272.754 179.739 311.006 201.177C349.259 222.615 330.675 288.163 291.875 305.375C253.074 322.587 193.645 196.124 198.14 188.567Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M198.671 162.328C194.176 154.77 228.101 95.1917 266.354 73.7532C304.608 52.3153 353.796 100.713 349.753 141.935C345.709 183.158 203.166 169.886 198.671 162.328Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M175.53 148.766C166.539 148.766 130.348 90.4571 130.348 47.5812C130.348 4.70524 198.121 -12.4459 232.877 11.5647C267.634 35.5753 184.52 148.767 175.53 148.766Z"
                          fill="currentColor"
                        ></path>
                      </svg>{" "}
                    </span>
                    {lensProfile?.lensHandle}
                  </button>{" "}
                </>
              </>
            )}
          </li>
        </ul>
        {/* mobile-nav */}

        {isOpen ? (
          <div className="mobile-nav">
            <img src={Close} alt="close" onClick={() => setOpen(!open)} />
          </div>
        ) : (
          <div className="mobile-nav">
            <img src={Bars} alt="open" onClick={() => setOpen(!open)} />
          </div>
        )}

        {open && (
          <div className="mobile-nav mob-nav">
            <ul>
              <li>
                <NavLink to="/how-it-works" onClick={() => setOpen(!open)}>
                  {" "}
                  How It Works?
                </NavLink>
                <NavLink to="/about" onClick={() => setOpen(!open)}>
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </NavbarContainer>
  );
};
