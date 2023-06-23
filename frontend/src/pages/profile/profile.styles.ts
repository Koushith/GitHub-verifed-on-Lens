import { styled } from "styled-components";
import { tablets, phones } from "../../utils";

export const ProfileImageContainer = styled.div`
  /* border-bottom: 1px solid rgb(225, 228, 232); */

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 2rem;
    color: #212121;
  }
  .profile-image {
    margin-top: 2rem;
    position: relative;
    img {
      height: 140px;
      width: 140px;
      border-radius: 50%;
      object-fit: cover;
    }

    .check-icon {
      position: absolute;
      height: 40px;
      width: 40px;
      left: 110px;
      top: 100px;
    }
  }

  .profile-meta {
    margin-top: 2rem;
    border-bottom: 1px solid rgb(225, 228, 232);
    .name {
      font-size: 2.4rem;
      font-weight: 600;
    }

    .bio {
      font-size: 1.6rem;
      line-height: 20px;
      color: #444d56;
      margin-top: 1rem;
    }

    .follow-info {
      margin-bottom: 4rem;
      display: flex;
      gap: 2rem;

      .count {
        font-size: 1.6rem;
        line-height: 20px;
        color: #444d56;
        margin-top: 1.4rem;
        span {
          color: #212121 !important;
          margin-top: 2rem;
          /* display: block; */
          font-size: 1.8rem;
          font-weight: 800;
        }
      }
    }
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    /* padding: 0 2rem; */
  }
`;

export const ProjectsContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  .project-card {
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid rgb(225, 228, 232);
    transition: 0.3s all;
    display: flex;
    gap: 4rem;
    justify-content: space-between;

    .repo-name {
      font-size: 1.6rem;
      font-weight: 600;
      color: #212121;
      margin-bottom: 0.6rem;
    }

    .desc {
      color: #444d56;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .thumbnail {
      img {
        /* width: 150px; */
      }
    }

    &:hover {
      border: 1px solid rgb(111, 207, 151);
      cursor: pointer;
    }
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    /* padding: 0 2rem; */
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
