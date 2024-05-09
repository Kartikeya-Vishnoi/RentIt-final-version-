import express from "express";
import {
  createTransaction,
  getUnavailableDates,
  getUserTransactions,
  getTransactionsonitemId
} from "../controllers/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/rentPage/:itemId", createTransaction);
transactionRouter.get("/rentPage/:itemId", getUnavailableDates);
transactionRouter.get("/:userId", getUserTransactions);
transactionRouter.get("/renterdetails/:itemId", getTransactionsonitemId);

export default transactionRouter;
