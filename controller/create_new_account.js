var StellarSdk = require('stellar-sdk');
var fetch = require('node-fetch');

const pair = StellarSdk.Keypair.random();
//pair.secret();
//pair.publicKey();

const mainFunction = async () => {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
      );
      const responseJSON = await response.json();
      //console.log("SUCCESS! You have a new account :)\n", responseJSON);
      responseJSON.publicKey = pair.publicKey();
      responseJSON.secret = pair.secret();
      return responseJSON;
    } catch (e) {
      console.error("ERROR!", e);
      return "Internal Server Error";
    }
  }

  module.exports = mainFunction;