import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { ERC20TokenType, Link } from "@imtbl/imx-sdk";

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
      const toAddress = "0x86CF57a8ABDc18049f21206a7cC0E5511BE6547A";
      const amount = Number(1).toString(16);
      const tokenAddress = "0x4c04c39fb6d2b356ae8b06c47843576e32a1963e";

      let link = new Link("https://link.sandbox.x.immutable.com");

      await link.setup({});

      const transferResponsePayload = await link.transfer([
        {
          amount: amount,
          symbol: "GODS",
          type: ERC20TokenType.ERC20,
          tokenAddress: tokenAddress,
          toAddress: toAddress,
        },
      ]);
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
