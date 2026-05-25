import express from "express";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { authenticate } from "./middlewares/authenticate";
import projectsRoutes from "./routes/projects";
import tasksRoutes from "./routes/tasks";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!"
  });
});

app.use("/users", authenticate, usersRoutes);
app.use("/projects", authenticate, projectsRoutes);
app.use("/tasks", authenticate, tasksRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});