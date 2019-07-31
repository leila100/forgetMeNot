import styled from "styled-components";

export const navBgColor = "#666680";
export const headerBgColor = "#284243";
export const btnBgColor = "#4c688f";
export const btnBorder = "#b87a71";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  padding: 0 2%;
  margin: 20px auto;
`;

export const Header = styled.div`
  display: flex;
  line-height: 2;
  background-color: ${headerBgColor};
  color: white;
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  img {
    width: 20%;
    height: 80%;
    margin: 10px;
  }
  div {
    margin: 10px;
  }
`;

export const Button = styled.button`
  width: 70%;
  border-radius: 10px;
  background-color: ${btnBgColor};
  border: 1px solid ${btnBorder};
  padding: 10px 12px;
  color: white;
  margin: auto;
`;
