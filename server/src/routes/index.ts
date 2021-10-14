import { Request, Response, Router } from "express";
import { searchNewsController } from "./news/search.controller";

const router = Router();

router.get("/ping", (request: Request, response: Response) =>
  response.end("pong")
);
router.get("/search", searchNewsController);

export default router;
