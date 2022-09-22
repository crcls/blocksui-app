<p align="center">
  <a href="https://blocksui.xyz/">
    <img alt="Blocks UI Protocol" src="assets/blocksui.png" width="320" />
  </a>
</p>

<h1 align="center">
  Blocks UI Protocol: Decentralized UI Software as an NFT
</h1>

<p align="center">
  🌎 💽 🤑
</p>

<p align="center">
  <strong>
    Decentralized. UI Software. As NFTs.
  </strong>
</p>

<p align="center">
  Providing an open and decentralized framework for building user interface software that is simple enough for anyone to use.
</p>

<p align="center">
  <a href="https://filecoin.io/" style="display: inline-block">
    <img src="assets/filecoin.svg" alt="Filecoin logo" width="40">
  </a>
  <a href="https://ipfs.tech/" style="display: inline-block">
    <img src="assets/ipfs.svg" alt="IPFS logo" width="120">
  </a>
  <a href="https://litprotocol.com/" style="display: inline-block">
    <img src="assets/lit-protocol.svg" alt="Lit Protocol logo" width="54">
  </a>
  <a href="https://moralis.io/" style="display: inline-block">
    <img src="assets/moralis.svg" alt="Moralis logo" width="154">
  </a>
  <a href="https://polygon.technology/" style="display: inline-block">
    <img src="assets/polygon.svg" alt="Polygon logo" width="166">
  </a>
  <a href="https://web3.storage/" style="display: inline-block">
    <img src="assets/web3-storage.svg" alt="Web3 Storage logo" width="40">
  </a>
</p>

