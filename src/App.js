import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Presale from './pages/Presale';
import Roadmap from './pages/Roadmap';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: alchemyApiKey }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: theme.colors.primary,
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        })}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/presale" element={<Presale />} />
              <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
