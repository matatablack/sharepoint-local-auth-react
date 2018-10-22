class Auth {
  static getToken() {
    const KEY_NAME = "sharepointAuthToken";

    const savedToken = JSON.parse(localStorage.getItem(KEY_NAME));
    const isExpired = savedToken
      ? Boolean(Number(savedToken.expires_on) - Math.floor(new Date().getTime() / 1000) < 0)
      : true;

    if (!isExpired) {
      console.log("LocalStorage token is not expired");
      return savedToken.access_token;
    } else {
      return fetch("http://localhost:5000/auth")
        .then(res => res.json())
        .then(res => {
          console.log("New token created");
          localStorage.setItem(KEY_NAME, JSON.stringify(res));
          return res.access_token;
        });
    }
  }
}

export default Auth;
