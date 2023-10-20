// import { useShuttle } from "@delphi-labs/shuttle-react";
import { useWallet } from '@terra-money/wallet-kit'
// import { useChain } from "@cosmos-kit/react";
import { useContext } from 'react'

import ChainContext from '@/src/contexts/ChainContext'
import { Chain, ChainConfig, ChainID } from '../utils/constants'
import { LCDClient } from '@terra-money/feather.js'
// import { getCosmosKitChainNameByChainId } from "@/utils/cosmosKitNetwork";

type WalletHookReturnType = {
  myAddress: string | undefined
  currentChain: Chain
  currentChainId: ChainID
  currentChainConfig: ChainConfig
  lcd: LCDClient | undefined
  distributionContractAddress: string
  memberContractAddress: string
  threadContractAddress: string
  connect: () => void
  disconnect: () => void
  availableWallets: any
  postTx: any
  connectionStatus: any
}

const useMyWallet = (): WalletHookReturnType => {
  const { myAddress, currentChain, currentChainId, currentChainConfig, lcd } =
    useContext(ChainContext)

  //// terra wallet kit specific
  const {
    connect,
    disconnect,
    availableWallets,
    post: postTx,
    status: connectionStatus,
  } = useWallet()

  return {
    myAddress,
    currentChain,
    currentChainId,
    currentChainConfig,
    lcd,
    distributionContractAddress: currentChainConfig.distributionContractAddress,
    memberContractAddress: currentChainConfig.memberContractAddress,
    threadContractAddress: currentChainConfig.threadContractAddress,
    connect,
    disconnect,
    //// terra wallet kit specific
    availableWallets,
    postTx,
    connectionStatus,
  }
}

export default useMyWallet
