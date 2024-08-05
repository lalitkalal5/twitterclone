import express from 'express';
import tweet from '../models/tweet.model.js';
import users from "../models/users.js";

const router = express.Router();


router.post("/", async(req, res)=>{
const searchusers = req.query.search;
const regex = new RegExp(`^${searchusers}`, 'i');
const result = await users.find({ username: { $regex:regex}})
// const result2 = await users.find({ name: searchusers})

res.json({result});
}
);
export default router;
