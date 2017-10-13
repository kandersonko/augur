/// <reference types="node" />

declare module "augur.js" {

  type AbiEncodedData = string;
  type Address = string;
  type Bytes32 = string;
  type Int256 = string;

  interface AugurJsOptions {
    debug: {
      [optionName: string]: boolean
    };
  }

  // TODO replace ApiParams and ApiFunction with specific param names/types where possible (use jsdoc comments)

  interface ApiParams {
    [paramName: string]: any;
  }

  type ApiCallback = (err?: Error|string|object|null, result?: any) => void;

  type ApiFunction = (p: ApiParams, callback?: ApiCallback) => any;

  type ApiChunkedFunction = (p: ApiParams, onChunkReceived?: (result?: any) => void, callback?: ApiCallback|null) => void;

  interface AutogeneratedContractApi {
    [contractName: string]: {
      [functionName: string]: ApiFunction
    };
  }

  interface FunctionAbi {
    constant: boolean;
    name: string;
    inputs: Array<string>;
    signature: Array<string>;
    returns?: string;
  }

  interface EventAbiInput {
    indexed: boolean;
    type: string;
    name: string;
  }

  interface FunctionsAbiMap {
    [contractName: string]: {
      [functionName: string]: FunctionAbi
    };
  }

  interface EventsAbiMap {
    [contractName: string]: {
      [eventName: string]: {
        contract?: string;
        inputs: Array<EventAbiInput>
      }
    };
  }

  interface AbiMap {
    functions: FunctionsAbiMap;
    events: EventsAbiMap;
  }

  interface ContractNameToAddressMap {
    [networkId: string]: {
      [contractName: string]: Address
    };
  }

  interface EventLog {
    address: Address;
    categories: Int256[];
    data: AbiEncodedData;
    blockNumber: Int256;
    transactionIndex: Int256;
    transactionHash: Bytes32;
    blockHash: Bytes32;
  }

  interface FormattedEventLog {
    address: Address;
    blockNumber: number;
    transactionIndex: Int256;
    transactionHash: Bytes32;
    blockHash: Bytes32;
    [inputName: string]: any;
  }

  type EventSubscriptionCallback = (eventLog: FormattedEventLog) => void;

  interface EventSubscriptionCallbacks {
    [contractName: string]: {
      [eventName: string]: EventSubscriptionCallback
    };
  }

  interface RpcInterface {
    createRpcInterface: () => RpcInterface;
    errors: any; // TODO define RPC errors object
    eth: {
      [jsonRpcMethodName: string]: (params?: any, callback?: (response: any) => void) => string|number|null;
    };
    clear: () => void;
    getBlockStream: () => any; // TODO import blockstream type from ethereumjs-blockstream
    getCoinbase: () => Address;
    getCurrentBlock: () => any; // TODO define block type
    getGasPrice: () => number;
    getNetworkID: () => string;
    getLogs: (filter: any, callback: (logs: Array<EventLog>) => void) => Array<string>|null; // TODO define log filter type
    getTransactionReceipt: (transactionHash: Bytes32, callback?: (transactionReceipt: any) => void) => any; // TODO define transaction receipt type
    isUnlocked: (account: Address, callback?: (isUnlocked: boolean) => void) => boolean|void;
    sendEther: (to: Address, value: string|number, from: Address, onSent: (result: any) => void, onSuccess: (result: any) => void, onFailed: (err: any) => void) => any;
    packageAndSubmitRawTransaction: (payload: any, address: Address, privateKeyOrSigner: Buffer|null, callback: (transactionHash: Bytes32|Error) => void) => void; // TODO define payload type
    callContractFunction: (payload: any, callback: (returnValue: Bytes32|Error) => void) => Bytes32|void;
    transact: (payload: any, privateKeyOrSigner: Buffer|null, onSent: (result: any) => void, onSuccess: (result: any) => void, onFailed: (err: any) => void) => void;
    excludeFromTransactionRelay: (method: string) => void;
    registerTransactionRelay: (relayer: any) => void; // TODO define relayer type
    setDebugOptions: (debugOptions: {[debugOptionName: string]: boolean}) => void;
  }

  class Augur {
    public version: string;
    public options: AugurJsOptions;
    public accounts: {
      getAccountTransferHistory: ApiFunction;
      importAccount: ApiFunction;
      login: ApiFunction;
      loginWithMasterKey: (p: ApiParams) => {
        address: Address;
        privateKey: Buffer;
        derivedKey: Buffer
      };
      logout: () => void;
      register: ApiFunction
    };
    public api: AutogeneratedContractApi;
    public generateContractApi: (functionsAbi: any) => AutogeneratedContractApi;
    public assets: {
      [functionName: string]: ApiFunction
    };
    public connect: (p: ApiParams, callback?: ApiCallback) => void;
    public constants: {
      [constantName: string]: any;
    };
    public contracts: {
      abi: AbiMap;
      addresses: ContractNameToAddressMap
    };
    public createMarket: {
      [functionName: string]: ApiFunction
    };
    public events: {
      getAllAugurLogs: ApiFunction;
      startListeners: (onLogAddedCallbacks?: EventSubscriptionCallbacks, onNewBlock?: (blockNumber: string) => void, onSetupComplete?: () => void) => void;
      stopListeners: () => boolean
    };
    public markets: {
      getMarketInfo: ApiFunction;
      getMarketsInfo: ApiFunction;
      batchGetMarketInfo: ApiFunction;
      getMarketPriceHistory: ApiFunction;
      getMarketsCreatedByUser: ApiFunction
    };
    public reporting: {
      getReportingHistory: ApiFunction;
      getCurrentPeriodProgress: (reportingPeriodDurationInSeconds: number, timestamp?: number|null) => number;
      submitReport: ApiFunction;
      finalizeMarket: ApiFunction;
      migrateLosingTokens: ApiFunction;
      redeem: ApiFunction
    };
    public rpc: RpcInterface;
    public trading: {
      claimMarketsProceeds: ApiFunction;
      simulateTrade: (p: ApiParams) => any; // TODO define trade simulation type
      calculateProfitLoss: (p: ApiParams) => any; // TODO define profit-and-loss type
      normalizePrice: (p: ApiParams) => string;
      denormalizePrice: (p: ApiParams) => string;
      tradeUntilAmountIsZero: ApiFunction;
      orderBook: {
        getOrderBook: ApiFunction;
        filterByPriceAndOutcomeAndUserSortByPrice: (orderBook: any, orderType: number, price: any, userAddress: Address) => any // TODO define order book type, import BigNumber type for price
      }
    };
  }

  export = Augur;

}
