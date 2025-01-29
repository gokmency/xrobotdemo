import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterSection = styled.section`
  padding: 8rem 0;
  background: ${({ theme }) => theme.colors.card.background};
  backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.card.border};
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 5%;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const BrandSection = styled.div`
  grid-column: span 2;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const LogoImage = styled.img`
  height: 2.5rem;
`;

const LogoText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Tagline = styled.p`
  margin-top: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const MenuSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuItem = styled.li`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BottomSection = styled.div`
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.card.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BottomLinks = styled.ul`
  display: flex;
  gap: 1rem;
`;

const BottomLink = styled.li`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const footerData = {
  logo: {
    src: "/logo.png",
    alt: "XRobot Logo",
    title: "XRobot",
    url: "/"
  },
  tagline: "Robotik Geleceğine Yatırım Yapın",
  menuItems: [
    {
      title: "Ürün",
      links: [
        { text: "Genel Bakış", url: "/" },
        { text: "Ön Satış", url: "/presale" },
        { text: "Pazar Yeri", url: "/marketplace" },
        { text: "Dashboard", url: "/dashboard" },
      ]
    },
    {
      title: "Şirket",
      links: [
        { text: "Hakkımızda", url: "/about" },
        { text: "Ekip", url: "/about" },
        { text: "İletişim", url: "/contact" }
      ]
    },
    {
      title: "Kaynaklar",
      links: [
        { text: "Yardım", url: "#" },
        { text: "Dokümantasyon", url: "#" },
        { text: "SSS", url: "#" }
      ]
    },
    {
      title: "Sosyal",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Discord", url: "#" },
        { text: "Telegram", url: "#" }
      ]
    }
  ],
  copyright: "© 2024 XRobot. Tüm hakları saklıdır.",
  bottomLinks: [
    { text: "Kullanım Koşulları", url: "#" },
    { text: "Gizlilik Politikası", url: "#" }
  ]
};

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <FooterGrid>
          <BrandSection>
            <LogoContainer>
              <Link to={footerData.logo.url}>
                <LogoImage src={footerData.logo.src} alt={footerData.logo.alt} />
              </Link>
              <LogoText>{footerData.logo.title}</LogoText>
            </LogoContainer>
            <Tagline>{footerData.tagline}</Tagline>
          </BrandSection>

          {footerData.menuItems.map((section, index) => (
            <MenuSection key={index}>
              <h3>{section.title}</h3>
              <MenuList>
                {section.links.map((link, linkIndex) => (
                  <MenuItem key={linkIndex}>
                    <Link to={link.url}>{link.text}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </MenuSection>
          ))}
        </FooterGrid>

        <BottomSection>
          <Copyright>{footerData.copyright}</Copyright>
          <BottomLinks>
            {footerData.bottomLinks.map((link, index) => (
              <BottomLink key={index}>
                <Link to={link.url}>{link.text}</Link>
              </BottomLink>
            ))}
          </BottomLinks>
        </BottomSection>
      </Container>
    </FooterSection>
  );
};

export { Footer }; 