export const NATIVE_DENOM = "uluna";
export const NATIVE_DENOM_DECIMALS = 6;

export const DAY_IN_SECONDS = 86400;

export const NAME_WARP_PLAYGROUND_ASTROPORT_LIMIT_ORDER =
  "Warp Playground Astroport Limit Order";
export const NAME_WARP_PLAYGROUND_ASTROPORT_DCA_ORDER =
  "Warp Playground Astroport DCA Order";

// ========== warp job labels ==========

export const LABEL_WARP_PLAYGROUND = "Warp Playground";

export const LABEL_ASTROPORT = "Astroport";
export const LABEL_OSMOSIS = "Osmosis";

export const LABEL_MARS = "Mars";
export const LABEL_CAVERN = "Cavern";

export const LABEL_LIMIT_ORDER = "Limit Order";
export const LABEL_YIELD_BEARING_LIMIT_ORDER = "Yield Bearing Limit Order";

export const LABEL_DCA_ORDER = "DCA Order";
export const LABEL_YIELD_BEARING_DCA_ORDER = "Yield Bearing DCA Order";

// ========== Chain ==========

export const CHAIN_TERRA = "terra";
export const CHAIN_NEUTRON = "neutron";
// export const CHAIN_OSMOSIS = "osmosis";

// export const CHAIN_ID_PHOENIX_ONE = "phoenix-1";
export const CHAIN_ID_PISCO_ONE = "pisco-1";
export const CHAIN_ID_LOCALTERRA = "localterra";
// export const CHAIN_ID_NEUTRON_ONE = "neutron-1";
export const CHAIN_ID_PION_ONE = "pion-1";
// export const CHAIN_ID_OSMOSIS_ONE = "osmosis-1";
// export const CHAIN_ID_OSMO_TEST_FIVE = "osmo-test-5";
export const CHAIN_ID_UNSUPPORTED = "unsupported";

// export const NETWORK_MAINNET = "mainnet";
export const NETWORK_TESTNET = "testnet";
export const NETWORK_LOCALNET = "localterra";

export type Chain = typeof CHAIN_TERRA | typeof CHAIN_NEUTRON;
// | typeof CHAIN_OSMOSIS;

export type Network =
  // | typeof NETWORK_MAINNET
  typeof NETWORK_TESTNET | typeof NETWORK_LOCALNET;

export type ChainID =
  // | typeof CHAIN_ID_PHOENIX_ONE
  | typeof CHAIN_ID_PISCO_ONE
  | typeof CHAIN_ID_LOCALTERRA
  // | typeof CHAIN_ID_NEUTRON_ONE
  | typeof CHAIN_ID_PION_ONE
  // | typeof CHAIN_ID_OSMO_TEST_FIVE
  | typeof CHAIN_ID_UNSUPPORTED;

export type ChainConfig = {
  distributionContractAddress: string;
  memberContractAddress: string;
  threadContractAddress: string;
};

export type ChainConstants = Partial<Record<ChainID, ChainConfig>>;
export type NetworkConstants = Partial<Record<Network, ChainConstants>>;

// TODO: read from .env
export const TERRA_TESTNET_CHAIN_CONFIG = {
  distributionContractAddress: "terra123",
  memberContractAddress: "terra123",
  threadContractAddress: "terra123",
};

// TODO: read from .env
export const TERRA_LOCALNET_CHAIN_CONFIG = {
  distributionContractAddress: "terra123",
  memberContractAddress: "terra123",
  threadContractAddress: "terra123",
};

export const NETWORK_CONSTANTS: NetworkConstants = {
  // [NETWORK_MAINNET]: {
  //   [CHAIN_ID_PHOENIX_ONE]: TERRA_MAINNET_CHAIN_CONFIG,
  //   [CHAIN_ID_NEUTRON_ONE]: NEUTRON_MAINNET_CHAIN_CONFIG,
  // },
  [NETWORK_TESTNET]: {
    [CHAIN_ID_PISCO_ONE]: TERRA_TESTNET_CHAIN_CONFIG,
    // [CHAIN_ID_OSMO_TEST_FIVE]: OSMOSIS_TESTNET_CHAIN_CONFIG,
  },
  [NETWORK_LOCALNET]: {
    [CHAIN_ID_LOCALTERRA]: TERRA_LOCALNET_CHAIN_CONFIG,
  },
};
