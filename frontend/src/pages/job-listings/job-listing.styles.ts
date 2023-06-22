import { styled } from "styled-components";
import { tablets, phones } from "../../utils";

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

  @media (${tablets}) {
    // Styles for tablets (if needed)
    padding: 0 2rem;
    .job-lists {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 0 2rem;
    .job-lists {
      margin-top: 4rem;

      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`;
