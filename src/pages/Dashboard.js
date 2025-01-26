import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiActivity, FiPieChart, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useAccount } from 'wagmi';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5% 40px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Title = styled.h2`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 600;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.8;
`;

const TokensTable = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 20px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 20px;
    
    > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &::before {
        content: attr(data-label);
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text.secondary};
      }
    }
  }
`;

const TokenName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const TokenImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.gradients.primary};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ClaimButton = styled(motion.button)`
  padding: 8px 16px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.gradients.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoWalletMessage = styled(motion.div)`
  text-align: center;
  margin-top: 100px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 2rem;
  }
`;

const mockData = {
  totalValue: '7.5 ETH',
  monthlyRevenue: '0.75 ETH',
  tokensOwned: '5',
  totalRewards: '2.25 ETH',
  tokens: [
    {
      id: 1,
      name: 'ServiceBot Pro #123',
      image: '/robots/robot1.jpg',
      ownership: '10%',
      revenue: '0.15 ETH',
      rewards: '0.45 ETH',
      claimable: '0.05 ETH',
    },
    {
      id: 2,
      name: 'EventBot Elite #45',
      image: '/robots/robot2.jpg',
      ownership: '10%',
      revenue: '0.2 ETH',
      rewards: '0.6 ETH',
      claimable: '0.08 ETH',
    },
    {
      id: 3,
      name: 'IndustrialBot X #78',
      image: '/robots/robot3.jpg',
      ownership: '10%',
      revenue: '0.3 ETH',
      rewards: '0.9 ETH',
      claimable: '0.12 ETH',
    },
  ],
};

const Dashboard = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <DashboardContainer>
        <NoWalletMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertCircle size={50} color="#e2c2ff" />
          <h2>Please connect your wallet</h2>
          <p>Connect your wallet to view your dashboard and manage your robot tokens.</p>
        </NoWalletMessage>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <Title>Portfolio Value</Title>
            <FiDollarSign />
          </CardHeader>
          <Value>{mockData.totalValue}</Value>
          <Subtitle>Total value of your robot tokens</Subtitle>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader>
            <Title>Monthly Revenue</Title>
            <FiTrendingUp />
          </CardHeader>
          <Value>{mockData.monthlyRevenue}</Value>
          <Subtitle>Revenue generated this month</Subtitle>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <Title>Tokens Owned</Title>
            <FiPieChart />
          </CardHeader>
          <Value>{mockData.tokensOwned}</Value>
          <Subtitle>Number of robot tokens you own</Subtitle>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <Title>Total Rewards</Title>
            <FiActivity />
          </CardHeader>
          <Value>{mockData.totalRewards}</Value>
          <Subtitle>Total rewards earned to date</Subtitle>
        </Card>
      </Grid>

      <TokensTable>
        <TableHeader>
          <span>Robot Token</span>
          <span>Ownership</span>
          <span>Revenue</span>
          <span>Total Rewards</span>
          <span>Claimable</span>
        </TableHeader>
        {mockData.tokens.map((token, index) => (
          <TableRow
            key={token.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TokenName data-label="Robot Token">
              <TokenImage>
                <img src={token.image} alt={token.name} />
              </TokenImage>
              {token.name}
            </TokenName>
            <div data-label="Ownership">{token.ownership}</div>
            <div data-label="Revenue">{token.revenue}</div>
            <div data-label="Total Rewards">{token.rewards}</div>
            <ClaimButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-label="Claimable"
            >
              Claim {token.claimable}
            </ClaimButton>
          </TableRow>
        ))}
      </TokensTable>
    </DashboardContainer>
  );
};

export default Dashboard;
