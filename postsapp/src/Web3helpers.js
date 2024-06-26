import Web3 from "web3";

import Auth from "./build/contracts/Auth.json";

export const loadWeb3 = async () => {
if (window.ethereum) {
	window.web3 = new Web3(window.ethereum);
	await window.ethereum.enable();
} else if (window.web3) {
	window.web3 = new Web3(window.web3.currentProvider);
} else {
	window.alert(
	"Non-Ethereum browser detected. You should consider trying MetaMask!"
	);
}
};

export const loadBlockchainData = async () => {
	const web3 = window.web3; // Load account
	const accounts = await web3.eth.getAccounts();
	console.log(accounts); // Network ID
	const networkId = await web3.eth.net.getId();
	console.log(networkId); // Network data
	
	if (networkId) {
	  const auth = new web3.eth.Contract(
		Auth.abi,
		Auth.networks[networkId].address
	  );
	  console.log(auth, "auth");
	  // Get Ether balance
	  const balance = await web3.eth.getBalance(accounts[0]);
	  const amount = web3.utils.fromWei(balance, 'ether') + ' ETH';
	  console.log(amount);
	  return { auth, accounts: accounts[0], amount };
	} else {
	  throw new Error("Network ID not available.");
	}
  };
