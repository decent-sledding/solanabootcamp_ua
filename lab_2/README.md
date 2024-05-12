# Lab 2


---
# Project Setup 
```sh
npm install
```

> Provide an `.env` file containing `SECRET_KEY` variable with your secret key as a value


# Run scripts
#### 1. `src/getbalance.ts`
> Connects to the Solana Devnet and acquires current balance for a given account

```sh
npx esrun src/keygen
```



#### 2. `src/soldrop.ts`
> Connects to the Solana Devnet and requests a tiny amount of SOL for a given account
> New balance will be printed to the console.

```sh
npx esrun src/soldrop
```



# Documentation
## Limitation
- The use of Airdrop API is limited to one request per day (24h) from a specific IP
- You can request only `1SOL` per account on Solana Devnet


# Bonus Task: accessing account through extension wallet

> Using [`Solflare`](https://solflare.com/) Solana Wallet browser extension

## Import wallet
### 1. Install `Solflare`
- <img alt="main page Solflare" width="500" src="../assets/img/lab_2/keyimport_1.png">

### 2. Open Wallets list
- <img alt="wallet list" width="500" src="../assets/img/lab_2/keyimport_2.png">

### 3. Press `+` button to add new wallet
- <img alt="add wallet" width="500" src="../assets/img/lab_2/keyimport_3.png">

### 4. Select a import method (`import private key`)
- <img alt="import method: private key" width="500" src="../assets/img/lab_2/keyimport_4.png">

### 5. Paste your private/secret key encoded in `Basse58` encoding
- <img alt="paste secret key" width="500" src="../assets/img/lab_2/keyimport_5.png">


## Change Network
> You need to select network which you used for Airdrop

### 1. Go to Settings
- <img alt="settings gear" width="500" src="../assets/img/lab_2/net_change_1.png">

### 2. Open General Settings
- <img alt="settings menu" width="500" src="../assets/img/lab_2/net_change_2.png">

### 3. Open Network Settings
- <img alt="general settings" width="500" src="../assets/img/lab_2/net_change_3.png">

### 4. Change the Network to one you used to Airdrop/send `SOL` to
- <img alt="select network" width="500" src="../assets/img/lab_2/net_change_4.png">



## Results
### 1. In CLI:
```sh
npx esrun src/getbalance
```
- <img alt="solana balance in CLI" width="500" src="../assets/img/lab_2/result_cli.png">

### 2. In web wallet:
- <img alt="solana balance in WEb" width="500" src="../assets/img/lab_2/result_web.png">
