const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {

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

app.get("/data", (req, res) => {

    console.log("GET /data");

    const file = "data.json";

    if (!fs.existsSync(file)) {
        return res.json([]);
    }

    const json = JSON.parse(fs.readFileSync(file, "utf8"));

    res.json(json);

});

app.listen(3000, () => {
    console.log("Server started");
});