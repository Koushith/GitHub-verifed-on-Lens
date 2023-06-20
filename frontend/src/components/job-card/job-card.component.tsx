import { useNavigate } from "react-router-dom";
import { JobCardContainer } from "./job-card.styles";

export const JobCard = (props: any) => {
  const { job } = props;
  const navigate = useNavigate();

  const navigateToDetails = (id: number) => {
    navigate(`/job-detail/${id}`);
  };
  return (
    <JobCardContainer onClick={() => navigateToDetails(job?.id)}>
      <div className="logo">
        <img
          src="https://dqy38fnwh4fqs.cloudfront.net/company/COMHA9R7A7QKK8GMO1ARB988BMENRN/logo.webp"
          alt="logo"
          height={40}
          width={40}
        />
      </div>
      <div className="job-info">
        <h2>
          {job?.position} <span>at {job?.companyName}</span>
        </h2>
        <div className="meta-info">
          <span>{job?.location}</span>
          <span>{job?.salaryRange}LPA</span>{" "}
          <span>{job?.experience}+ Years</span>
        </div>
        <div className="skills">
          <span className="pill">JS</span>
          <span className="pill">Rect Native</span>
          <span className="pill">TypeScreipt</span>
          <span className="pill">Redux</span>
        </div>
      </div>
    </JobCardContainer>
  );
};
