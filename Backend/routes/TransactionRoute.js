const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const { Transaction, User } = require("../db");
const { authMiddleware } = require("../middleware");

const JWT_SECRET = "Manoj";

router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { amount, category, to } = req.body;

    // Find the user and check balance
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create a new transaction
    const newTransaction = await Transaction.create({
      userId: req.userId,
      date: new Date(),
      amount,
      category,
      to,
    });

    // Deduct amount from user's balance
    user.balance -= amount;

    // Save the updated user balance
    await user.save();

    res.status(200).json({
      message: "Transaction successful",
      balance: user.balance,
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error performing transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/deposit", authMiddleware, async (req, res) => {
  try {
    const { depositAmount } = req.body;

    // Ensure depositAmount is provided
    if (!depositAmount) {
      return res.status(400).json({ message: "Deposit amount is required" });
    }

    // Find the user and update their balance
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += depositAmount;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error Transaction", error);
    res.status(500).json({
      message: "Error occurred",
    });
  }
});

//signin post req
router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    mailId: req.body.mailId,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in!",
  });
});

router.get("/getTransaction", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    });
    if (transactions.length === 0) {
      throw new Error("No Transactions Found");
    }
    res.json({
      transactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
