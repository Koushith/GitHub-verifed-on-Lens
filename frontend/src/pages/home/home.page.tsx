import useSwr from "swr";
import axios from "axios";
import { HomePageContainer } from "./home.styles";
import { CardShimmer, ProfileCard } from "../../components";
import { useSelector } from "react-redux";
import { SignupPage } from "..";
import { BACKEND_BASE_URL } from "../../utils/constants";

export const Home = () => {
  const fetchAllusers = async (url: string) => {
    return await axios.get(url);
  };
  const { data, isLoading, error } = useSwr(
    `${BACKEND_BASE_URL}/user`,
    fetchAllusers
  );

  const { isAuthendicated } = useSelector((state: any) => state.auth);

  if (!isAuthendicated) {
    return <SignupPage />;
  }

  return (
    <HomePageContainer>
      <h1>All Devs </h1>
      {isLoading && (
        <div className="profile-container">
          {new Array(20).fill("").map((_, i) => (
            <CardShimmer key={i} />
          ))}
        </div>
      )}
      <div className="profile-container">
        {data?.data.user?.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </HomePageContainer>
  );
};
