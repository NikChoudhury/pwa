const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const path = require('path');
const ejs = require('ejs');

// ###### Path ######
const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// ###### Set EJS Engine ######
app.set("view engine", "ejs");
app.set("views", viewsPath);
// ejs.registerPartials(partialsPath);

app.use(express.static(static_path));

app.get("/", (req, res) => {
    res.status(200).render('index');
})

server.listen(port, () => {
    console.log(`App is Running On http://localhost:${port}`);
});