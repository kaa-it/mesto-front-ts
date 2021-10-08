import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer page__section">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
