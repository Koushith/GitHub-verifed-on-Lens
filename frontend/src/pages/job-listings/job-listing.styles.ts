import { styled } from "styled-components";

export const JobListingContainer = styled.div`
  .job-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4rem;
    h1 {
      font-size: 1.6rem;
    }
  }

  .job-lists {
    margin-top: 4rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
