import { Router } from "express";
import Todo from "../models/Todo.js";

const router = Router();

router.get("/todos", async (req, res, next) => {
  try {
    res.json(await Todo.find({})).status(200);
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

router.post("/todos", async (req, res, next) => {
  if (req.body?.title.trim() !== "") {
    try {
      await Todo.create(req.body)
        .then((data) => res.json(data))
        .catch(next);

      res.status(201);
    } catch (e) {
      res.json(e).status(500);
    }
  } else {
    res
      .json({
        error: "Invalid data",
      })
      .status(422);
  }
});

router.put("/todos/:id", (req, res, next) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => res.json(data).status(200))
    .catch(next);
});

/*
 * update completed
 * */
router.patch("/todos/:id", (req, res, next) => {
  const { completed } = req.body;

  Todo.findOneAndUpdate({ _id: req.params.id }, { completed })
    .then((data) => res.json(data).status(200))
    .catch(next);
});

router.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data).status(200))
    .catch(next);
});

export default router;
