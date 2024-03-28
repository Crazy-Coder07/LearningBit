"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  UpdateViewsByDoubtId
} = require("../../../../../Controllers/user/Auth/Doubt/TotalDoubtViewByDoubtId/totalDoubtViewByDoubtId");

router.use(
  IsDoubtIdExists,
  UpdateViewsByDoubtId
);

module.exports = router;
