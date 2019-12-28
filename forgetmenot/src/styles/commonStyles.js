import styled from "styled-components";

export const navBgColor = "#666680";
export const headerBgColor = "#284243";
export const btnBgColor = "#4c688f";
export const btnBorder = "#b87a71";

export const flexRow = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const Container = styled(flexRow)`
  justify-content: space-between;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #d7d7d7;
  font-family: "Arimo", sans-serif;
`;

export const Button = styled.button`
  width: 200px;
  border-radius: 10px;
  background-color: ${props => (props.delete ? "red" : btnBgColor)};
  border: 1px solid ${btnBorder};
  padding: 10px 12px;
  color: white;
  margin: 10px auto;
  font-size: 1.4rem;
  outline: none;
  :hover {
    color: #284243;
    background-color: white;
  }
  #button {
    margin: 0;
    padding: 0;
  }
`;

export const Message = styled.div`
  color: ${props => (props.error ? "palevioletred" : "#284243")};
  font-size: 2.5rem;
  margin: 20px auto;
  text-align: center;
  div {
    margin-top: 10px;
    a {
      text-decoration: none;
      border-radius: 10px;
      background-color: ${btnBgColor};
      border: 1px solid ${btnBorder};
      padding: 10px 12px;
      color: white;
      margin: 10px auto;
      font-size: 1.6rem;
      outline: none;
      :hover {
        color: #284243;
        background-color: white;
      }
    }
  }
`;

export const Group = styled(flexRow)`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 1.8rem;
  color: #4c688f;
  i {
    cursor: pointer;
    padding-bottom: 7px;
    :hover {
      color: #b87a71;
    }
  }

  #links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    a {
      margin: 0 10px;
      text-decoration: none;
      color: #4c688f;
      padding-bottom: 7px;
      :hover {
        color: #b87a71;
      }
    }
    .active {
      padding-bottom: 4px;
      border-bottom: 3px solid #b87a71;
    }
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 1.7rem;
  text-align: center;
`;
