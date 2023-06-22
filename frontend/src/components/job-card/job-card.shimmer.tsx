import { styled } from "styled-components";
import { tablets, phones } from "../../utils";
import { Shimmer } from "..";

export const JobSimmerContainer = styled.div`
  padding: 1rem;
  border: 1px solid rgb(225, 228, 232);
  border-radius: 4px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: 0.3s all;
  cursor: pointer;
  .logo {
    flex-basis: 60px;
    img {
      border-radius: 50%;
      height: 40px;
      width: 40px;
    }
  }

  .job-info {
    h2 {
      font-size: 1.4rem;
      font-weight: 500;
    }

    span {
      font-weight: 400;
      color: #4b587c;
    }

    .meta-info {
      font-size: 1.2rem;
      font-weight: 500;
      color: #4b587c;
      display: flex;
      align-items: center;

      gap: 1rem;
      position: relative;

      span {
        &::before {
        }
      }
    }

    .skills {
      margin-top: 1rem;
      font-size: 1.2rem;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      gap: 0.8rem;
      flex-wrap: wrap;

      .pill {
        border: 1px solid rgb(225, 228, 232);
        border-radius: 4px;
        padding: 0.4rem 0.8rem;
      }
    }
  }

  .icon-sh {
    width: 40px;
    height: 40px;
  }

  .bio-sh {
    width: 200px;
    height: 10px;
  }

  .job-sh {
    margin-top: 1rem;
    width: 100px;
    height: 10px;
  }

  .skills-sh {
    width: 100px;
    height: 10px;
  }

  @media (${tablets}) {
    .logo {
      flex-basis: 60px;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    .logo {
      flex-basis: 60px;
    }
  }
`;

export const JobCardShimmer = (props: any) => {
  return (
    <JobSimmerContainer>
      <div className="logo">
        <Shimmer className="icon-sh" />
      </div>
      <div className="job-info">
        <h2>
          <Shimmer className="bio-sh" />
        </h2>
        <div className="meta-info">
          <Shimmer className="job-sh" />
        </div>
        <div className="skills">
          <Shimmer className="skills-sh" />
        </div>
      </div>
    </JobSimmerContainer>
  );
};
