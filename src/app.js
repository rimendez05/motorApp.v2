const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//routes
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/users.route');
const repairRouter = require('./routes/repair.route');

const app = express();
const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v2', limiter);

//rutas
app.use('/api/v2/auth', authRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
});

app.use(globalErrorHandler);


module.exports = app;