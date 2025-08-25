import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // কোন user ট্রানজেকশন করলো
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "MainWallet", required: true }, // কোন wallet এ হলো
    type: { 
      type: String, 
      enum: ["deposit", "withdraw", "transfer"], 
      required: true 
    }, // transaction type
    amount: { type: Number, required: true }, // কত টাকা
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      default: "pending" 
    },
    description: { type: String } // extra details
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
