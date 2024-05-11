import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

import * as dotenv from 'dotenv';
import path from 'path';

const mode = process.env.NODE_ENV || 'production';

// Load the appropriate .env file
const dotenvPath = path.resolve(process.cwd(), `.env${mode !== 'production' ? `.${mode}` : ''}`);
dotenv.config({ path: dotenvPath });

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "ethereum-goerli-starter",
  description:
    "This project can be use as a starting point for developing your new Ethereum Goerli SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for Ethereum Goerli this is 5
     * https://chainlist.org/chain/5
     */
    chainId: process.env.CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.ENDPOINT!?.split(',') as string[] | string,
  },
  dataSources: [{
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 1,
    options: {
      abi: 'Token',
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    },
    assets: new Map([['Token', {file: './abis/Token.json'}]]),
    mapping: {
      file: './dist/index.js',
      handlers: [
  {
    handler: "handleTransferTokenTx",
    kind: EthereumHandlerKind.Call,
    filter: {
      function: "transfer(address,uint256)"
    }
  },
  {
    handler: "handleTransferTokenLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Transfer(address,address,uint256)"
      ]
    }
  }
]
    }
  },],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
