import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiTrendingUp, FiTarget } from 'react-icons/fi';
import { SplineScene } from '../components/ui/splite';

const PresaleContainer = styled.div`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ModelContainer = styled.div`
  height: 700px;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 500px;
  }
`;

const InfoContainer = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  backdrop-filter: blur(20px);
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
  
  span {
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  backdrop-filter: blur(20px);
`;

const TimeUnit = styled.div`
  text-align: center;
  
  span {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  margin-top: 30px;
`;

const Stat = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(20px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card.hover};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  h3 {
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    font-weight: 700;
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
  padding: 1.2rem;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  margin-top: 2rem;
  
  span {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 700;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    background: ${({ theme }) => theme.gradients.hover};
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
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full absolute inset-0 scale-110 transform -translate-y-10 z-10"
          />
        </ModelContainer>
        <InfoContainer>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            XRobot <span>Presale</span>
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
