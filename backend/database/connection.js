import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "New_JOB_PORTAL_WITH_AUTOMATION"
    }).then(() => {
        console.log("Connected to the database");
    }).catch((err) => {
        console.log(`Error connecting to the database: ${err}`);
    });
}