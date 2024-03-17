import React from 'react'
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <Wrapper>
    <div className="footer">
      <div className="fp_footer section_padding">
        <div className="fp_footer-links">
          <div className="fp_footer-links-div">
            <h4>Products</h4>
          </div>

          <div className="fp_footer-links-div">
            <h4>Resources</h4>
          </div>

          <div className="fp_footer-links-div">
            <h4>Technology</h4>
          </div>

          <div className="fp_footer-links-div">
            <h4>Company</h4>
            <a href="#">
              <p>About us</p>
            </a>
            <a href="#">
              <p>Career</p>
            </a>
            <a href="#">
              <p>Contact</p>
            </a>
          </div>

          <div className="fp_footer-links-div">
            <h4>Available on</h4>
            <div className="social-media">
              <FaFacebook className="m-1" />
              <FaTwitter className="m-1" />
              <FaInstagram className="m-1" />
              <FaLinkedin className="m-1" />
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="fp_footer-below">
          <div className="fp_footer-copyright">
            <p>
              @{new Date().getFullYear()} from Group 57 COSC4353. All right
              reserved.
            </p>
          </div>
          <div className="fp_footer-below-links">
            <a>
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
            <a>
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a>
              <div>
                <p>Security</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
  )
}
const Wrapper = styled.div`
 

  .section_padding {
    padding: 2rem 2rem;
  }
  .footer {
    background-color: black;
  }
  .fp_footer {
    display: flex;
    flex-direction: column;
  }
  .fp_footer-links {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
  }
  .fp_footer-links-div {
    width: 150px;
    margin: 1rem;
    justify-content: flext-start;
    flex-diraction: column;
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
  .social-media {
    displau: flex;
    flex-direction: row;
  }
  .fp_footer-links_div h4 {
    font-size: 16px;
    line-height: 17px;
    margin-bottom: 0.9rem;
    font-weight: bold;
  }

  .fp_footer-links_div p {
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 0.5rem 0;
    cursor: pointer;
  }

  .fp_footer-below {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.2rem;
  }

  .fp_footer-below-links {
    display: flex;
    flex-direction: row;
  }
  .fp_footer-below-links p {
    font-size: 12px;
    line-height: 15px;
    margin-left: 2rem;
    color: white;
    fontweight: 800;
  }
  hr {
    color: white !important;
    width: 100%;
  }
  .fp_footer-copyright p {
    font-size: 12px;
    line-height: 15px;
    color: white;
    fontweight: 800;
  }

  @media screen and (max-width: 850px) {
    .fp_footer-heading h1 {
      font-size: 44px;
      line-height: 50px;
    }
  }

  @media screen and (max-width: 550px) {
    .fp_footer-heading h1 {
      font-size: 34px;
      line-height: 42px;
    }
    .fp_footer-links div {
      margin: 1rem 0;
    }
    .fp_footer-btn p {
      font-size: 14px;
      line-height: 20px;
    }
    .fp_footer-below {
      flex-direction: column;
      justify-content: left;
    }
    .fp_footer-below-links {
      flex-direction: column;
    }
    .fp_footer-betow-links p {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 400px) {
    .fp_footer-heading h1 {
      font-size: 25px;
      line-height: 35px;
    }
  }
`;
export default Footer