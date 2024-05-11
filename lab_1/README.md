# Project Setup

## From Scratch (wanna do it yourself?)
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
    - for example
    ```sh
    npx esrun src/keygen # yes, without '.ts' :)
    ```


# Documentation
#### 1. `src/keygen.ts`
> This script allows to generate a new pair of Public-Private keys.

```sh
cd lab_1
npm i
npx esrun src/keygen
```

- generates a new keypair
- prints keys to the console (private key is veiled for entertaining purposes tho)
- saves private key to the `.env` file (inside current working directory)

#### 2. `src/keyload`
> Extracts Keypair from the secret key that stored inside `.env` file

```sh
npx esrun src/keyload
```

