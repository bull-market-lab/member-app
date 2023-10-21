import WalletInfo from "@/src/components/wallet/WalletInfo";
import WalletConnect from "@/src/components/wallet/WalletConnect";
import useMyWallet from "@/src/hooks/useMyWallet";

const Wallet = () => {
  const { connectionStatus } = useMyWallet();
  return connectionStatus === "CONNECTED" ? <WalletInfo /> : <WalletConnect />;
};

export default Wallet;
