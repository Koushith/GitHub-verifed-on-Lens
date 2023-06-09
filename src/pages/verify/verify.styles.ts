import { styled } from "styled-components";

export const VerifyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10rem;
  margin-top: 15rem;
  .left {
    .form-container {
      min-width: 400px;
      padding: 2rem;
      border-radius: 4px;
      border: 1px solid rgb(225, 228, 232);
      .title {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 2rem;
      }
      .form-group {
        margin-bottom: 1rem;
      }

      .prove-button {
        margin-top: 1rem;
      }
    }
  }

  .right {
    h1 {
      font-size: 3.4rem;
      font-weight: 700;
      line-height: 40px;
    }

    p {
      font-weight: 400;
      font-size: 1.6rem;
      color: #4b587c;
      margin-top: 1rem;
    }
  }

  .dev-list {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    font-size: 1.4rem;
    color: #4b587c;
    margin-left: 1rem;
    .list {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid #fff;
        margin-left: -1rem;
      }
    }
  }
`;
