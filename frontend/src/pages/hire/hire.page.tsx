import { useState } from "react";
import { FormContainer, SubmitDealContainer } from "./hire.styles";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  //   GoBack,
  Input,
  RichTextEditor,
} from "../../components/primitives";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../utils/constants";

const initialState = {
  position: "",
  companyName: "",
  email: "",
  website: "",
  location: "",
  experienceRequired: "",
  jobDescription: "",
  salaryRange: "",
};

export const NewJobListingPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const formChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BACKEND_BASE_URL}/company/job`, {
        position: formData.position,
        companyName: formData.companyName,
        email: formData.email,
        website: formData.website,
        location: formData.location,
        experienceRequired: formData.experienceRequired,
        jobDescription: jobDescription,
        salaryRange: formData.salaryRange,
      });
      console.log(res);

      if (res.status == 201) {
        navigate("/job-listings");
      }
    } catch (error) {
      console.log("something went wrong", error);
      toast.error("Something went wrong while creating a deal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitDealContainer>
      {/* <GoBack /> */}
      <h2 className="heading">New Job Listing</h2>

      <Toaster
        containerClassName="toast"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      <FormContainer>
        <div className="basic">
          <Input
            label="Position"
            placeholder="Senior Frontend Engineer"
            name="position"
            value={formData.position}
            onChange={formChangeHandler}
          />
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            placeholder="Enter Company Name"
            onChange={formChangeHandler}
          />
          <Input
            label="Email"
            value={formData.email}
            name="email"
            placeholder="johndoe@domain.com"
            onChange={formChangeHandler}
          />
          <Input
            label="Website"
            placeholder="www.domain.com"
            name="website"
            value={formData.website}
            onChange={formChangeHandler}
          />

          <Input
            label="Location"
            placeholder="Remote"
            name="location"
            value={formData.location}
            onChange={formChangeHandler}
          />

          <Input
            label="Expreience Required"
            placeholder="2-4 years"
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={formChangeHandler}
          />
        </div>

        <div className="deal-info">
          <div>
            <RichTextEditor
              label="Job Description"
              value={jobDescription}
              onChange={setJobDescription}
            />
            <p className="deal-helper-text">
              Please be Specific about the requirements and skills required
            </p>
          </div>

          <div>
            <Input
              label="Salary Range "
              name="salaryRange"
              value={formData.salaryRange}
              placeholder="16-20LPA"
              onChange={formChangeHandler}
            />
          </div>
        </div>

        <Button
          label={isLoading ? "Submitting" : "Submit"}
          onClick={submitHandler}
          className="submit-btn"
        />
      </FormContainer>
    </SubmitDealContainer>
  );
};
