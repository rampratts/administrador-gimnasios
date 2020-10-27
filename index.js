require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
  
app.use('/api/users', require('./routes/users'));

app.use('/api/clases', require('./routes/clases'));

app.use('/api/pagos', require('./routes/pagos'));

app.use('/api/rutinas', require('./routes/rutinas'));

app.use('/api/planAlimentacion', require('./routes/planAlimentacion'));

app.use('/api/progresos', require('./routes/progresos'));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => console.log('Server started 🚀'));