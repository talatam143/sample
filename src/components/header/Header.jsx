import React from "react";
import "./header-styles.css";
import { BookIcon } from "../../assets/icons";

const Header = () => {
  return (
    <div className="header-container">
      <BookIcon />
      <p className="header-title" onClick={() => (window.location.href = "/")}>
        Book Extracts from Pan Macmillan
      </p>
    </div>
  );
};

export default Header;
