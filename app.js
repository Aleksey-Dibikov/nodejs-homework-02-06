import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { ERROR, HttpCode } from './libs/constants';
import contactsRouter from './routes/api/contacts/router-contacts';
import authRouter from './routes/api/auth/routes-auth';

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json(ERROR)
})

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message
  })
})

export default app;
