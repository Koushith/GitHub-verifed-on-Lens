import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { JobListingContainer } from "./job-listing.styles";

export const JobListing = () => {
  const getAllListing = async (url: string) => {
    return await fetch(url).then((data) => data.json());
  };

  const navigate = useNavigate();
  const { data, isLoading, error } = useSwr(
    "http://localhost:8000/company/job",
    getAllListing
  );

  console.log({ data, isLoading, error });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <JobListingContainer>
      {/* Joh listing
      <button onClick={() => navigate("/new-job-listing")}>
        Add New Listing
      </button>
      {data?.listings?.map((job: any) => (
        <>
          <h1>{job?.position}</h1>
          <h1>{job?.companyName}</h1>
        </>

      ))} */}

      <div>
        <div className="logo"></div>
        <div>
          <h3>
            Software Engineer- Frontend <span>at QustBook</span>
          </h3>
          <div>
            <p>Hybrid</p>
            <p>FullTime</p>
            <p>4+</p>
          </div>
        </div>
      </div>
    </JobListingContainer>
  );
};
