const fs = require('fs');
const process = require('process');
const axios = require('axios');

const filePath = process.argv[2];

// Validate CLI argument
if (!filePath) {
  console.error("Usage: node urls.js FILENAME");
  process.exit(1);
}

// Process file
function readFile(filePath) {
  fs.readFile(filePath, 'utf8', async function (err, data) {
    if (err) {
      console.error(`Error reading ${filePath}: ${err.message}`);
      process.exit(1);
    }

    const urls = data.split('\n').filter(line => line.trim() !== "");

    // 🚀 BONUS: Download all at once
    await Promise.all(urls.map(url => fetchAndSave(url.trim())));
  });
}

async function fetchAndSave(url) {
  try {
    const res = await axios.get(url);

    let hostname;
    try {
      hostname = new URL(url).hostname;
    } catch {
      console.error(`Invalid URL format: ${url}`);
      return;
    }

    fs.writeFile(hostname, res.data, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write to ${hostname}: ${err.message}`);
      } else {
        console.log(`Wrote to ${hostname}`);
      }
    });
  } catch (err) {
    console.error(`Couldn't download ${url}`);
  }
}

readFile(filePath);
