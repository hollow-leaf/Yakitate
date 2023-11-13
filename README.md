<div align="center">
<h1>Inazuma</h1>

<img src="https://raw.githubusercontent.com/hollow-leaf/yakitate/477b384468f2c5060638835838daa07b6e6c846c/apps/web3/public/logo.svg" width="50%" height="50%"></img>

[![Frontend deploy](https://github.com/hollow-leaf/yakitate/actions/workflows/ghpage.yml/badge.svg?branch=main)](https://github.com/hollow-leaf/yakitate/actions/workflows/ghpage.yml)

</div>

### Demo Page

- WebPage: [https://yakitate.pages.dev/](https://yakitate.pages.dev/)
- Video: [https://youtu.be/R0JVhL2DiUE?si=Pclr36mrNvYSxCHE](https://youtu.be/R0JVhL2DiUE?si=Pclr36mrNvYSxCHE)
- Inazuma Contract: [0x651Ccd3E07dEda23a573fdD6759b169F3840Fc35](https://goerli.etherscan.io/address/0x651Ccd3E07dEda23a573fdD6759b169F3840Fc35)

### Abstract

Yakitate,the decentralized food bank, using blockchain and smart contracts, connects food suppliers and users transparently. It ensures authentic tracking of production and fair resource allocation. The user-friendly app streamlines food donations and access. This project enhances efficiency, breaks distribution bottlenecks, and fosters community collaboration for a more equitable and sustainable food system.

### Introduction

The goal of our project is to realize a decentralized food bank platform provider. We use Algorand to store and retrieve the acquired food donations metadata, and provide food to receiver, who can obtain food and track food source.

Our solution has the following features and advantages:

- Provide a simple-to-operate platform to facilitate food distribution and inquiry
- Ability to track food sources
- Implement a public food bank map so that recipients can get donated food nearby
- Recipients can freely choose the type of food they want

### Method

- Use [Algorand](https://www.algorand.foundation/) to store food donations metadata
- Use [Perawallet](https://docs.perawallet.app/) to build web connect wallet button
- Use [Teal](https://developer.algorand.org/docs/get-details/dapps/avm/teal/) to create algorand smart contract
- Use Next.js to build web frontend

### Technical Architechure

Yakitate workflow
```mermaid
sequenceDiagram
		participant Food Provider
		participant Food Bank
		participant Receiver
		participant Algorand Contract

		Food Provider ->> Algorand Contract: Register provider in algorand blockchain
		Algorand Contract -->> Food Provider: Return  provider address,name,location
		Food Bank ->> Algorand Contract: Register provider in algorand blockchain
		Algorand Contract -->> Food Bank: Return  provider address,name,location
		Food Provider ->> Algorand Contract: Transfer food to Food Bank
		Algorand Contract -->> Food Bank: Receive food
		Receiver ->> Algorand Contract: Search food map, choose food provider or bank and verify food
		alt Receiver choose "Food Provider"
			Algorand Contract -->> Algorand Contract: Transfer food to Receiver and set freezer for Receiver.
		else Receiver choose "Food Bank"
		Algorand Contract -->> Algorand Contract: Transfer food to Receiver and set freezer for Receiver.
		end
		opt Finally 
		Algorand Contract -->> Receiver: Receive food and food source data
		end	

```

### Build & Installation

> Yakitate is a monorepo managed using turbo. You can find the source code for each package in the `apps/web3` and `apps/algorand` directory.

- `apps/web3` is the web frontend for Inazuma. It is built using [Next.js](https://nextjs.org/).
- `apps/algorand` is the algorand smart contract for Yakitate.It is built using [Teal](https://developer.algorand.org/docs/get-details/dapps/avm/teal/).


## Setting environment

## Deploy the contract
### Yakitate contract


### After deploying both of contract

## Setting Code

## Final

### Contributors

- Frontend + Algorand Contract: [SoloLin](https://github.com/LinXJ1204)
- CI/CD + Frontend: [JakeKuo](https://github.com/crypto0627)
