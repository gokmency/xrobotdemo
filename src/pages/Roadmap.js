import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RoadmapContainer = styled.div`
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
  margin-bottom: 3rem;
  text-align: center;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.accent};
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.3;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${({ align }) => (align === 'left' ? 'flex-start' : 'flex-end')};
  padding-left: ${({ align }) => (align === 'right' ? '50%' : '0')};
  padding-right: ${({ align }) => (align === 'left' ? '50%' : '0')};
  margin-bottom: 50px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${({ theme, completed }) => 
      completed ? theme.gradients.primary : theme.colors.secondary};
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const TimelineContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 25px;
  border-radius: 15px;
  width: 80%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    top: 50%;
    ${({ align }) => (align === 'left' ? 'right: -20px' : 'left: -20px')};
  }
`;

const Phase = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 15px;
  display: block;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Status = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-top: 10px;
  background: ${({ status, theme }) => 
    status === 'Completed' 
      ? 'rgba(0, 255, 0, 0.1)' 
      : status === 'In Progress'
      ? 'rgba(255, 165, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ status }) => 
    status === 'Completed' 
      ? '#00ff00' 
      : status === 'In Progress'
      ? '#ffa500'
      : '#ffffff'};
`;

const roadmapData = [
  {
    phase: 'Phase 1: Platform Launch',
    date: 'Q1 2025',
    description: 'Initial platform launch with core features including wallet integration, marketplace, and basic robot token functionality.',
    status: 'Completed',
    align: 'left'
  },
  {
    phase: 'Phase 2: Robot Fleet Expansion',
    date: 'Q2 2025',
    description: 'Deployment of additional robot types and expansion into new venue categories. Implementation of advanced booking system.',
    status: 'In Progress',
    align: 'right'
  },
  {
    phase: 'Phase 3: Enhanced Features',
    date: 'Q3 2025',
    description: 'Introduction of AI-driven analytics, predictive maintenance, and advanced revenue optimization algorithms.',
    status: 'Upcoming',
    align: 'left'
  },
  {
    phase: 'Phase 4: Global Expansion',
    date: 'Q4 2025',
    description: 'International market entry and establishment of regional operation hubs. Partnership program launch.',
    status: 'Upcoming',
    align: 'right'
  }
];

const Roadmap = () => {
  return (
    <RoadmapContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Project Roadmap
        </Title>

        <Timeline>
          {roadmapData.map((item, index) => (
            <TimelineItem
              key={index}
              align={item.align}
              completed={item.status === 'Completed'}
              initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent align={item.align}>
                <Phase>{item.phase}</Phase>
                <Date>{item.date}</Date>
                <Description>{item.description}</Description>
                <Status status={item.status}>{item.status}</Status>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Content>
    </RoadmapContainer>
  );
};

export default Roadmap;
