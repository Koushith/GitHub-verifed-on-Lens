import { styled } from "styled-components";
import { tablets, phones } from "../../utils";

export const HomePageContainer = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  h1 {
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .profile-container {
    margin-top: 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
    padding: 0 2rem;
    .profile-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 0 2rem;
    .profile-container {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`;
