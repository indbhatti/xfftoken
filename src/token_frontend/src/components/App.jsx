import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App({ userPrincipal }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Header />
      <Faucet userPrincipal={userPrincipal} />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
