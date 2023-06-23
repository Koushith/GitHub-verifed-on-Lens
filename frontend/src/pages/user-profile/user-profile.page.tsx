//@ts-nocheck

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
import { BACKEND_BASE_URL } from "../../utils/constants";
import axios from "axios";
import useSwr from "swr";
import { JobDeailsShimmer } from "../job-details/job-details.shimmer";
export const UserProfilePage = () => {
  const { isElegible, lensProfile, isAuthendicated } = useSelector(
    (state: any) => state.auth
  );
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedProfile, setParsedProfile] = useState();

  if (!isAuthendicated) {
    return <SignupPage />;
  }
  const { id } = useParams();

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BACKEND_BASE_URL}/user/${id}`);
      console.log("data----", data.user);
      setProfile(data?.user);
      setParsedProfile(data?.user?.lensProfile);
      if (data) {
        let parsedLensProfile = JSON.parse(data?.user?.lensProfile);
        setParsedProfile(parsedLensProfile);
        console.log("parsed profile", parsedLensProfile);
      }
      return data?.user;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  return (
    <Container>
      {parsedProfile === undefined || isLoading ? (
        <JobDeailsShimmer />
      ) : (
        <>
          {isLoading ? (
            <>Loading.........</>
          ) : (
            <div>
              <ProfileImageContainer className="profile-meta">
                <div className="profile-image">
                  <img
                    src={formatPicture(parsedProfile?.picture)}
                    alt="image"
                  />

                  {profile?.isVerified && <CheckIcon className="check-icon" />}
                </div>

                <div className="profile-meta">
                  <p className="name">{profile?.lensHandle}</p>
                  <p className="bio">{parsedProfile?.bio}</p>
                  <div className="follow-info">
                    <div className="count">
                      <span>{parsedProfile?.stats?.totalFollowers}</span>{" "}
                      Followers
                    </div>
                    <div className="count">
                      <span>{parsedProfile?.stats?.totalFollowing}</span>{" "}
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
        </>
      )}
    </Container>
  );
};
