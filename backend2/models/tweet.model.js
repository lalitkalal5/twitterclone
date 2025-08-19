import mongoose, {Schema} from "mongoose";

// const tweetSchema = new Schema({
//     content: {
//         type: String,
//         required: true
//     },
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }
// }, {timestamps: true})
const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model('tweet',tweetSchema);
