import { useProfile, usePublications, Profile } from "@lens-protocol/react-web";
import { formatPicture } from "../../utils/picture.util";
import { useLocation, useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  const handle = pathname?.split("/")[2];

  let { data: profile, loading } = useProfile({ handle });

  if (loading) return <p className="p-14">Loading ...</p>;
  return (
    <>
      <h1>This is a profile page</h1>

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
      <h3 className="text-xl mb-4">{profile?.bio}</h3>
    </>
  );
};
