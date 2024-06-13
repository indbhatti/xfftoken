import React, { useState } from "react";
import { token_backend } from "declarations/token_backend"
import { Principal } from "@dfinity/principal"

function Balance() {

  const [principalId, setPrincipalId] = useState('');
  const [balance, setBalance] = useState('xyz');
  const [symbol, setSymbol] = useState('')

  async function handleClick() {
    const principalToSend = Principal.fromText(principalId);
    const bal = await token_backend.balanceOf(principalToSend);
    const sym = await token_backend.getSymbol();
    setBalance(bal.toLocaleString());
    setSymbol(sym.toString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principalId}
          onChange={(e) => setPrincipalId(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
