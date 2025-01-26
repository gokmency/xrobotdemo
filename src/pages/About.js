import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5% 40px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled(motion.div)`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  
  &:hover {
    .member-image {
      transform: translateY(-10px);
      box-shadow: 0 20px 30px rgba(0, 240, 255, 0.2);
    }
    
    .social-links {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MemberImage = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.3;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
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
          About XRobot
        </Title>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Our Vision</SectionTitle>
          <Text>
            XRobot is revolutionizing the robotics industry by democratizing access to 
            advanced service robots through blockchain technology. We believe in creating 
            opportunities for everyone to participate in the growing robotics economy 
            through fractional ownership and automated revenue distribution.
          </Text>
        </Section>

        <Grid>
          <Card
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Innovation</h3>
            <p>
              Our platform combines cutting-edge robotics with blockchain technology,
              creating a new paradigm in automated service delivery and asset ownership.
            </p>
          </Card>

          <Card
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Transparency</h3>
            <p>
              All transactions and revenue distributions are recorded on the blockchain,
              ensuring complete transparency and trust in our ecosystem.
            </p>
          </Card>

          <Card
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Community</h3>
            <p>
              We're building a global community of robot token holders who share in the
              success of our automated service network.
            </p>
          </Card>
        </Grid>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle>Meet Our Team</SectionTitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionTitle>Technology</SectionTitle>
          <Text>
            Our robots are equipped with advanced AI and automation capabilities,
            enabling them to provide consistent, high-quality service across various
            venues. Each robot is tokenized on the blockchain, with ownership divided
            into 10 equal shares, allowing investors to participate in the robot
            economy with lower capital requirements.
          </Text>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default About;
