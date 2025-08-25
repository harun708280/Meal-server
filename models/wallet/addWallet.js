import mongoose from "mongoose";

const mainWalletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    balance: { type: Number, default: 0 },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }]
  },
  { timestamps: true }
);

export default mongoose.model("MainWallet", mainWalletSchema);
