import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Web3 from "web3";

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(accounts);
    } catch (err) {
      setError(err.message);
    }
  };

  const sendTransaction = async () => {
    try {
      const web3 = new Web3();

      const fromAddress = accounts[0];
      const toAddress = "0x86CF57a8ABDc18049f21206a7cC0E5511BE6547A";
      const amount = Number(1).toString(16);
      const tokenAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

      const contract = new web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              {
                name: "_to",
                type: "address",
              },
              {
                name: "_value",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                name: "",
                type: "bool",
              },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        tokenAddress
      );

      const data = contract.methods.transfer(toAddress, amount).encodeABI();

      const params = [
        {
          from: fromAddress,
          to: tokenAddress,
          data: data,
        },
      ];

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <footer className="p-4">
          <button
            type="button"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full mb-2"
            onClick={connectWallet}
          >
            Connect wallet
          </button>
          <button
            type="button"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            onClick={sendTransaction}
          >
            Send Transaction
          </button>
          <ErrorMessage message={error} />
        </footer>
      </div>
    </form>
  );
}
