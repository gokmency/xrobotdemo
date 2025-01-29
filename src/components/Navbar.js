import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.background : 'transparent'};
  backdrop-filter: ${({ scrolled }) => 
    scrolled ? 'blur(10px)' : 'none'};
  border-bottom: 1px solid ${({ scrolled }) => 
    scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 32px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  padding: 5rem 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ active, theme }) => 
    active ? theme.colors.text.primary : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ active }) => (active ? '600' : '500')};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ConnectButtonWrapper = styled.div`
  margin-left: 1rem;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo to="/">
          <img src="/logo.png" alt="XRobot" />
          XRobot
        </Logo>

        <NavLinks>
          <NavLink to="/" active={isActive('/')}>
            Ana Sayfa
          </NavLink>
          <NavLink to="/marketplace" active={isActive('/marketplace')}>
            Marketplace
          </NavLink>
          <NavLink to="/about" active={isActive('/about')}>
            Hakkımızda
          </NavLink>
          <NavLink to="/roadmap" active={isActive('/roadmap')}>
            Yol Haritası
          </NavLink>
          <ConnectButtonWrapper>
            <ConnectButton />
          </ConnectButtonWrapper>
        </NavLinks>

        <MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MenuButton>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/" active={isActive('/')} onClick={() => setMobileMenuOpen(false)}>
                Ana Sayfa
              </NavLink>
              <NavLink to="/marketplace" active={isActive('/marketplace')} onClick={() => setMobileMenuOpen(false)}>
                Marketplace
              </NavLink>
              <NavLink to="/about" active={isActive('/about')} onClick={() => setMobileMenuOpen(false)}>
                Hakkımızda
              </NavLink>
              <NavLink to="/roadmap" active={isActive('/roadmap')} onClick={() => setMobileMenuOpen(false)}>
                Yol Haritası
              </NavLink>
              <ConnectButtonWrapper>
                <ConnectButton />
              </ConnectButtonWrapper>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 