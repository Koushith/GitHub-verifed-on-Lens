import { formatPicture } from "../../utils/picture.util";
import { Container } from "../../components/common";
import { CheckIcon } from "../../components";
import { ProfileImageContainer, ProjectsContainer } from "./profile.styles";
import { useDispatch, useSelector } from "react-redux";
import { SignupPage } from "..";
import { setVerified } from "../../slices/auth.slice";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/constants";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { lensProfile, isAuthendicated, isVerified } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  const checkIfVerified = async (id: string) => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/user/${id}`);

    console.log(data);
    if (data?.user?.isVerified) {
      dispatch(setVerified(true));
    }
  };

  if (!isAuthendicated) {
    return <SignupPage />;
  }

  const parsedLensProfile = JSON.parse(lensProfile.lensProfile);
  console.log("parsed profile", parsedLensProfile);

  useEffect(() => {
    console.log("effect ran once");
    checkIfVerified(parsedLensProfile?.handle);
  }, []);
  return (
    <Container>
      <ProfileImageContainer className="profile-meta">
        <div className="profile-image">
          <img src={formatPicture(parsedLensProfile?.picture)} alt="image" />

          {isVerified && <CheckIcon className="check-icon" />}
        </div>

        <div className="profile-meta">
          <p className="name">{parsedLensProfile?.handle}</p>
          <p className="bio">{parsedLensProfile?.bio}</p>
          <div className="follow-info">
            <div className="count">
              <span>{parsedLensProfile.stats?.totalFollowers}</span> Followers
            </div>
            <div className="count">
              <span>{parsedLensProfile.stats?.totalFollowing}</span> following
            </div>
          </div>
        </div>
        <h1 style={{ margin: "2rem 0", fontSize: "1.8rem" }}>Projects</h1>
      </ProfileImageContainer>

      <ProjectsContainer className="projects-container">
        <div className="project-card">
          <div>
            <p className="repo-name">YC Deals</p>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              non.
            </p>
          </div>
        </div>

        <div className="project-card">
          <div>
            <p className="repo-name">YC Deals</p>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              non.
            </p>
          </div>
        </div>

        <div className="project-card">
          {/* rgb(111, 207, 151) */}

          <div>
            <p className="repo-name">YC Deals</p>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              non.
            </p>
          </div>
        </div>

        <div className="project-card">
          {/* rgb(111, 207, 151) */}

          <div>
            <p className="repo-name">YC Deals</p>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              non.
            </p>
          </div>
        </div>
      </ProjectsContainer>
    </Container>
  );
};