This project is the entry to the [Moralis](https://moralis.io/) x [Filecoin](https://filecoin.io/) hackathon from the [CRCLS](https://github.com/crcls) team. It consists of five repositories:

- [Blocks UI App](https://github.com/crcls/blocksui-app)
- [Blocks UI Blocks](https://github.com/crcls/blocksui-blocks)
- [Blocks UI Contracts](https://github.com/crcls/blocksui-contract)
- [Blocks UI Network](https://github.com/crcls/blocksui-network)
- [Blocks UI SDK](https://github.com/crcls/blocksui-sdk)

## Table of Contents

- [Features](#-features)
- [Heading](#-heading)
- [Heading](#-heading)
- [Heading](#-heading)
- [Heading](#-heading)
- [Heading](#-heading)
- [Contributing](#-contributing)
  - [Types](#types)
  - [Branches](#branches)
  - [Commits](#commits)
  - [Pull Requests](#pull-requests)
  - [Merging Into Main](#merging-into-main)
- [License](#-license)
- [Thanks](#-thanks)

# Moralis + Filecoin 1-2-Web3 Hackathon.

## blocksui-contracts

1. [hardhat.config.ts L19-L21](https://github.com/crcls/blocksui-contracts/blob/main/hardhat.config.ts#L19-L21) - Used Web3.Storage to upload the contract configs for the app to use.

## blocksui-network

1. [node/ipfs/ipfs.go L86-L152](https://github.com/crcls/blocksui-network/blob/main/node/ipfs/ipfs.go#L86-L152) - Used Web3.Storage for getting the Block Primitive files to server to the app
2. [node/docker/aws.Dockerfile L11-L12](https://github.com/crcls/blocksui-network/blob/main/node/docker/aws.Dockerfile#L11-L12) - Install a local IPFS node in the Server Node container
3. [node/modd.prod.conf L2](https://github.com/crcls/blocksui-network/blob/main/node/modd.prod.conf#L2) - Run the ipfs daemon in the docker container
4. [node/ipfs/ipfs.go L20-L84](https://github.com/crcls/blocksui-network/blob/main/node/ipfs/ipfs.go#L20-L84) - Connect to the local IPFS node and optionally start a new daemon if there isn’t one.
5. [node/server/server.go L109](https://github.com/crcls/blocksui-network/blob/main/node/server/server.go#L109) - Upload the Block config to IPFS (Needed CID v0)
6. [node/server/server.go L29-L66](https://github.com/crcls/blocksui-network/blob/main/node/server/server.go#L29-L66) - Fetch the Primitives from routes /primitives/:name
7. [node/contracts/contracts.go L58](https://github.com/crcls/blocksui-network/blob/main/node/contracts/contract.go#L58) - Fetch contract configs from Web3.Storage

## blocksui-app

#### Moralis:

1. [pages/publish.tsx L244-L263](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L244-L263) - useApiContract to get the publish price from the BUIBlocksNFT contract
2. [pages/publish.tsx L273](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L273) - useMoralis to get the web3 object.
3. [pages/publish.tsx L475-L480](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L475-L480) - get signer from the Moralis Web3 object
4. [pages/my-blocks.tsx L61-L89](https://github.com/crcls/blocksui-app/blob/main/pages/my-blocks.tsx#L61-L89) - Fetch the Blocks for the signed in account using the Moralis API
5. [pages/marketplace.tsx L74-L128](https://github.com/crcls/blocksui-app/blob/main/pages/marketplace.tsx#L74-L128) - useWeb3Contract - Fetch the Block Listings from the BUIMarketplace contract
6. [components/MetaMaskButton.tsx L8-L19](https://github.com/crcls/blocksui-app/blob/main/components/LoginModal/MetaMaskButton.tsx#L8-L19) - useMoralis (authenticate)

#### Filecoin:

1. [providers/IPFSProvider.ts L13](https://github.com/crcls/blocksui-app/blob/main/providers/IPFSProvider.tsx#L13) - Initialize the Web3Storage client
2. [hooks/use-ipfs.ts L18-L67](https://github.com/crcls/blocksui-app/blob/main/hooks/use-ipfs.ts#L18-L67) - Get and Add files from Web3.Storage and IPFS (through our server node)
3. [pages/publish.tsx L327](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L327) - Upload Block file to IPFS (returning a CID v0)
4. [pages/publish.tsx L392](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L392) - Upload Block Marketing image to Web3.Storage
5. [pages/publish.tsx L421](https://github.com/crcls/blocksui-app/blob/main/pages/publish.tsx#L421) - Upload Block metadata to Web3.Storage
6. [.github/workflows/main.yml L43](https://github.com/crcls/blocksui-app/blob/main/.github/workflows/main.yml#L43) - Deploy the app with Fleek

## blocksui-blocks

1. [scripts/upload.mjs](https://github.com/crcls/blocksui-blocks/blob/main/scripts/upload.mjs) - Used in the GitHub actions deploy CI to upload the compiled Block Primitives to Web3.Storage

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

Lorem ipsum.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

- **Some Feature.** Some description.

[<img src="assets/screenshot-1.png" alt="Blocks UI app">](https://blocksui.xyz/)

[<img src="assets/screenshot-2.png" alt="Blocks UI app">](https://blocksui.xyz/)

[**Open the Blocks UI app**](https://blocksui.xyz/)

## ✨ Features

- [Feature]()—as xyz.
- [Feature]()—for xyz.
- [Feature]()—as xyz.
- [Feature]()—for xyz.
- [Feature]()—as xyz.

## Heading

Lorem ipsum.

## Heading

Lorem ipsum.

## Heading

Lorem ipsum.

## Heading

Lorem ipsum.

## Heading

Lorem ipsum.

## 🤝 Contributing

Code changes can fall into the types from the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Types

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- **build**—changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).

- **chore**—other changes that don’t modify src or test files.

- **ci**—changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).

- **docs**—documentation only changes.

- **feat**—a new feature.

- **fix**—a bug fix.

- **perf**—a code change that improves performance.

- **refactor**—a code change that neither fixes a bug nor adds a feature.

- **revert**—reverts a previous commit.

- **style**—changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).

- **test**—adding missing tests or correcting existing tests.

### Branches

Branches are created from `main` and can follow the naming convention below. For common types, see [Types](#types).

Convention:

```shell
type/description
```

Example:

```shell
feat/add-xyz
```

### Commits

Conventional Commits are enforced using [commitlint](https://commitlint.js.org/) in a [husky](https://github.com/typicode/husky) pre-commit hook.

Convention:

```shell
type(scope?): description  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Example:

```shell
feat: add xyz
```

### Pull Requests

1.  **Title**

    Titles can follow the naming convention below and match the branch name. For common types, see [Types](#types).

    Convention:

    ```shell
    type: description
    ```

    Example:

    ```shell
    feat: add xyz
    ```

2.  **Body**

    When creating a new pull request, you will automatically see a template with a checklist in the body.

3.  **Reviewers**

    Add at least one reviewer.

4.  **Labels**

    Apply related labels.

### Merging Into Main

Always “Squash & merge” your commits into `main`.

## 🧐 License

Licensed under the [MIT License](./LICENSE).

## 💜 Thanks

Thanks go out to all of the many sponsors, [Filecoin](https://filecoin.io/), and [Moralis](https://moralis.io/).
