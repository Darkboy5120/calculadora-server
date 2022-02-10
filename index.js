const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(helmet());
const port = 3001;
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

const ifTwoValuesExist = (req, operation) => {
  if(Math.random() < 0.5)
    throw new Error("Fail");
  if (req.query.val1 && req.query.val2) {
    const result = operation(parseInt(req.query.val1), parseInt(req.query.val2));
    return createResponse(0, result, 'OK');
  } else {
    return createResponse(-2, null, 'Lack of two values');
  }
}

app.post('/apis', (req, res) => {
  switch (req.query.api) {
    case 'suma':
      response = ifTwoValuesExist(req, suma);
      break;
    case 'resta':
      response = ifTwoValuesExist(req, resta);
      break;
    case 'multiplicacion':
      response = ifTwoValuesExist(req, multiplicacion);
      break;
    case 'division':
      response = ifTwoValuesExist(req, division);
      break;
    default:
      response = createResponse(-1, null, 'That api does\'nt exits');
  }
  res.send(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
