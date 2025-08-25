import MainWallet from "../models/MainWallet.js";

export const addMoneyToWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;

   
    let wallet = await MainWallet.findOne({ user: userId });

    
    if (!wallet) {
      wallet = new MainWallet({ user: userId, balance: 0 });
    }

    
    wallet.balance += amount;

    // Future এ Transaction এর reference push করা যাবে
    // wallet.history.push(transactionId);

    await wallet.save();

    res.status(200).json({ message: "Money added successfully", wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
