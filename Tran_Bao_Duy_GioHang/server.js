const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout", (req, res) => {
    console.log("Received purchase:", req.body);
    res.json({ message: "Purchase successful!" });
});

app.get("/", (req, res) => {
    res.send("Backend running");
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
