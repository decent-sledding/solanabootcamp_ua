# Project Setup

## From Scratch
1. Create new directory
    ```sh
    mkdir
    ```
2. Initialize a new git repository inside that directory
    ```sh
    cd lab1
    git init .
    ```
2. Initialize a new NodeJS package
    ```sh
    npm init -y
    ```
3. Install dependencies
    ```sh
    npm install @solana/web3.js @solana-developers/helpers esrun
    ```

## From this repository
1. Setup the project
    ```sh
    git clone <repo_url> <directory_name>
    cd <directory_name>
    npm install
    ```
2. Run with a desire:
    ```sh
    npx esrun <script_name> # without '.ts' extension
    ```


# Documentation
1. `script`



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