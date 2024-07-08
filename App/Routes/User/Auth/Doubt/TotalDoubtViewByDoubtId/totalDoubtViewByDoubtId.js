"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  UpdateViewsByDoubtId,
  TotalViews
} = require("../../../../../Controllers/user/Auth/Doubt/TotalDoubtViewByDoubtId/totalDoubtViewByDoubtId");

router.use(
  IsDoubtIdExists,
  UpdateViewsByDoubtId,
  TotalViews
);

module.exports = router;
