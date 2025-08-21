// import mongoose from "mongoose";


// const tweetSchema = new  mongoose.Schema({
//     content: {
//         type: String,
//         required: true
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }
// }, {timestamps: true})

// export default mongoose.model("tweet", tweetSchema);

import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema); // capitalized name is conventional
