import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { JobListingContainer } from "./job-listing.styles";
import { Container } from "../../components/common";
import { Button, JobCard } from "../../components";
import { SignupPage } from "..";
import { useSelector } from "react-redux";

export const JobListing = () => {
  const { isAuthendicated } = useSelector((state: any) => state.auth);

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

  if (!isAuthendicated) {
    return <SignupPage />;
  }
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Container>
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
