import { formatPicture } from "../../utils/picture.util";
import { Container } from "../../components/common";
import { CheckIcon } from "../../components";
import { ProfileImageContainer, ProjectsContainer } from "./profile.styles";
import { useDispatch, useSelector } from "react-redux";
import { SignupPage } from "..";
import { setGithub, setVerified } from "../../slices/auth.slice";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const { lensProfile, isAuthendicated, isVerified, gitHubUserName } =
    useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [githubRepos, setGithubRepos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUserRepositories = async (username: string, perPage = 6) => {
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

  const checkIfVerified = async (id: string) => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/user/${id}`);

    console.log(data);
    if (data?.user?.isVerified) {
      dispatch(setGithub(data?.user?.github));
      dispatch(setVerified(true));
    }
  };

  if (!isAuthendicated) {
    return <SignupPage />;
  }
  console.log("allll--profile", lensProfile);
  const parsedLensProfile = JSON.parse(lensProfile.lensProfile);
  console.log("parsed profile", parsedLensProfile);

  useEffect(() => {
    console.log("effect ran once");
    checkIfVerified(parsedLensProfile?.handle);
  }, []);

  useEffect(() => {
    fetchUserRepositories(gitHubUserName);
  }, [gitHubUserName]);
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
        {isFetching ? (
          <>loading</>
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
    </Container>
  );
};
