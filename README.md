# Tutorial to setup and run my simple blockchain chat app

#### 1. Setting up development enviroment
First you will need `ganache`, an etherium emulator that provided simple APIs for all developers to start develop in Etherium enviroment. Gonna use the beta version for this project, feel free to replace `beta` by `latest` version if you want to use the stable one.
```
npm install ganache@beta --global
```

After that, you need something help you on run tests, complie and deploy your contract to your local etherium network. I gonna use Truffle on this tutorial, another reference is Hardhat, feel free to migrate to it yourself.

```
npm install truffle -g
```

You can start ganache by start a new terminal tab, then enter following command, it will keep running on there:
```
ganache-cli
```

#### 2. Complie and deploy this project contract to your local development network

Clone this project by simply enter:
```
git clone https://github.com/GarfDev/simple-chat-app-blockchain-based.git
```

Enter inside project, install dependencies by run `yarn` command. Inside `contracts` folder, you will see my main contract. Complie it by run:

```
truffle complie
```

A new folder called `build` created, inside that you will see complied [ABI file](https://docs.soliditylang.org/en/v0.5.3/abi-spec.html) in JSON format. Now you want to deploy this complied contract to your local development network. It already setted up inside `truffle-config.js`. But lemme walk though it a bit:

```
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
}
```

This part of config tell truffle that in development mode, you want to deploy to your local etherium network (which created and running by ganache-cli above) at port 8545

```
  compilers: {
    solc: {
      version: "0.7.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
```

Unlike other programming language, we always want our contract to be complied at the exact solc version we used while development, mine is at `0.7.4`. Now you can deploy your contract  by run following command:
```
truffle deploy
```

Result should be like this
```
Starting migrations...
======================
> Network name:    'development'
> Network id:      1638099019664
> Block gas limit: 12000000 (0xb71b00)


1_initial_migration.js
======================

   Deploying 'ChatApp'
   -------------------
   > transaction hash:    0xfbe9c63f157662222f59e3c81e94feba0e7fa62abb1b25fe935142157b2d0094
   > Blocks: 0            Seconds: 0
   > contract address:    0xc2ec4C4528922d7fe1c285DcE83aE1aD9746D3a6
   > block number:        1
   > block timestamp:     1638099802
   > account:             0xB4AC0Ff029A6834C21428441DFf0d7777F1A8DD1
   > balance:             999.997666778125
   > gas used:            691325 (0xa8c7d)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.002333221875 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:      0.002333221875 ETH


Summary
=======
> Total deployments:   1
> Final cost:          0.002333221875 ETH
```

Now feel free to copy `contract address` field and replace current contractAddress var inside `application/app.tsx` file. Then run `yarn start` to start the web server. Access it, make sure your browser have Metamask installed, switch network to your `localhost:8545` and import an default account from ganache-cli by using private key. 
