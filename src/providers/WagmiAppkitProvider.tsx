import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  arbitrum,
  base,
  scroll,
  polygon,
  sepolia,
  solana,
  solanaDevnet,
  solanaTestnet,
} from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import type { AppKitNetwork } from "@reown/appkit/networks";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com
// Using a temporary project ID - replace with your own from https://cloud.reown.com
const projectId = import.meta.env.VITE_PROJECT_ID || "temp-project-id-replace-me";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "https://pumpparade.com";


// 2. Create a metadata object - optional
const metadata = {
  name: "Pumpparada",
  description: "Pumpparada AppKit Example",
  url: FRONTEND_URL,
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  arbitrum,
  polygon,
  base,
  scroll,
  solana,
  solanaDevnet,
  solanaTestnet,
  sepolia,
];

// 4. Create Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter();

// 5. Create Bitcoin Adapter
const bitcoinWeb3JsAdapter = new BitcoinAdapter({ projectId });

// 6. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 7. Create modal
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter, bitcoinWeb3JsAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
  enableNetworkSwitch: true,     // allow choosing network in modal
  enableReconnect: false,        // disable auto-reconnect on reload
  themeMode: "dark",
  defaultNetwork: sepolia,
});

export function WagmiAppkitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
