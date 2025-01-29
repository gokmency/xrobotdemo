import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown, FiChevronUp, FiAlertCircle } from 'react-icons/fi';
import { useAccount } from 'wagmi';

const MarketplaceContainer = styled.div`
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
  max-width: 1440px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  backdrop-filter: blur(20px);
  
  input {
    flex: 1;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
    outline: none;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
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
  gap: 20px;
  flex-wrap: wrap;
`;

const FilterDropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  backdrop-filter: blur(20px);
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.card.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  backdrop-filter: blur(20px);
  z-index: 10;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background: none;
  border: none;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text.primary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.card.hover};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  backdrop-filter: blur(20px);
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card.hover};
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${({ theme }) => theme.transitions.default};
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const CardPrice = styled.div`
  margin-bottom: 12px;
`;

const EthPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const UsdPrice = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const BuyButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.gradients.hover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const ListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  gap: 20px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ListImage = styled.div`
  width: 200px;
  height: 150px;
  background: ${({ theme }) => theme.gradients.primary};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const ListContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListActions = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
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

  svg {
    color: ${({ theme }) => theme.colors.accent};
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

const robotTypes = [
  { label: 'All Types', value: 'All' },
  { label: 'Service', value: 'Service' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Industrial', value: 'Industrial' }
];

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: '0-1 ETH', value: '0-1' },
  { label: '1-2 ETH', value: '1-2' },
  { label: '2-3 ETH', value: '2-3' },
  { label: '3+ ETH', value: '3+' }
];

const revenueRanges = [
  { label: 'All Revenue', value: 'all' },
  { label: '0-0.1 ETH', value: '0-0.1' },
  { label: '0.1-0.2 ETH', value: '0.1-0.2' },
  { label: '0.2+ ETH', value: '0.2+' }
];

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRevenueRange, setSelectedRevenueRange] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);
  const { isConnected } = useAccount();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const filterRobots = (robots) => {
    return robots.filter(robot => {
      const matchesSearch = robot.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || robot.type === selectedType;
      
      const price = parseFloat(robot.price);
      const matchesPrice = selectedPriceRange === 'all' ||
        (selectedPriceRange === '0-1' && price <= 1) ||
        (selectedPriceRange === '1-2' && price > 1 && price <= 2) ||
        (selectedPriceRange === '2-3' && price > 2 && price <= 3) ||
        (selectedPriceRange === '3+' && price > 3);

      const revenue = parseFloat(robot.revenue);
      const matchesRevenue = selectedRevenueRange === 'all' ||
        (selectedRevenueRange === '0-0.1' && revenue <= 0.1) ||
        (selectedRevenueRange === '0.1-0.2' && revenue > 0.1 && revenue <= 0.2) ||
        (selectedRevenueRange === '0.2+' && revenue > 0.2);

      return matchesSearch && matchesType && matchesPrice && matchesRevenue;
    });
  };

  const sortRobots = (robots) => {
    return [...robots].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'revenue-desc':
          return parseFloat(b.revenue) - parseFloat(a.revenue);
        case 'utilization-desc':
          return parseFloat(b.utilization) - parseFloat(a.utilization);
        default:
          return 0;
      }
    });
  };

  const filteredAndSortedRobots = useMemo(() => {
    return sortRobots(filterRobots(mockRobots));
  }, [searchTerm, selectedType, selectedPriceRange, selectedRevenueRange, sortBy]);

  if (!isConnected) {
    return (
      <MarketplaceContainer>
        <NoWalletMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertCircle size={50} color="#e2c2ff" />
          <h2>Please connect your wallet</h2>
          <p>Connect your wallet to view your dashboard and manage your robot tokens.</p>
        </NoWalletMessage>
      </MarketplaceContainer>
    );
  }

  return (
    <MarketplaceContainer>
      <Content>
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
            <FilterDropdown className="dropdown">
              <DropdownButton onClick={() => toggleDropdown('sort')}>
                Sort By {openDropdown === 'sort' ? <FiChevronUp /> : <FiChevronDown />}
              </DropdownButton>
              <AnimatePresence>
                {openDropdown === 'sort' && (
                  <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {filterOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        active={sortBy === option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setOpenDropdown(null);
                        }}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </AnimatePresence>
            </FilterDropdown>

            <FilterDropdown className="dropdown">
              <DropdownButton onClick={() => toggleDropdown('type')}>
                Robot Type {openDropdown === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </DropdownButton>
              <AnimatePresence>
                {openDropdown === 'type' && (
                  <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {robotTypes.map((type) => (
                      <DropdownItem
                        key={type.value}
                        active={selectedType === type.value}
                        onClick={() => {
                          setSelectedType(type.value);
                          setOpenDropdown(null);
                        }}
                      >
                        {type.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </AnimatePresence>
            </FilterDropdown>

            <FilterDropdown className="dropdown">
              <DropdownButton onClick={() => toggleDropdown('price')}>
                Price Range {openDropdown === 'price' ? <FiChevronUp /> : <FiChevronDown />}
              </DropdownButton>
              <AnimatePresence>
                {openDropdown === 'price' && (
                  <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {priceRanges.map((range) => (
                      <DropdownItem
                        key={range.value}
                        active={selectedPriceRange === range.value}
                        onClick={() => {
                          setSelectedPriceRange(range.value);
                          setOpenDropdown(null);
                        }}
                      >
                        {range.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </AnimatePresence>
            </FilterDropdown>

            <FilterDropdown className="dropdown">
              <DropdownButton onClick={() => toggleDropdown('revenue')}>
                Revenue {openDropdown === 'revenue' ? <FiChevronUp /> : <FiChevronDown />}
              </DropdownButton>
              <AnimatePresence>
                {openDropdown === 'revenue' && (
                  <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {revenueRanges.map((range) => (
                      <DropdownItem
                        key={range.value}
                        active={selectedRevenueRange === range.value}
                        onClick={() => {
                          setSelectedRevenueRange(range.value);
                          setOpenDropdown(null);
                        }}
                      >
                        {range.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </AnimatePresence>
            </FilterDropdown>
          </FiltersBar>
        </Header>

        {viewMode === 'grid' ? (
          <Grid>
            {filteredAndSortedRobots.map((robot) => (
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
        ) : (
          <ListView>
            {filteredAndSortedRobots.map((robot) => (
              <ListItem
                key={robot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListImage>
                  <img src={robot.image} alt={robot.name} />
                </ListImage>
                <ListContent>
                  <CardTitle>{robot.name}</CardTitle>
                  <CardStats>
                    <span>Revenue: {robot.revenue}</span>
                    <span>Utilization: {robot.utilization}</span>
                  </CardStats>
                </ListContent>
                <ListActions>
                  <CardPrice>
                    <EthPrice>{robot.price}</EthPrice>
                    <UsdPrice>{robot.usdPrice}</UsdPrice>
                  </CardPrice>
                  <BuyButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now
                  </BuyButton>
                </ListActions>
              </ListItem>
            ))}
          </ListView>
        )}
      </Content>
    </MarketplaceContainer>
  );
};

export default Marketplace;
