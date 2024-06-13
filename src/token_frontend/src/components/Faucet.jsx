import React, { useState } from "react";
import { canisterId, createActor } from "declarations/token_backend"
import { AuthClient } from "@dfinity/auth-client"

function Faucet({userPrincipal}) {

  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick() {
    setIsDisabled(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });


    let result = await authenticatedCanister.payOut();
    setButtonText(result);
    // setIsDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free XoFiFa tokens here! Claim 10,000 XFF coins to your account.</label>
      <p>{userPrincipal}</p>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
