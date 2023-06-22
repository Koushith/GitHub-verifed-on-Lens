import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { JobListingContainer } from "./job-listing.styles";
import { Container } from "../../components/common";
import { Button, JobCard } from "../../components";
import { SignupPage } from "..";
import { useSelector } from "react-redux";

export const JobListing = () => {
  const { isAuthendicated } = useSelector((state: any) => state.auth);

  if (!isAuthendicated) {
    return <SignupPage />;
  }

  const getAllListing = async (url: string) => {
    return await fetch(url).then((data) => data.json());
  };

  const navigate = useNavigate();
  const { data, isLoading, error } = useSwr(
    "http://localhost:8000/company/job",
    getAllListing
  );

  console.log({ data, isLoading, error });

  const navigateToNewListingPage = () => {
    navigate("/new-job-listing");
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Container>
      {/* Joh listing
      <button onClick={() => navigate("/new-job-listing")}>
        Add New Listing
      </button>
      {data?.listings?.map((job: any) => (
        <>
          <h1>{job?.position}</h1>
          <h1>{job?.companyName}</h1>
        </>
      ))}
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
      </div> */}
      <JobListingContainer>
        <div className="job-header">
          <h1>All Listings - 20</h1>
          <Button label="Add new Listing" onClick={navigateToNewListingPage} />
        </div>
        <div className="job-lists">
          {data?.listings?.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </JobListingContainer>
    </Container>
  );
};
