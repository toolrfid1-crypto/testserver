const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/data.json", (req, res) => {
    res.sendFile(path.join(__dirname, "data.json"));
});

app.post("/submit", (req, res) => {

    console.log("ได้รับข้อมูล:", req.body);

    const file = "data.json";

    let json = [];

    if (fs.existsSync(file)) {
        json = JSON.parse(fs.readFileSync(file, "utf8"));
    }

    json.push(req.body);

    fs.writeFileSync(file, JSON.stringify(json, null, 2));

    res.json({
        message: "บันทึกสำเร็จ"
    });

});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});