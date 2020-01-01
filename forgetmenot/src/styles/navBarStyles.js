import styled from "styled-components";

import { flexRow } from "./commonStyles";

export const Logo = styled(flexRow)`
  img {
    width: 70px;
    height: 80px;
  }
  div {
    font-size: 3.3rem;
    font-family: "Indie Flower";
    align-self: center;
    color: #4c74ab;
  }
`;

export const TopBar = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
  }
  span {
    margin-right: 10px;
  }
  button {
    width: 100px;
    margin: 10px;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    margin: 0;
  }
`;
