import styled from "styled-components";

import { navBgColor } from "./commonStyles";

export const TopBar = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SideBar = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: ${props => (props.right ? "30%" : "10%")};
  padding: 10px;
  background-color: ${navBgColor};
`;
