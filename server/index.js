import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import mongoose from "mongoose";
import routes from './routes/api.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT || 5050;

/*app.use('/', (req, res) => {
  res.sendFile('client/build/index.html', {root: '.'})
})*/
app.use(cors())
app.use(bodyParser.json());
app.use('/api', routes);

const init = async () => {
  try {
    await mongoose.connect(process.env.DB)

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.error(e, 'Failure to connect to the database')
    process.exit()
  }
}

init()
