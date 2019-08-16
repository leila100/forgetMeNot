import styled from "styled-components";

import { flexRow, Button } from "./commonStyles";

export const BtnGroup = styled(flexRow)`
  flex-wrap: wrap;
  margin-bottom: 10px;
  button {
    width: 120px;
    border-radius: 20px;
    color: #132021;
    background-color: ${props => props.clicked && "#284243"};
    i {
      margin-right: 5px;
    }
  }
`;

export const TypeBtn = styled(Button)`
  border: ${props => props.clicked && "6px solid #284243"};
`;

export const InputGroup = styled(flexRow)`
  flex-wrap: wrap;
  justify-content: flex-start;
`;
