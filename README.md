# Solutions for Solana Ukrainian BOOTcamp from [`Kumeka Team`](https://kumeka.team/)


---
# Contents
## 1. [Lab 1](lab_1/)
> - Generating new Solana Account keys
> - Storing and loading keys to/from `.env` file
## 2. [Lab 2](lab_2/)
> - Obtaining balance for a given account
> - Grinding keys with given properties
> - Requesting Solana Airdrop
## 3. [Lab 3](lab_3/)
> - Sending Solana
> - Creating Memo Notes
## 4. [Lab 4](lab_4/)
> - Creating SPL Token Mints
> - Creating new Token Mint Associated Accounts
> - Sending Tokens between accounts



# Basic Info 
## Dependencies
1. `esrun`
    > esrun is a special NodeJS library that allows you to run TypeScript "programs" (scripts) on the fly

    > without the need to build and bundle the project

2. `@solana/web3.js`
    > This is the main TypeScript library that allows us to interact with the Solana blockchain.
    
    > Also provides essential cryptography uitls/tools (such as creation of key-pairs, etc..)

3. `@solana-developers/helpers`
    > This package contains additional utils that may or may not in the future be merged into `web3.js` package