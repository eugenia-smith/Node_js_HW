import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT || 3003;
if (!port) {
  throw new Error("PORT is not defined in environment variables");
}

app.use(express.json());

// GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hi, this is server on TS" });
});

// POST route with validation
app.post("/", (req: Request, res: Response) => {
  const { name }: { name?: string } = req.body;
  res.json({ name });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
