import { useExploreProfiles } from "@lens-protocol/react-web";
import { HomePageContainer } from "./home.styles";
import { CardShimmer, ProfileCard } from "../../components";
import { useSelector } from "react-redux";
import { SignupPage } from "..";

export const Home = () => {
  const { data: profiles, loading } = useExploreProfiles({
    limit: 50,
  });

  const { isAuthendicated } = useSelector((state: any) => state.auth);

  if (!isAuthendicated) {
    return <SignupPage />;
  }
  return (
    <HomePageContainer>
      <h1>Verified Devs</h1>

      <div className="profile-container">
        {loading && <CardShimmer />}
        {profiles?.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </HomePageContainer>
  );
};
