import React from "react";
import "./Footer.css";
import Logo from "../../assets/logo-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export const Footer = () => {
  return (
    <footer>
      <div className="column">
      <span style={{
            fontFamily: 'Arial, sans-serif',
            color: '#c23d69',
            fontSize: '38px',
            textDecoration:'none',
            fontWeight:'800',
            marginLeft:'32px'
          }}>
            rent
          </span>
          <span style={{
            fontFamily: 'Arial, sans-serif',
            color: '#86bb44',
            fontSize: '38px',
            fontWeight:'800',
          }}>
            It
          </span>
        <p className="description">Hub for Borrowing & Lending</p>
        <p className="copyright">© Copyright 2024.</p>
      </div>
      <div className="column"></div>
      <div className="column">
        <h3 className="contact">contactUs</h3>
        <a className="email" href="mailto:info@rentit.in">
          <p>info@rentit.in</p>
        </a>
        <a className="phone" href="tel:+916978980938">
          <p>+91-6978980938</p>
        </a>
      </div>
      <div className="column">
        <h3 className="contact">ourLocation</h3>
        <p>Kumaraswamy Layout</p>
        <p>Bengaluru</p>
      </div>
      <div className="column">
        <h3 className="contact">followUs</h3>
        <FontAwesomeIcon icon={["fab", "facebook"]} onClick={() => {window.open("https://www.facebook.com", '_blank')}}/>
        <FontAwesomeIcon icon={["fab", "instagram"]} onClick={() => {window.open("https://www.instagram.com", '_blank')}}/>
        <FontAwesomeIcon icon={["fab", "linkedin"]} onClick={() => {window.open("https://www.linkedin.com", '_blank')}}/>
        <FontAwesomeIcon icon={["fab", "x-twitter"]} onClick={() => {window.open("https://www.twitter.com", '_blank')}}/>
      </div>
    </footer>
  );
};
