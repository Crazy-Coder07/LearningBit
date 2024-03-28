"use strict";

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../../../../uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
});
  
const upload = multer({ storage: storage });

const PostDoubt = require("./PostDoubt/postDoubt");
const GetAllDoubt = require("./GetAllDoubt/getAllDoubt");
const GetDoubtById = require("./GetDoubtById/getDoubtById");
const LikeDoubt = require("./LikeDoubt/likeDoubt");
const DisLikeDoubt = require("./DisLikeDoubt/disLikeDoubt");
const TotalDoubtViewByDoubtId = require("./TotalDoubtViewByDoubtId/totalDoubtViewByDoubtId");
const ReplyDoubt = require("./ReplyDoubt/replyDoubt");
const GetAllReplyForDoubtId = require("./GetAllReplyForDoubtId/getAllReplyForDoubtId");



router.post("/create-doubt",upload.single("image"),PostDoubt);
router.get("/get-all-doubt",GetAllDoubt);
router.get("/get-doubt-by-id",GetDoubtById);
router.post("/like-doubt",LikeDoubt);
router.post("/dislike-doubt",DisLikeDoubt);
router.patch("/total-view-by-doubt-id",TotalDoubtViewByDoubtId);
router.post("/reply-doubt",ReplyDoubt);
router.get("/get-all-reply-for-doubtid",GetAllReplyForDoubtId);






module.exports = router;
