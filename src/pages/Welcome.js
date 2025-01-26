import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import RobotModel from '../components/3d/RobotModel';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primary};
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 0;
  filter: saturate(1.2) contrast(1.1);
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary} 0%,
      transparent 70%
    );
    z-index: 1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 600px;
  z-index: 3;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.primary} 0%,
      transparent 70%
    );
    z-index: -1;
    opacity: 0.8;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 90%;
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.primary};
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    background: ${({ theme }) => theme.gradients.hover};
    
    &::before {
      left: 100%;
    }
  }
`;

const ModelContainer = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`;

const LiveStats = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 5%;
  right: 5%;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background: ${({ theme }) => theme.gradients.glass};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    gap: 1rem;
    bottom: 1rem;
    left: 3%;
    right: 3%;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 40%;
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.accent};
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }
`;

const InfoSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.secondary};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.3;
  }
`;

const InfoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 3rem;
  text-align: center;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const InfoCard = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const InfoCardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const InfoCardText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  font-size: 1.1rem;
`;

const Welcome = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const navigate = useNavigate();

  return (
    <WelcomeContainer>
      <HeroSection ref={ref}>
        <BackgroundVideo
          autoPlay
          muted
          loop
          playsInline
          src="/videos/anasayfavideosu.mp4"
        />
        <HeroContent
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Title>
            Own the Future of Robotics
          </Title>
          <Description>
            Invest in fractional ownership of revenue-generating robots. 
            Join the revolution in automated service delivery and earn passive income.
          </Description>
          <CTAButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/presale')}
          >
            Go to App
          </CTAButton>
        </HeroContent>

        <ModelContainer>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Suspense fallback={null}>
              <RobotModel />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </ModelContainer>

        <LiveStats
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <StatItem>
            <h3>50+</h3>
            <p>Active Robots</p>
          </StatItem>
          <StatItem>
            <h3>$2.5M+</h3>
            <p>Total Revenue</p>
          </StatItem>
          <StatItem>
            <h3>10,000+</h3>
            <p>Token Holders</p>
          </StatItem>
          <StatItem>
            <h3>95%</h3>
            <p>Utilization Rate</p>
          </StatItem>
        </LiveStats>
      </HeroSection>

      <InfoSection>
        <InfoContainer>
          <SectionTitle>Why Choose XRobot?</SectionTitle>
          <InfoGrid>
            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <InfoCardTitle>Innovative Technology</InfoCardTitle>
              <InfoCardText>
                Our robots are powered by cutting-edge AI and automation technology, 
                ensuring reliable and efficient service delivery across various industries.
              </InfoCardText>
            </InfoCard>

            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InfoCardTitle>Fractional Ownership</InfoCardTitle>
              <InfoCardText>
                Through blockchain technology, we enable investors to own a share of our 
                revenue-generating robots with minimal capital requirements.
              </InfoCardText>
            </InfoCard>

            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <InfoCardTitle>Passive Income</InfoCardTitle>
              <InfoCardText>
                Token holders earn regular income from robot operations, with smart 
                contracts ensuring transparent and automatic revenue distribution.
              </InfoCardText>
            </InfoCard>
          </InfoGrid>
        </InfoContainer>
      </InfoSection>
    </WelcomeContainer>
  );
};

export default Welcome;
