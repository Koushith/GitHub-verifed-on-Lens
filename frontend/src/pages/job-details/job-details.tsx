import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  JobDetailContainer,
  RichTextEditorContainer,
} from "./job-details.styles";
import { Container } from "../../components/common";
import { Button } from "../../components";
import { JobDeailsShimmer } from "./job-details.shimmer";

interface Job {
  position: string;
  companyName: string;
  email: string;
  website: string;
  location: string;
  experienceRequired: string;
  jobDescription: string;
  salaryRange: string;
}

export const JobDetails = () => {
  const [job, setJob] = useState<Job>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const getJobDetail = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BACKEND_BASE_URL}/company/job/${id}`);
      setJob(data?.jobPost);
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobDetail();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <JobDeailsShimmer />
      ) : (
        <JobDetailContainer>
          <div className="company-info">
            <div>
              <div className="logo">
                <img
                  src={
                    "https://dqy38fnwh4fqs.cloudfront.net/company/COMHA9R7A7QKK8GMO1ARB988BMENRN/logo.webp"
                  }
                  alt="logo"
                />
                <div className="info">
                  <h2>{job?.companyName}</h2>
                  <p className="position">{job?.position}</p>
                  <div className="meta-info">
                    <p className="sub-text"> {job?.website} </p>
                    <p className="sub-text"> {job?.location} </p>
                    <p className="sub-text"> {job?.salaryRange} LPA</p>
                  </div>
                </div>
              </div>
            </div>

            <Button label="apply" />
          </div>

          <RichTextEditorContainer
            className="job-desc"
            dangerouslySetInnerHTML={{ __html: job?.jobDescription }}
          />
        </JobDetailContainer>
      )}
    </Container>
  );
};
