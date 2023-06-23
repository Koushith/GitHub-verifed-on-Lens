import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { JobListingContainer } from "./job-listing.styles";
import { Container } from "../../components/common";
import { Button, JobCard } from "../../components";
import { SignupPage } from "..";
import { useSelector } from "react-redux";
import { JobCardShimmer } from "../../components/job-card/job-card.shimmer";
import { BACKEND_BASE_URL } from "../../utils/constants";

export const JobListing = () => {
  const { isAuthendicated } = useSelector((state: any) => state.auth);

  const getAllListing = async (url: string) => {
    return await fetch(url).then((data) => data.json());
  };

  const navigate = useNavigate();
  const { data, error, isLoading } = useSwr(
    `${BACKEND_BASE_URL}/company/job`,
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

  return (
    <Container>
      <JobListingContainer>
        <div className="job-header">
          <h1>All Listings - {data?.listings?.length}</h1>
          <Button label="Add new Listing" onClick={navigateToNewListingPage} />
        </div>
        {isLoading ? (
          <div className="job-lists">
            {new Array(10).fill("").map((_, i) => (
              <JobCardShimmer key={i} />
            ))}
          </div>
        ) : (
          <div className="job-lists">
            {data?.listings?.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </JobListingContainer>
    </Container>
  );
};
