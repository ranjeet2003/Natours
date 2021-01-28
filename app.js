const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from express server');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is hosting on port ${port}...👍`);
});
