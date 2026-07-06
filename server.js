const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const file = "employ.json";

app.get("/employees", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));
    res.json(data);
});

app.post("/employees", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));

    const employee = {
        id: Date.now(),
        name: req.body.name,
        department: req.body.department
    };

    data.push(employee);

    fs.writeFileSync(file, JSON.stringify(data, null, 4));

    res.json({
        success: true
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server started");
    console.log("เครื่องนี้เข้าที่:  http://localhost:3000");
    console.log("คนอื่นเข้าที่:   http://172.20.168.109:3000");
});