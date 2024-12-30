import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/token_backend";

function Transfer() {
  const [amount, setAmount] = useState(0);
  const [transferId, setTransferId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [text, setText] = useState("Transfer");

  async function handleClick() {
    setIsDisabled(true);
    let toPrincipal = Principal.fromText(transferId);
    console.log(toPrincipal, amount);
    let amountToTransfer = Number(amount);
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(
      toPrincipal,
      amountToTransfer
    );
    setText(result);
    setIsDisabled(false);
  }

  return (
    <div className="bg-zinc-900 w-[600px] rounded-xl p-8 shadow-2xl shadow-indigo-800/30 mb-8">
      <h1 className="text-2xl font-semibold">
        <span className="mr-4" role="img" aria-label="transfer emoji">
          💸
        </span>
        Transfer
      </h1>

      <h1 className="h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-2" />

      <div className="">
        <fieldset>
          <legend className="mb-2">To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                className="w-full rounded-lg p-3 bg-zinc-800 mb-4"
                placeholder="Enter a Principal ID"
                id="transfer-to-id"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend className="mb-2">Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                className="w-full rounded-lg p-3 bg-zinc-800 mb-4"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <button
          className={`bg-indigo-800 rounded-xl p-4 text-center w-full 
            ${isDisabled ? "cursor-not-allowed bg-gray-700" : ""}`}
          id="btn-transfer"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default Transfer;
