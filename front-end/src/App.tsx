import { ConnectButton } from '@mysten/dapp-kit';
import MintNFT from './components/MintNFT';
import './styles/App.css';

export default function App() {
  return (
    <div className="app">
      <h1>🖼️ NFT Minter</h1>

      <div className="wallet">
        <ConnectButton />
      </div>

      <MintNFT />
    </div>
  );
}
