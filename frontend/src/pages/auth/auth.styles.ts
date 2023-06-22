import { keyframes, styled } from "styled-components";
import { tablets, phones } from "../../utils";

export const VerifyContainer = styled.div`
  margin-top: 15rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3.4rem;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
  }

  p {
    font-weight: 400;
    font-size: 1.6rem;
    color: #4b587c;
    margin-top: 1rem;
    text-align: center;
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

  @media (${tablets}) {
    // Styles for tablets (if needed)
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 2rem;
  }
`;

export const QRCcodeContainer = styled.div`
  min-width: 450px;
  padding: 2rem;
  border: 1px solid #d9e1ec;
  border-radius: 4px;

  .title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.4rem;
  }

  .qr-code {
    background-color: #fff;
    border: 1px solid #d9e1ec;
    border-radius: 4px;
    width: fit-content;
    margin: 0 auto;

    .react-qr {
      padding: 1rem;
      height: 220px;
      width: 220px;
    }
  }

  .seperator {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.4rem;
    display: block;
  }

  .link {
    font-size: 1.4rem;
    color: #ff6154;
    display: block;
    text-align: center;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .scan-helper-text {
    text-align: center;

    margin-top: 2rem;
    font-weight: 400;
    font-size: 1.4rem;
    color: #4b587c;
    span {
      font-weight: 600;
      color: #ff6154;
      font-size: 1.4rem;
    }
  }
`;

export const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #005ef6;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spinAnimation} 1s linear infinite;
  margin-right: 8px;
`;

export const ProgressStatus = styled.div`
  margin-top: 16px;
  gap: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 1.4rem;
  color: #4b587c;
  border: 1px solid #d9e1ec;
  padding: 1.4rem 2rem;
  border-radius: 4px;
`;
