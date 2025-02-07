const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const { User } = require("../db");
const JWT_SECRET = "Manoj";
const { authMiddleware } = require("../middleware");

const signupBody = z.object({
  mailId: z.string().email(),
  username: z.string(),
  income: z.number(),
  password: z.string(),
  fixedExpense: z.number(),
  expectedSaving: z.number(),
  balance: z.number(),
});
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Enter Inputs in proper format.",
    });
  }
  const ExistingUser = await User.findOne({
    mailId: req.body.mailId,
  });
  if (ExistingUser) {
    return res.status(411).json({
      message: "Email already taken.",
    });
  }
  const user = await User.create({
    mailId: req.body.mailId,
    username: req.body.username,

    password: req.body.password,

    income: req.body.income,
    balance: req.body.balance,

    fixedExpense: req.body.fixedExpense,
    expectedSaving: req.body.expectedSaving,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User Signed Up successfully.",
    token: token,
  });
});

//Sign In route
const signinBody = z.object({
  mailId: z.string().email(),
  password: z.string(),
});

//signin post req
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs!!",
    });
  }

  const user = await User.findOne({
    mailId: req.body.mailId,
    password: req.body.password,
  });

  if (user) {
    // // Assuming you have access to the student's roll number and name
    // const rollNumber = user.rollnumber;
    // const name = user.username; // Or however you store the student's name

    // // Set cookies with the student's roll number and name
    // res.cookie("rollNumber", rollNumber, {
    //   httpOnly: true,
    //   secure: false, // Set to true if using HTTPS
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    // });

    // res.cookie("name", name, {
    //   httpOnly: true,
    //   secure: false, // Set to true if using HTTPS
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    // });

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

router.get("/getuser", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({
    _id: userId,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});
//student will put the assignment code and gets into assignment page

module.exports = router;
