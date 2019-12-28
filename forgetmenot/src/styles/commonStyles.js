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

export const Header = styled(flexRow)`
  align-items: center;
  line-height: 1.5;
  background-color: ${headerBgColor};
  color: white;
  h1 {
    font-size: 3rem;
    font-family: "Trocchi", serif;
  }
  h2 {
    font-size: 2.5rem;
    font-family: "Arimo", sans-serif;
  }
  img {
    width: 20%;
    height: 80%;
  }
  div {
    margin: 10px;
  }
  @media (max-width: 550px) {
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.4rem;
    }
  }
`;

export const Button = styled.button`
  width: 200px;
  border-radius: 10px;
  background-color: ${btnBgColor};
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
      border-bottom: 3px solid #284243;
    }
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 1.7rem;
  text-align: center;
`;
