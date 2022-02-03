import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // destroy the session
  // and the cookies related to it
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
