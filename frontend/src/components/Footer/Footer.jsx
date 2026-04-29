import React from "react";
import { Link } from "react-router-dom";
import navLinks from "../../data/navLinks";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-links">
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="links">
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="footer-icons">
                <FaFacebookF />
                <FaInstagram />
                <FaTiktok />
            </div>

            <h1 className="footer-logo">sheglam.</h1>
            <p className="footer-text">
                © 2026 Sheglam. All rights reserved.
            </p>

        </footer>
    );
};

export default Footer;