import styled from "styled-components";

import { flexRow } from "./commonStyles";
import { navBgColor } from "./commonStyles";

export const Logo = styled(flexRow)`
  img {
    width: 70px;
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

export const SideBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: ${props => (props.right ? "30%" : "15%")};
  padding: 10px;
  background-color: ${navBgColor};
  a {
    text-decoration: none;
    color: #f3eec3;
    font-size: 1.8rem;
    margin: 50px 5px;
    padding-bottom: 10px;
    :hover {
      color: #b87a71;
    }
  }
  .active {
    padding-bottom: 7px;
    border-bottom: 3px solid #284243;
  }
  h2 {
    font-size: 2.2rem;
    color: #f3eec3;
    margin: 50px auto;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
