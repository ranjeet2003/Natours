const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from express',
    app: 'Natours',
  });
});

app.post('/', (req, res) => {
  res.send('You are making a post request!...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is hosting on port ${port}...👍`);
});
