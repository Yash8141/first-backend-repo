// Keep-alive script to prevent Render free tier from sleeping
// Run this script locally to keep your app awake

const https = require("https");
const http = require("http");

// Replace with your Render app URL
const APP_URL = "https://chaibackend-lfh0.onrender.com/"; // Replace with your actual URL

function pingApp() {
  const url = new URL(APP_URL);
  const client = url.protocol === "https:" ? https : http;

  const req = client.get(url, (res) => {
    console.log(
      `✅ Ping successful - Status: ${
        res.statusCode
      } - ${new Date().toISOString()}`
    );
  });

  req.on("error", (err) => {
    console.log(
      `❌ Ping failed - ${err.message} - ${new Date().toISOString()}`
    );
  });

  req.setTimeout(10000, () => {
    console.log(`⏰ Ping timeout - ${new Date().toISOString()}`);
    req.destroy();
  });
}

// Ping every 14 minutes (Render free tier sleeps after 15 minutes of inactivity)
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

console.log(`🚀 Starting keep-alive script for ${APP_URL}`);
console.log(`⏰ Will ping every ${PING_INTERVAL / 60000} minutes`);

// Initial ping
pingApp();

// Set up periodic pinging
setInterval(pingApp, PING_INTERVAL);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Keep-alive script stopped");
  process.exit(0);
});
