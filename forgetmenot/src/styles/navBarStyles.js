import styled from "styled-components";

import { navBgColor } from "./commonStyles";

export const TopBar = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 20%;
  }
`;

export const SideBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: ${props => (props.right ? "30%" : "10%")};
  padding: 10px;
  background-color: ${navBgColor};
  a {
    text-decoration: none;
    color: #f3eec3;
    font-size: 1.8rem;
    margin: 50px 5px;
    padding-bottom: 10px;
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
`;
