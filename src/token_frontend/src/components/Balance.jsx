import React, { useState } from "react";
import { token_backend } from "declarations/token_backend";
import { Principal } from "@dfinity/principal";

function Balance() {
  const [principalId, setPrincipalId] = useState("");
  const [balance, setBalance] = useState("xyz");
  const [symbol, setSymbol] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleClick() {
    setIsDisabled(true);
    const principalToSend = Principal.fromText(principalId);
    const bal = await token_backend.balanceOf(principalToSend);
    const sym = await token_backend.getSymbol();
    setBalance(bal.toLocaleString());
    setSymbol(sym.toString());
    setIsDisabled(false);
  }

  return (
    <div className="bg-zinc-900 w-[600px] rounded-xl p-8 shadow-2xl shadow-indigo-800/30">
      <h1 className="text-2xl font-semibold">
        <span className="mr-4" role="img" aria-label="balance emoji">
          💰
        </span>
        Balance
      </h1>
      <h1 className="h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-2" />
      <p className="mb-2">Check account token balance:</p>

      <input
        id="balance-principal-id"
        className="w-full rounded-lg p-3 bg-zinc-800 mb-4"
        type="text"
        placeholder="Enter a Principal ID"
        value={principalId}
        onChange={(e) => setPrincipalId(e.target.value)}
      />

      <button
        className={`bg-indigo-800 rounded-xl p-4 text-center w-full mb-4
          ${isDisabled ? "cursor-not-allowed bg-gray-700" : ""}`}
        disabled={isDisabled}
        id="btn-request-balance"
        onClick={handleClick}
      >
        Check Balance
      </button>
      <p>
        This account has a balance of{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-transparent bg-clip-text text-transparent">
          {balance} {symbol}
        </span>
        .
      </p>
    </div>
  );
}

export default Balance;
