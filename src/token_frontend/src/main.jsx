import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { AuthClient } from '@dfinity/auth-client';

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient)
      }
    })
  }
}

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity()
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App userPrincipal={userPrincipal}/>
    </React.StrictMode>,
  );
}
init();
