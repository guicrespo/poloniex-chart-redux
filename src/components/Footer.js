import React from 'react';
import githubIcon from '../images/github-icon.png';
import linkedinIcon from '../images/linkedin-icon.png';

const Footer = () => (
  <footer>
    <p className="footer-text">
      Criado por Guilherme Crespo
    </p>
    <a href="https://github.com/guicgs" target="_blank" rel="noopener noreferrer">
      <img src={githubIcon} alt="ícone do github" className="footer-git-image" />
    </a>
    <a href="https://www.linkedin.com/in/guicrespo/" target="_blank" rel="noopener noreferrer">
      <img src={linkedinIcon} alt="ícone do linkedin" className="footer-linkedin-image" />
    </a>
  </footer>
);

export default Footer;
