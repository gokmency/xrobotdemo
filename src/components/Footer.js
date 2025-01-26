import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 2rem 5%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const GrainzLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FooterRight = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <Logo>XRobot</Logo>
          <PoweredBy>
            Powered by{' '}
            <GrainzLink 
              href="https://grainz.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Grainz Guild
            </GrainzLink>
          </PoweredBy>
        </FooterLeft>
        
        <FooterRight>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="mailto:contact@xrobot.io">Contact</FooterLink>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
