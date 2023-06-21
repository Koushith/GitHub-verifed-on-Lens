import { formatPicture } from "../../utils/picture.util";
import { Container } from "../../components/common";
import { CheckIcon } from "../../components";
import {
  ProfileImageContainer,
  ProjectsContainer,
} from "../profile/profile.styles";
import { useSelector } from "react-redux";
import { SignupPage } from "..";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LensClient, ProfileFragment, production } from "@lens-protocol/client";

export const UserProfilePage = () => {
  const { isElegible, lensProfile, isAuthendicated } = useSelector(
    (state: any) => state.auth
  );

  const [parsedLensProfile, setParsedLensProfile] = useState<ProfileFragment>();

  if (!isAuthendicated) {
    return <SignupPage />;
  }
  const { id } = useParams();

  const fetchUserProfile = async () => {
    const lensClient = new LensClient({
      environment: production,
    });
    try {
      const profileById = await lensClient?.profile.fetch({
        profileId: id,
      });

      console.log("profile by id", profileById);

      setParsedLensProfile(profileById);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  return (
    <Container>
      {parsedLensProfile === undefined ? (
        <>Loading.........</>
      ) : (
        <div>
          <ProfileImageContainer className="profile-meta">
            <div className="profile-image">
              <img
                src={formatPicture(parsedLensProfile?.picture)}
                alt="image"
              />
              <CheckIcon className="check-icon" />
            </div>

            <div className="profile-meta">
              <p className="name">{parsedLensProfile?.handle}</p>
              <p className="bio">{parsedLensProfile?.bio}</p>
              <div className="follow-info">
                <div className="count">
                  <span>{parsedLensProfile?.stats?.totalFollowers}</span>{" "}
                  Followers
                </div>
                <div className="count">
                  <span>{parsedLensProfile?.stats?.totalFollowing}</span>{" "}
                  following
                </div>
              </div>
            </div>
          </ProfileImageContainer>

          <h1 style={{ margin: "2rem 0", fontSize: "1.8rem" }}>Projects</h1>

          <ProjectsContainer className="projects-container">
            <div className="project-card">
              <div>
                <p className="repo-name">YC Deals</p>
                <p className="desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nisi, non.
                </p>
              </div>
            </div>

            <div className="project-card">
              <div>
                <p className="repo-name">YC Deals</p>
                <p className="desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nisi, non.
                </p>
              </div>
            </div>
          </ProjectsContainer>
        </div>
      )}
    </Container>
  );
};
