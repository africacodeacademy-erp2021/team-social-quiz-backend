
const express = require('express');
const router = express();
const Quiz_input = require("../controllers/Quiz_input");
const Quiz_Validation = require("../middleware/Quiz_Validation");

router.get("/", Quiz_input.index);
router.post("/Quiz", validation.Quiz, Quiz_input.Quiz)