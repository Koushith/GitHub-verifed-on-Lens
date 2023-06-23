//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SignupPage } from "../";
import { CheckIcon } from "../../components";
import { Container } from "../../components/common";
import { JobCardShimmer } from "../../components/job-card/job-card.shimmer";
import { BACKEND_BASE_URL } from "../../utils/constants";
import { formatPicture } from "../../utils/picture.util";
import { JobDeailsShimmer } from "../job-details/job-details.shimmer";
import {
  ProfileImageContainer,
  ProjectsContainer,
} from "../profile/profile.styles";

export const UserProfilePage = () => {
  const { isAuthendicated } = useSelector((state: any) => state.auth);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedProfile, setParsedProfile] = useState();
  const [githubRepos, setGithubRepos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [userName, setUserName] = useState("");

  const fetchUserRepositories = async (username: string, perPage = 6) => {
    console.log("user name", userName);

    try {
      setIsFetching(true);
      const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;

      const { data } = await axios.get(apiUrl);
      console.log("github data------", data);
      setGithubRepos(data);
    } catch (err) {
      console.log("couldnt fectch github profile", err);
    } finally {
      setIsFetching(false);
    }
  };

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
      setUserName(data.user.github);
      console.log(data.user.github);
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

  useEffect(() => {
    fetchUserRepositories(userName);
  }, [id, userName]);

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
                {parsedProfile?.picture &&
                parsedProfile?.picture.__typename === "MediaSet" ? (
                  <div className="profile-image">
                    <img
                      src={formatPicture(parsedProfile?.picture)}
                      width="120"
                      height="120"
                      alt={parsedProfile?.handle}
                    />
                    {profile?.isVerified && (
                      <CheckIcon className="check-icon" />
                    )}
                  </div>
                ) : (
                  <div className="profile-image">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                      alt="image"
                    />
                    {profile?.isVerified && (
                      <CheckIcon className="check-icon" />
                    )}
                  </div>
                )}

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
                {isFetching ? (
                  <>
                    {new Array(6).fill("").map((_, i) => (
                      <JobCardShimmer key={i} />
                    ))}
                  </>
                ) : (
                  <>
                    {githubRepos.map((repo) => (
                      <div
                        className="project-card"
                        key={repo?.id}
                        onClick={() => window.open(repo.clone_url, "_next")}
                      >
                        <div>
                          <p className="repo-name">{repo.name}</p>
                          <p className="desc">
                            {repo.description
                              ? repo.description
                              : "Description is not avaliable for this project"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </ProjectsContainer>
            </div>
          )}
        </>
      )}
    </Container>
  );
};
