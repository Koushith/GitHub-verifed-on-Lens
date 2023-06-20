import {
  ProfileAttributeReader,
  useExploreProfiles,
} from "@lens-protocol/react-web";
import { formatPicture } from "../../utils/picture.util";
import { Link, Outlet } from "react-router-dom";
import { HomePageContainer } from "./home.styles";
import Check from "../../assets/icons/check.svg";
import { ProfileCard } from "../../components";

export const Home = () => {
  const { data: profiles } = useExploreProfiles({
    limit: 50,
  });

  console.log("profiles", profiles);
  return (
    <HomePageContainer>
      {/* <div className="p-20">
        <h1 className="text-5xl">Dev Profiles</h1>
      </div> */}

      <h1>Verified Devs</h1>

      <div className="profile-container">
        {/* <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard /> */}

        {profiles?.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </HomePageContainer>
  );
};
