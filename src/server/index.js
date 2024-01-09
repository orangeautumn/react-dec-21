const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 3400;

app.listen(port, () => console.log(`listing on ${port}`));

app.get("/load", async (req, res) => {
  const temp = [
    { id: 1, name: "Temp1" },
    { id: 2, name: "Temp2" },
  ];
  console.log("requst received ");
  const resp = { data: { temp } };

  res.status(200).send(resp);
});

app.get("/notifications", async (req, res) => {
  res.type("text/event-stream");

  const serverEventsData = { resp: "" };
  const interval = setInterval(() => {
    serverEventsData.resp = Math.random() * 100;
    res.write(`data: ${JSON.stringify(serverEventsData)}`);
    res.write("\n\n");
  }, 2000);

  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});
