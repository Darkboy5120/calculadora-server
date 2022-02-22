const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const mongoDb = "mongodb+srv://namoku:" + process.env.DB_PASSWORD + "@club-react.5reqp.mongodb.net/alumns?retryWrites=true&w=majority";

MongoClient.connect(mongoDb, (err, client) => {
  if (err) return console.error(err)
  console.log("Connected!")
  const db = client.db("club-react");
  app.post("/alumns", (req, res) => {
    const alumnsCollection = db.collection("alumns");
    if (!req.body.accountNumber) {
      return res.status(405).send({
        data: "Account number not provided",
      });
    }
    alumnsCollection.insertOne(req.body)
        .then(res.json(createResponse(204, result, 'OK')))
  })
});

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const port = process.env.PORT || 3001;

const createResponse = (code, data, log) => {
  return {code, data, log};
};

const suma = (val1, val2) => {
  return val1 + val2;
};

const resta = (val1, val2) => {
  return val1 - val2;
};

const multiplicacion = (val1, val2) => {
  return val1 * val2;
};

const division = (val1, val2) => {
  return val1 / val2;
};

const ifTwoValuesExist = (req, operation, res) => {
  if(Math.random() < 0.2)
    throw res;
  if (req.body.val1 && req.body.val2) {
    const result = operation(parseInt(req.body.val1), parseInt(req.body.val2));
    return res.json(createResponse(204, result, 'OK'));
  } else {
    return res.status(404).send({
      data: "Lack of two values",
    });
  }
}

const getRandomColor = (res) => {
  const result = "#" + Math.floor(Math.random()*16777215).toString(16);
  return res.json(createResponse(204, result, 'OK'));
}

app.post('/apis',(req, res) => {
  if (!req.body.api) {
    return res.status(404).send({
      data: "That api doesn\'t exists",
    });
  }
  switch (req.body.api) {
    case 'suma':
      response = ifTwoValuesExist(req, suma, res);
      break;
    case 'resta':
      response = ifTwoValuesExist(req, resta, res);
      break;
    case 'multiplicacion':
      response = ifTwoValuesExist(req, multiplicacion, res);
      break;
    case 'division':
      response = ifTwoValuesExist(req, division, res);
      break;
    case 'color':
      response = getRandomColor(res);
      break;
    default:
      return res.status(404).send({
        message: "That api doesn\'t exists",
      });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
