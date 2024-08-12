const ngrok = require("@ngrok/ngrok");
require('@dotenvx/dotenvx').config();

const host = "localhost";
const port = process.env.PORT || "3000";
const authToken = process.env.NGROK_AUTHTOKEN;

async function setup() {
  if (!authToken) {
    throw new Error("NGROK_AUTHTOKEN is not set");
  }
  const session = await new ngrok.SessionBuilder().authtoken(authToken).connect();
  const listener = await session.httpEndpoint().listen();
  console.log(`Forwarding to: ${host}:${port} from ingress at: ${listener.url()}`);
  listener.forward(`${host}:${port}`);
}

setup();