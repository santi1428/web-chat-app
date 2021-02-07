const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('./routes/chat');

const whitelist = [`${process.env.HOST}`];
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors(corsOptions));

app.use('/api/users', require('./routes/api/user'));
app.use('/api/users', require('./routes/api/auth/auth'));
app.use('/api/messages', require('./routes/api/message'));


const PORT =  process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log("Server running in port " + PORT));

socket(server);

console.log(process.env.HOST);

// app.use(cors(corsOptions));