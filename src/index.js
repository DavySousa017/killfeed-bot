require("dotenv").config();
const express = require("express");

const { startBot } = require("./discord/bot");
const { scrapper } = require("./scrapper/scrapper");
const { initCronJobs } = require("./api/resetDailyStats");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Web rodando com sucesso! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
  startBot();
  initCronJobs();
});

setInterval(async () => {
  scrapper();
}, 5000);
