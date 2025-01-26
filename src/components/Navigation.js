import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 5%;
  background: ${({ scrolled, theme }) =>
    scrolled ? theme.colors.secondary : 'transparent'};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(10px)' : 'none')};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  position: relative;
  font-weight: 500;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: ${({ theme }) => theme.gradients.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &.active:after {
    width: 100%;
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';
  const isSimpleNav = isHomePage || isAboutPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <NavContainer>
        <Logo to="/">XRobot</Logo>
        
        <NavLinks>
          {!isSimpleNav && (
            <>
              <NavLink to="/marketplace" className={location.pathname === '/marketplace' ? 'active' : ''}>
                Marketplace
              </NavLink>
              <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                Dashboard
              </NavLink>
              <NavLink to="/presale" className={location.pathname === '/presale' ? 'active' : ''}>
                Presale
              </NavLink>
            </>
          )}
          {isSimpleNav ? (
            <>
              <NavLink to="/presale">Go to App</NavLink>
              <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                About Us
              </NavLink>
            </>
          ) : (
            <ConnectButton />
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
