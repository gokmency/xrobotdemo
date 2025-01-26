import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RobotModel from '../components/3d/RobotModel';
import { FiClock, FiUsers, FiTrendingUp, FiTarget } from 'react-icons/fi';

const PresaleContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5% 40px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ModelContainer = styled.div`
  height: 500px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.gradients.glass};
    pointer-events: none;
  }
`;

const InfoContainer = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 30px;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Timer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
`;

const TimeUnit = styled.div`
  text-align: center;
  padding: 15px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  span {
    display: block;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 5px;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px 0;
`;

const Stat = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  svg {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 5px;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const ProgressContainer = styled.div`
  margin: 30px 0;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.gradients.primary};
  width: ${({ progress }) => progress}%;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const PurchaseButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.gradients.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${({ theme }) => theme.gradients.primary};
    }
  }
`;

const calculateTimeLeft = () => {
  // 60 gün 12 saat sonrası için hedef tarih
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 60);
  targetDate.setHours(targetDate.getHours() + 12);

  const difference = targetDate - new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const Presale = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PresaleContainer>
      <Grid>
        <ModelContainer>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <RobotModel />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </ModelContainer>

        <InfoContainer>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            XRobot Presale
          </Title>
          <Description>
            Be among the first to own a share in our latest generation of service robots.
            Each token represents fractional ownership of a ServiceBot Pro, generating passive income
            through automated service delivery at premium venues.
          </Description>

          <Timer>
            <TimeUnit>
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <p>Days</p>
            </TimeUnit>
            <TimeUnit>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <p>Hours</p>
            </TimeUnit>
            <TimeUnit>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <p>Minutes</p>
            </TimeUnit>
            <TimeUnit>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <p>Seconds</p>
            </TimeUnit>
          </Timer>

          <Stats>
            <Stat>
              <FiTrendingUp />
              <h3>1.5 ETH</h3>
              <p>Token Price</p>
            </Stat>
            <Stat>
              <FiClock />
              <h3>0.15 ETH</h3>
              <p>Monthly Revenue</p>
            </Stat>
            <Stat>
              <FiTarget />
              <h3>95%</h3>
              <p>Utilization Rate</p>
            </Stat>
            <Stat>
              <FiUsers />
              <h3>10%</h3>
              <p>Ownership Share</p>
            </Stat>
          </Stats>

          <ProgressContainer>
            <ProgressBar>
              <Progress
                progress={65}
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </ProgressBar>
            <ProgressLabel>
              <span>65% Sold</span>
              <span>35 / 50 Tokens Available</span>
            </ProgressLabel>
          </ProgressContainer>

          <PurchaseButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Purchase Token (1.5 ETH)
          </PurchaseButton>
        </InfoContainer>
      </Grid>
    </PresaleContainer>
  );
}

export default Presale;
