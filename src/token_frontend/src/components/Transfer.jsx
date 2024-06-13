import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client"
import { canisterId, createActor } from "declarations/token_backend"

function Transfer() {

  const [amount, setAmount] = useState(0);
  const [transferId, setTransferId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [text, setText] = useState("Transfer")

  async function handleClick() {
    setIsDisabled(true);
    let toPrincipal = Principal.fromText(transferId);
    console.log(toPrincipal, amount);
    let amountToTransfer = Number(amount)
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(toPrincipal, amountToTransfer);
    setText(result);
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            {text}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
