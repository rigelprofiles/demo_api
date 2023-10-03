import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import knex from 'knex';

const app = express();

dotenv.config();

const knexConfig = {
  client: 'mysql2',
  connection: {
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'chatbot'
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

app.use(express.json());
app.use(cors());

app.get('/candidate/:candName', async (req, res) => {
  const name = req.params.candName;
  console.log(name);

  // Create a Knex.js instance
  const knexInstance = knex(knexConfig);

  // Query the database
  const candidateData = await knexInstance
    .select('personality')
    .from('candidates')
    .where({ candidate_name: name })
    .first();

  console.log(candidateData);

  // Destroy the Knex.js connection when done
  knexInstance.destroy();

  return res.json(candidateData);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
