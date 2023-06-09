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
  // const { data: profiles } = useExploreProfiles({
  //   limit: 50,
  // });
  return (
    <HomePageContainer>
      {/* <div className="p-20">
        <h1 className="text-5xl">Dev Profilesß</h1>
        {profiles?.map((profile, index) => (
          <Link to={`/profile/${profile.handle}`} key={index}>
            <div className="my-14">
              {profile.picture && profile.picture.__typename === "MediaSet" ? (
                <img
                  src={formatPicture(profile.picture)}
                  width="120"
                  height="120"
                  alt={profile.handle}
                />
              ) : (
                <div className="w-14 h-14 bg-slate-500  " />
              )}
              <h3 className="text-3xl my-4">{profile.handle}</h3>
              <p className="text-xl">{profile.bio}</p>
            </div>
          </Link>
        ))}
      </div> */}

      <h1>Verified Devs</h1>

      <div className="profile-container">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </HomePageContainer>
  );
};
