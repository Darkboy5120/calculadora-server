const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const port = process.env.PORT || 3001;
let response;

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
  if(Math.random() < 0.3)
    return res.status(404).send({
      message: "Error handling",
    });
  if (req.body.val1 && req.body.val2) {
    const result = operation(parseInt(req.body.val1), parseInt(req.body.val2));
    return res.json(createResponse(0, result, 'OK'));
  } else {
    return res.status(404).send({
      message: "Lack of two values",
    });
  }
}

app.post('/apis',(req, res) => {
  if (!req.body.api) {
    return res.status(404).send({
      message: "That api doesn\'t exists",
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
    default:
      return res.status(404).send({
        message: "That api doesn\'t exists",
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
