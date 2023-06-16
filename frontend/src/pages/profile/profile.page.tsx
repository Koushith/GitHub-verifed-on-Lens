import {
  useProfile,
  usePublications,
  Profile,
  useActiveProfile,
  useProfilesOwnedByMe,
  useActiveProfileSwitch,
} from "@lens-protocol/react-web";
import { formatPicture } from "../../utils/picture.util";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "../../components/common";
import { CheckIcon } from "../../components";
import { ProfileImageContainer, ProjectsContainer } from "./profile.styles";
import { useSelector } from "react-redux";

export const ProfilePage = () => {
  // let { data: profile, loading } = useProfile({ handle });
  const { isElegible, lensHandle } = useSelector((state: any) => state.auth);

  // if (loading) return <p className="p-14">Loading ...</p>;

  return (
    <Container>
      <div>
        {/* profile-meta */}

        <ProfileImageContainer className="profile-meta">
          {/* <h1>Profile</h1> */}
          <div className="profile-image">
            <img src={formatPicture(lensHandle?.picture)} alt="image" />
            <CheckIcon className="check-icon" />
          </div>

          <div className="profile-meta">
            <p className="name">{lensHandle?.handle}</p>
            <p className="bio">{lensHandle?.bio}</p>
            <div className="follow-info">
              <div className="count">
                <span>{lensHandle.stats?.totalFollowers}</span> Followers
              </div>
              <div className="count">
                <span>{lensHandle.stats?.totalFollowing}</span> following
              </div>
            </div>
          </div>
        </ProfileImageContainer>

        <h1 style={{ margin: "2rem 0", fontSize: "1.8rem" }}>Projects</h1>

        <ProjectsContainer className="projects-container">
          <div className="project-card">
            {/* rgb(111, 207, 151) */}

            <div>
              <p className="repo-name">YC Deals</p>
              <p className="desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                non.
              </p>
            </div>
            {/* <div className="thumbnail">
              <img
                src="https://peerlist.io/_next/image?url=https%3A%2F%2Fopengraph.githubassets.com%2F1%2FUshaGururaj%2Fbanana-translator&w=3840&q=75"
                alt="thumbnaikl"
              />
            </div> */}
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
            {/* <div className="thumbnail">
              <img
                src="https://peerlist.io/_next/image?url=https%3A%2F%2Fopengraph.githubassets.com%2F1%2FUshaGururaj%2Fbanana-translator&w=3840&q=75"
                alt="thumbnaikl"
              />
            </div> */}
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
            {/* <div className="thumbnail">
              <img
                src="https://peerlist.io/_next/image?url=https%3A%2F%2Fopengraph.githubassets.com%2F1%2FUshaGururaj%2Fbanana-translator&w=3840&q=75"
                alt="thumbnaikl"
              />
            </div> */}
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
            {/* <div className="thumbnail">
              <img
                src="https://peerlist.io/_next/image?url=https%3A%2F%2Fopengraph.githubassets.com%2F1%2FUshaGururaj%2Fbanana-translator&w=3840&q=75"
                alt="thumbnaikl"
              />
            </div> */}
          </div>
        </ProjectsContainer>
      </div>
    </Container>
  );
};
