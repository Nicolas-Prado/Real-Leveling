import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/real_leveling").then(() => console.log("Mongoose DB connected!")).catch(e => console.error(e))