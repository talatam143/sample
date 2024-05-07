import React from "react";
import linkIcon from "../../assets/link.svg";
import githubICon from "../../assets/github.svg";
import "./footer-styles.scss";


//Footer component with name and personal project details
const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-name">Sri Manikanta</p>
      <div className="footer-project-container">
        <a
          href="https://transactionstore.srimanikanta.in/"
          target="_blank"
          rel="noreferrer"
          className="transaction-store-link"
        >
          <span className="footer-project-heading">Transaction Store</span>
          <img src={linkIcon} alt="link-img" />
        </a>
        <p>
          Transactions Store: Effortless Spending Management and Analysis.
          (Mobile & Tablet support only)
        </p>
        <p>Credentials for test account:</p>
        <p>Email : testuser@gmail.com</p>
        <p>Password : Test@123</p>
      </div>
      <div className="footer-git-container">
        <a
          href="https://github.com/talatam143/money_tracer"
          target="_blank"
          rel="noreferrer"
          className="transaction-git-link"
        >
          <img src={githubICon} alt="link-img" />
          Client Code
        </a>
        <a
          href="https://github.com/talatam143/money-tracking-server"
          target="_blank"
          rel="noreferrer"
          className="transaction-git-link"
        >
          <img src={githubICon} alt="link-img" />
          Server Code
        </a>
      </div>
    </div>
  );
};

export default Footer;
