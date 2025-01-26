# XRobot Demo

A cutting-edge platform for tokenizing real-world robot assets, enabling fractional ownership and automated revenue distribution.

## Features

- Interactive 3D robot visualization
- Web3 wallet integration
- Real-time analytics dashboard
- Secure marketplace for token trading
- Presale platform for new robot launches
- Responsive dark theme design

## Tech Stack

- React 18
- Three.js / React Three Fiber
- Web3Modal / Wagmi
- Styled Components
- Framer Motion
- Ethers.js

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or any Web3 wallet

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xrobotdemo.git
cd xrobotdemo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
REACT_APP_ALCHEMY_API_KEY=your_alchemy_api_key
REACT_APP_ALCHEMY_RPC_URL=your_alchemy_rpc_url
REACT_APP_ALCHEMY_WSS_URL=your_alchemy_wss_url
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

You need to set up the following environment variables in your `.env` file:

- `REACT_APP_WALLETCONNECT_PROJECT_ID`: Your WalletConnect Project ID
- `REACT_APP_ALCHEMY_API_KEY`: Your Alchemy API Key
- `REACT_APP_ALCHEMY_RPC_URL`: Your Alchemy RPC URL
- `REACT_APP_ALCHEMY_WSS_URL`: Your Alchemy WebSocket URL

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── 3d/            # 3D models and Three.js components
│   └── Navigation.js  # Main navigation component
├── pages/             # Page components
├── styles/            # Global styles and theme
├── utils/             # Utility functions
└── App.js            # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
