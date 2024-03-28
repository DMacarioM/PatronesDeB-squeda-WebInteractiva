import express from 'express'
import morgan from 'morgan'

// server/index.js
//const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan('dev'))

export default app;