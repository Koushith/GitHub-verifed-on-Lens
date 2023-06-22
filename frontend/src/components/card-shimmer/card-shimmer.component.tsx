import { styled } from "styled-components";
import { Shimmer } from "..";

export const ProfileCardShimmerContainer = styled.div`
  padding: 1rem;
  /* border: 1px solid rgb(225, 228, 232); */
  border-radius: 4px;
  .meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .profile-image {
      position: relative;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .check-icon {
        position: absolute;
        height: 20px;
        width: 20px;
        left: 26px;
        bottom: 4px;
      }
    }
  }

  .meta-info {
    .name {
      font-size: 1.4rem;
      color: #212121;
      font-weight: 500;
      margin-top: 0.4rem;
    }

    .bio {
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
  }

  button {
    padding: 0.8rem 1.6rem;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 500;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #25282e;
    cursor: pointer;
    transition: 0.3s all;
    &:hover {
      opacity: 0.9;
    }
  }

  transition: 0.3s all;

  &:hover {
    background-color: rgb(246, 248, 250, 1);
  }

  .check-shimmer {
    width: 20px;
    height: 20px;
  }

  .image-sh {
    width: 40px;
    height: 40px;
  }

  .name-sh {
    width: 60px;
    margin-top: 2px;
    height: 10px;
  }

  .bio-sh {
    width: 200px;
    height: 10px;
    margin-top: 4px;
  }
`;

export const CardShimmer = () => {
  return (
    <ProfileCardShimmerContainer>
      <div className="meta">
        <div className="profile-image">
          <>
            <Shimmer className="image-sh" />
          </>
        </div>
        {/* <button>Follow</button> */}
      </div>

      <div className="meta-info">
        <p className="name">
          <Shimmer className="name-sh" />
        </p>

        <p className="bio">
          <Shimmer className="bio-sh" />
        </p>
      </div>
    </ProfileCardShimmerContainer>
  );
};
