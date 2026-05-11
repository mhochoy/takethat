import mysql, {createConnection} from "mysql2/promise";

import express from "express";
import serverless from 'serverless-http';

const app = express();

export const con = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: "takethat"
});

app.get("/all", (req, res) => res.send([new Take("poop", "fart", "buttt", "smells")]));
module.exports.handler = serverless(app);