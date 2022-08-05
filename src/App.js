import './App.css';

function App() {
  /* global google */
  const client = google.accounts.oauth2.initTokenClient({
    client_id: '975954790200-nk5b3fbqnre9o87o2tmb3r76t0n2c4d9.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token;
      console.log(tokenResponse);
      console.log(access_token);
    },
  });

  const client2 = google.accounts.oauth2.initCodeClient({
    client_id: '975954790200-nk5b3fbqnre9o87o2tmb3r76t0n2c4d9.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
    uxmode: 'popup',
    redirect_uri: 'postmessage',
    callback: (response) => {
      console.log(response);
    },
  });

  let access_token;

  function handleSignin() {
    client.requestAccessToken();
  }

  function handleSignin2() {
    client2.requestCode();
  }

  function handleRevoke() {
    if (!access_token) {
      console.log('no auth token set');
      return;
    }
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
  }

  return (
    <div className="App">
      <button onClick={handleSignin}>Signin</button>
      <button onClick={handleRevoke}>Revoke</button>

      <button onClick={handleSignin2}>Signin2</button>

    </div>
  );
}

export default App;
