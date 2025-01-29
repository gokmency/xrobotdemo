import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#0052FF',
    secondary: '#1A1B1F',
    background: '#000000',
    accent: '#4C82FB',
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      accent: '#4C82FB',
      logo: '#FFFFFF'
    },
    card: {
      background: 'rgba(26, 27, 31, 0.6)',
      border: 'rgba(45, 47, 54, 0.5)',
      hover: 'rgba(26, 27, 31, 0.8)'
    },
    success: '#00D395',
    warning: '#FFB802',
    error: '#FF6B6B'
  },
  fonts: {
    primary: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    monospace: "'Roboto Mono', monospace"
  },
  gradients: {
    primary: 'linear-gradient(225deg, #0052FF 0%, #4C82FB 100%)',
    hover: 'linear-gradient(225deg, #4C82FB 0%, #0052FF 100%)',
    glass: 'linear-gradient(180deg, rgba(26, 27, 31, 0.8) 0%, rgba(26, 27, 31, 0.4) 100%)',
    card: 'linear-gradient(180deg, rgba(26, 27, 31, 0.6) 0%, rgba(26, 27, 31, 0.8) 100%)',
    glow: 'radial-gradient(circle at center, rgba(0, 82, 255, 0.08) 0%, transparent 70%)'
  },
  shadows: {
    primary: '0 8px 24px rgba(0, 82, 255, 0.15)',
    card: '0 8px 24px rgba(0, 0, 0, 0.2)',
    glow: '0 0 40px rgba(0, 82, 255, 0.15)'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px'
  },
  transitions: {
    default: 'all 0.3s ease',
    slow: 'all 0.6s ease',
    fast: 'all 0.15s ease'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '20px',
    full: '9999px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  }
};
