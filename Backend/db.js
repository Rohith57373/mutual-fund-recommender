const mongoose = require("mongoose");
require("dotenv").config();

// Load environment variables
const mongoUrl =
  "mongodb://localhost:27017/levelup";

// Connect to MongoDB
mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("Connection error", err));

// Define Schemas
const UserSchema = new mongoose.Schema({
  mailId: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  fixedExpense: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  expectedSaving: {
    type: Number,
    required: true,
  },
});

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
  },

  targetAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const PrioritySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Friends: {
    exp: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
  Food: {
    exp: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
  Entertainment: {
    exp: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
  Grocery: {
    exp: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
  Others: {
    exp: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
});

// Create Models
const User = mongoose.model("User", UserSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
const Goal = mongoose.model("Goal", GoalSchema);
const Priority = mongoose.model("Priority", PrioritySchema);

// Export Models
module.exports = {
  User,
  Transaction,
  Goal,
  Priority,
};
