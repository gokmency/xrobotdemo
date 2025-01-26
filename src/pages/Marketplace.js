import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';

const MarketplaceContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5% 40px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  input {
    flex: 1;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
    padding: 0 10px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }

    &:focus {
      outline: none;
    }
  }
`;

const FilterButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled(motion.button)`
  padding: 12px;
  background: ${({ active, theme }) =>
    active ? theme.colors.accent : theme.colors.secondary};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.accent : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterDropdown = styled(motion.div)`
  position: relative;
`;

const DropdownButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px 0;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.gradients.primary};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const EthPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`;

const UsdPrice = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const BuyButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.gradients.hover};
  }
`;

const mockRobots = [
  {
    id: 1,
    name: 'ServiceBot Pro #123',
    image: '/robots/robot1.jpg',
    price: '1.5 ETH',
    usdPrice: '$2,745.00',
    revenue: '0.15 ETH/month',
    utilization: '95%',
    type: 'Service'
  },
  {
    id: 2,
    name: 'EventBot Elite #45',
    image: '/robots/robot2.jpg',
    price: '2.0 ETH',
    usdPrice: '$3,660.00',
    revenue: '0.2 ETH/month',
    utilization: '90%',
    type: 'Entertainment'
  },
  {
    id: 3,
    name: 'IndustrialBot X #78',
    image: '/robots/robot3.jpg',
    price: '3.0 ETH',
    usdPrice: '$5,490.00',
    revenue: '0.3 ETH/month',
    utilization: '98%',
    type: 'Industrial'
  },
  // Daha fazla robot eklenebilir
];

const filterOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Recently Listed', value: 'recent' },
  { label: 'Revenue: High to Low', value: 'revenue-desc' },
  { label: 'Utilization: High to Low', value: 'utilization-desc' }
];

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedType, setSelectedType] = useState('All');

  return (
    <MarketplaceContainer>
      <Header>
        <SearchBar>
          <SearchInput>
            <FiSearch size={20} color="#b3b3cc" />
            <input 
              type="text" 
              placeholder="Search robots by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          <FilterButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <FiFilter size={20} />
            Filters
          </FilterButton>
          <ViewToggle>
            <ToggleButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGrid size={20} />
            </ToggleButton>
            <ToggleButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiList size={20} />
            </ToggleButton>
          </ViewToggle>
        </SearchBar>

        <FiltersBar>
          <FilterDropdown>
            <DropdownButton>
              Sort By <FiChevronDown />
            </DropdownButton>
          </FilterDropdown>
          <FilterDropdown>
            <DropdownButton>
              Robot Type <FiChevronDown />
            </DropdownButton>
          </FilterDropdown>
          <FilterDropdown>
            <DropdownButton>
              Price Range <FiChevronDown />
            </DropdownButton>
          </FilterDropdown>
          <FilterDropdown>
            <DropdownButton>
              Revenue <FiChevronDown />
            </DropdownButton>
          </FilterDropdown>
        </FiltersBar>
      </Header>

      <Grid>
        {mockRobots.map((robot) => (
          <Card
            key={robot.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CardImage>
              <img src={robot.image} alt={robot.name} />
            </CardImage>
            <CardContent>
              <CardTitle>{robot.name}</CardTitle>
              <CardPrice>
                <EthPrice>{robot.price}</EthPrice>
                <UsdPrice>{robot.usdPrice}</UsdPrice>
              </CardPrice>
              <CardStats>
                <span>Revenue: {robot.revenue}</span>
                <span>Utilization: {robot.utilization}</span>
              </CardStats>
              <BuyButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </BuyButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </MarketplaceContainer>
  );
};

export default Marketplace;
