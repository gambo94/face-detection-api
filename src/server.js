const express = require('express');
const routes = require('./routes/router');
const app = express();

const cors = require('cors');

// Settings
let port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());


app.use(routes);

app.listen(port, () => console.log('Server running on port '+ port))   