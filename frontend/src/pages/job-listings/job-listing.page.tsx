import { useNavigate } from "react-router-dom";

export const JobListing = () => {
  const navigate = useNavigate();
  return (
    <>
      Joh listing
      <button onClick={() => navigate("/new-job-listing")}>
        Add New Listing
      </button>
    </>
  );
};
