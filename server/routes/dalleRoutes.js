import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello");
});

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const aiResponse = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const image = aiResponse.data.data[0].b64_json
//     res.status(200).json({photo:image})
//   } catch (error) {
//     res.status(500).send(error?.response.data.error.message)
//   }
// });
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    // Log the full error to help debug
    console.error(
      "Error from OpenAI API:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      res.status(500).send(error.response.data.error.message);
    } else {
      res.status(500).send("An unexpected error occurred.");
    }
  }
});

export default router;
