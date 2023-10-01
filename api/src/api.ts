import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from "cors";
import * as express from "express";
import fetch from 'node-fetch';
import fs from 'fs';
import multer from 'multer';
import mysql from "mysql";
import nodemailer from 'nodemailer';
import path from 'path';
import url from 'url';
import Stripe from 'stripe';
import { error, log } from 'console';
import { check, body, validationResult } from 'express-validator';
const _api_settings = {
    environment: 'dev',
}
const LIVE_STRIPE_SECRET_KEY='';
const TEST_STRIPE_SECRET_KEY='';
const TEST_NEWS_API_KEY = '';
const TEST_OPEN_WEATHER_API_KEY = '';

const stripe = new Stripe(_api_settings.environment === 'dev' ? TEST_STRIPE_SECRET_KEY : LIVE_STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

const router = express.Router();
const app = express.default();
const port = 7778;

const storageGeneral = multer.diskStorage({
    destination: function (req: express.Request, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req: express.Request, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
});
const storageUserGarden = multer.diskStorage({
    destination: function (req: express.Request, file, cb) {
        cb(null, 'public/images/usergardens')
    },
    filename: function (req: express.Request, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
});

const uploadGeneral = multer({ storage: storageGeneral }).single('file');
const uploadUserGarden = multer({ storage: storageUserGarden }).single('file');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));
app.use(bodyParser.json({ limit: '25mb'}));
app.use("/", router);  // Enable router with express
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// })

interface IUserProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
};

main();
function main() {
    var connection = mysql.createConnection({
        host: "<ip_address>",
        database: "<db_name>", 
        user: "root", 
        password: "<password>",  // Add an environment variable for this
        debug: true,
        port: 3306 
    });
    
    connection.connect(function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Connected to database db_homeLife.");
        }
    });
    
    // Over 36+ API endpoints for CRUD operations are hidden below. Please reach out for viewing access!
}

const server = app.listen(port, () => {
    console.log(`Server is listing on port ${port}`);
  });
server.on('error', e => console.error("Error", e));