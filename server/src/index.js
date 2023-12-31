import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

// Private route authorization config
import privateRouteConfig from "./config/route.config";
import googleAuthConfig from "./config/google.config";

// Database connection
import ConnectDB from "./database/connection";

import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

dotenv.config();

privateRouteConfig(passport);
googleAuthConfig(passport);
mongoose.set('strictQuery', false);
const zomato = express();

// adding additional passport configuration

zomato.use(cors({ origin: "http://localhost:5173" }));
zomato.use(helmet());
zomato.use(express.json());
zomato.use(session({
    secret: "FoodLover",
    resave: true,
    saveUninitialized: true
}));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});

// /auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/image", Image);

const PORT = 4000;

zomato.listen(PORT, () => {
    ConnectDB()
        .then(() => {
            console.log("Server is running !!!");
        })
        .catch((error) => {
            console.log("Server is running, but database connection failed...");
            // console.log(error);
        });
});
