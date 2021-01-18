import React from "react";

interface IHeader {
  text: string;
  refreshPage: () => void;
}

const Header = ({ text, refreshPage }: IHeader) => {
  return (
    <header className="App-header" onClick={refreshPage}>
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
