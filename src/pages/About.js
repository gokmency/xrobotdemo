import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5% 40px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: ${({ theme }) => theme.gradients.glow};
    pointer-events: none;
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const VisionSection = styled(motion.div)`
  padding: 40px;
  margin-bottom: 60px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(20px);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const VisionContent = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  
  span {
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 60px 0;
`;

const Card = styled(motion.div)`
  padding: 30px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(20px);
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card.hover};
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  padding: 30px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(20px);
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card.hover};
    
    .member-image {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.shadows.glow};
    }
    
    .social-links {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MemberImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.card.border};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const MemberRole = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  opacity: 0.7;
  transform: translateY(10px);
  transition: ${({ theme }) => theme.transitions.default};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const teamMembers = [
  {
    name: 'Abdülkadir Maslak',
    role: 'CEO & Founder',
    image: '/team/ercan.png',
    twitter: 'https://twitter.com/onimaslak',
    linkedin: 'https://linkedin.com/in/maslak'
  },
  {
    name: 'Burak Yüzgüç',
    role: 'CTO',
    image: '/team/burak.png',
    twitter: 'https://twitter.com/burakyzg',
    linkedin: 'https://linkedin.com/in/burakyuzguc'
  },
  {
    name: 'Gökmen Çelik',
    role: 'Head of Robotics',
    image: '/team/gokmen.png',
    twitter: 'https://twitter.com/gokmeneth',
    linkedin: 'https://linkedin.com/in/gokmencelik'
  },
  {
    name: 'Cektop',
    role: 'Marketing Director',
    image: '/team/gokmen.png',
    twitter: 'https://twitter.com/gokmen.png',
    linkedin: 'https://grainz.xyz'
  }
];

const About = () => {
  return (
    <AboutContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hakkımızda
        </Title>

        <VisionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VisionContent>
            <SectionTitle>Vizyonumuz <span>ve Misyonumuz</span></SectionTitle>
            <Text>
              XRobot olarak, robotik teknolojisini herkes için erişilebilir kılmayı hedefliyoruz. 
              Robotların kesirli sahipliği ile yatırımcılarımıza pasif gelir sağlarken, 
              aynı zamanda teknolojik inovasyonu demokratikleştiriyoruz.
            </Text>
          </VisionContent>
        </VisionSection>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>İnovasyon</h3>
            <p>En son teknolojileri kullanarak robotik alanında öncü çözümler geliştiriyoruz.</p>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Güvenilirlik</h3>
            <p>Blockchain teknolojisi ile güvenli ve şeffaf bir yatırım platformu sunuyoruz.</p>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3>Sürdürülebilirlik</h3>
            <p>Uzun vadeli değer yaratmayı ve sürdürülebilir büyümeyi hedefliyoruz.</p>
          </Card>
        </Grid>

        <SectionTitle>Ekibimiz</SectionTitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <MemberImage className="member-image">
                <img src={member.image} alt={member.name} />
              </MemberImage>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <SocialLinks className="social-links">
                <SocialLink href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </SocialLink>
                <SocialLink href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </SocialLink>
              </SocialLinks>
            </TeamMember>
          ))}
        </TeamGrid>
      </Content>
    </AboutContainer>
  );
};

export default About;
