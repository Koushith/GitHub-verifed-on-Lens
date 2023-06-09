import { useProfile, usePublications, Profile } from "@lens-protocol/react-web";
import { formatPicture } from "../../utils/picture.util";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "../../components/common";
import { CheckIcon } from "../../components";
import { ProfileImageContainer, ProjectsContainer } from "./profile.styles";

export const ProfilePage = () => {
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  const handle = pathname?.split("/")[2];

  // let { data: profile, loading } = useProfile({ handle });

  // if (loading) return <p className="p-14">Loading ...</p>;
  return (
    <Container>
      {/* <h1>This is a profile page</h1>

      {profile?.picture?.__typename === "MediaSet" && (
        <img
          width="200"
          height="200"
          alt={profile.handle}
          className="rounded-xl"
          src={formatPicture(profile.picture)}
        />
      )}

      <h1 className="text-3xl my-3">{profile?.handle}</h1>
      <h3 className="text-xl mb-4">{profile?.bio}</h3> */}

      <div>
        {/* profile-meta */}

        <ProfileImageContainer className="profile-meta">
          {/* <h1>Profile</h1> */}
          <div className="profile-image">
            <img
              src="https://lh3.googleusercontent.com/a/AGNmyxbOVC6bhUvu7HscLQLKMfnm2aRd-VZX-PHMF3jB=s96-c"
              alt="image"
            />
            <CheckIcon className="check-icon" />
          </div>

          <div className="profile-meta">
            <p className="name">Koushith</p>
            <p className="bio">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium asperiores, deserunt earum ipsam perferendis excepturi
              distinctio veniam neque temporibus nesciunt.
            </p>
            <div className="follow-info">
              <div className="count">
                <span>20</span> Followers
              </div>
              <div className="count">
                <span>20</span> following
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
