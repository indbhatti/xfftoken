import React, { useState } from "react";
import { canisterId, createActor } from "declarations/token_backend";
import { AuthClient } from "@dfinity/auth-client";

function Faucet({ userPrincipal }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick() {
    try {
      setIsDisabled(true);
      const authClient = await AuthClient.create();
      if (!authClient.isAuthenticated()) {
        await authClient.login({
          identityProvider: "https://identity.ic0.app",
        });
      }
      const identity = await authClient.getIdentity();
      const authenticatedCanister = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });

      let result = await authenticatedCanister.payOut();
      setButtonText(result);
    } catch (error) {
      console.error("Error during payout:", error);
      setButtonText("Error occurred");
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <div className="bg-zinc-900 w-[600px] rounded-xl p-8 shadow-2xl shadow-indigo-800/30">
      <h1 className="text-2xl font-semibold">
        <span className="mr-4" role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h1>
      <h1 className="h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-2" />
      <p className="pb-4">
        Get your free XoFiFa tokens here! Claim 10,000 XFF coins to your
        account.
      </p>
      <p className="font-semibold pb-2">Claimer:</p>
      <p className="bg-zinc-800 rounded-xl p-4 mb-4">{userPrincipal}</p>
      <button
        className={`bg-indigo-800 rounded-xl p-4 text-center w-full ${
          isDisabled ? "cursor-not-allowed bg-gray-700" : ""
        }`}
        disabled={isDisabled}
        id="btn-payout"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Faucet;
