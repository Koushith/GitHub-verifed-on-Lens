import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { formatPicture } from "../../utils";

export const ProfileCardContainer = styled.div`
  padding: 1rem;
  border: 1px solid rgb(225, 228, 232);
  border-radius: 4px;
  cursor: pointer;
  .meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .profile-image {
      position: relative;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .check-icon {
        position: absolute;
        height: 20px;
        width: 20px;
        left: 26px;
        bottom: 0px;
      }
    }
  }

  .meta-info {
    .name {
      font-size: 1.4rem;
      color: #212121;
      font-weight: 500;
      margin-top: 0.4rem;
    }

    .bio {
      color: #444d56;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  button {
    padding: 0.8rem 1.6rem;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 500;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #25282e;
    cursor: pointer;
    transition: 0.3s all;
    &:hover {
      opacity: 0.9;
    }
  }

  transition: 0.3s all;

  &:hover {
    background-color: rgb(246, 248, 250, 1);
  }
`;

export const ProfileCard = ({ profile }: any) => {
  console.log("rest---", profile);
  const navigate = useNavigate();

  const parsedProfile = JSON.parse(profile.lensProfile);
  console.log(profile.isVerified);
  return (
    <ProfileCardContainer
      onClick={() => navigate(`/profile/${parsedProfile?.handle}`)}
    >
      <div className="meta">
        <div className="profile-image">
          {parsedProfile?.picture &&
          parsedProfile?.picture.__typename === "MediaSet" ? (
            <>
              <img
                src={formatPicture(parsedProfile?.picture)}
                width="120"
                height="120"
                alt={parsedProfile?.handle}
              />
              {profile?.isVerified && <CheckIcon className="check-icon" />}
            </>
          ) : (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                alt="image"
              />
              {profile?.isVerified && <CheckIcon className="check-icon" />}
            </>
          )}
        </div>
        {/* <button>Follow</button> */}
      </div>

      <div className="meta-info">
        <p className="name">{parsedProfile?.handle}</p>

        <p className="bio">{parsedProfile?.bio}</p>
      </div>
    </ProfileCardContainer>
  );
};

export const CheckIcon = ({ className }: any) => {
  return (
    <div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="24" height="24" rx="12" fill="white"></rect>
        <path
          d="M10.0425 2.74587C10.9935 1.37043 13.0066 1.37043 13.9577 2.74587V2.74587C14.5338 3.57913 15.5638 3.95843 16.5346 3.69483V3.69483C18.137 3.25971 19.6791 4.56895 19.5338 6.24112V6.24112C19.4458 7.25415 19.9939 8.21457 20.905 8.64397V8.64397C22.4089 9.35277 22.7585 11.3586 21.5848 12.5451V12.5451C20.8738 13.2639 20.6835 14.3561 21.1087 15.2775V15.2775C21.8104 16.7986 20.8039 18.5625 19.151 18.7081V18.7081C18.1497 18.7964 17.3101 19.5092 17.0503 20.4916V20.4916C16.6216 22.1132 14.7299 22.8098 13.3712 21.8465V21.8465C12.5481 21.2628 11.452 21.2628 10.6289 21.8465V21.8465C9.27027 22.8098 7.37856 22.1132 6.94981 20.4916V20.4916C6.69007 19.5092 5.85041 18.7964 4.8491 18.7081V18.7081C3.19626 18.5625 2.18971 16.7986 2.89148 15.2775V15.2775C3.31663 14.3561 3.12629 13.2639 2.41529 12.5451V12.5451C1.24166 11.3586 1.59123 9.35277 3.09516 8.64397V8.64397C4.00626 8.21457 4.55431 7.25415 4.46631 6.24112V6.24112C4.32103 4.56895 5.86316 3.25971 7.46555 3.69483V3.69483C8.43629 3.95843 9.46629 3.57913 10.0425 2.74587V2.74587Z"
          fill="#00AA45"
          stroke="#fff"
          strokeWidth="1.5"
        ></path>
        <path
          d="M8 12L10.8571 14.8571L16.5714 9.14285"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_18553_30777"
            x1="12.0001"
            y1="1.71429"
            x2="12.0001"
            y2="22.2857"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#27AE60"></stop>
            <stop offset="1" stopColor="#1E874B"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
