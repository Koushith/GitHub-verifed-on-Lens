import { styled } from "styled-components";
import { phones, tablets } from "../../utils";

export const JobDetailContainer = styled.section`
  max-width: 80rem;
  margin: 2rem auto 8rem auto;
  padding-bottom: 8rem;
  .job-desc {
    p,
    ul,
    li {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 24px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      font-size: 1.6rem;
      color: #21293c;
    }
  }
  .company-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 4rem;

    .logo {
      display: flex;
      gap: 2rem;
    }
    img {
      height: 8rem;
      width: 8rem;
      border-radius: 4px;
    }

    .info {
      h2 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #21293c;
      }

      .meta-info {
        display: flex;
        gap: 2rem;
        margin-top: 0.4rem;
      }
      .position {
        color: #21293c;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 24px;
      }

      .sub-text {
        font-size: 1.2rem;
        font-weight: 500;
        color: #6a737d;
      }
    }
  }
  @media (${tablets}) {
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 2rem;
    margin: 0rem auto;
    padding-bottom: 8rem;

    .company-info {
      flex-direction: column;
      align-items: flex-start;
      .apply-btn {
        width: 100%;
      }
    }
  }
`;

export const RichTextEditorContainer = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 18px;
    color: #21293c;
  }

  p {
    color: #4b587c;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 18px;
    /* margin: 2rem 0; */
  }

  ul {
    color: #4b587c;
    font-size: 1.6rem;
    font-weight: 400;

    margin: 2rem 0;
    li {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
`;
