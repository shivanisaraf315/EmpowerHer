const express = require("express");
const os = require("os");
const dns = require("dns");

const readDataFile = require("./read");

const app = express();
const PORT = 3000;

// 1) Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// 2) Read file route
app.get("/readfile", async (req, res) => {
  try {
    const content = await readDataFile();
    res.send(content);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
});

// 3) System details route
app.get("/systemdetails", (req, res) => {
  const platform = os.platform();

  const totalMemoryGB = (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB";
  const freeMemoryGB = (os.freemem() / (1024 ** 3)).toFixed(2) + " GB";

  const cpuInfo = os.cpus();
  const cpuModel = cpuInfo[0].model;

  // Bonus: CPU core count
  const cpuCores = cpuInfo.length;

  res.json({
    platform,
    totalMemory: totalMemoryGB,
    freeMemory: freeMemoryGB,
    cpuModel,
    cpuCores
  });
});

// 4) Get IP route
app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";

  // Bonus: Resolve both IPv4 and IPv6
  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: "DNS lookup failed" });
    }

    res.json({
      hostname,
      addresses
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
