import express from "express";
import upload from "../middleware/upload.js";

const uploadImage = express.Router();

uploadImage.post("/upload-multiple", upload.array("image",5), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    files: req.files,
  });
});


export default uploadImage;
