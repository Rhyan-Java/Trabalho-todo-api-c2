import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { title, projectId } = req.body;

  const userId = req.user.id;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    return res.status(404).json({
      error: "Projeto não encontrado",
    });
  }

  const task = await prisma.task.create({
    data: {
      title,
      projectId,
    },
  });

  res.status(201).json(task);
});

router.get("/project/:projectId", async (req, res) => {
  const projectId = Number(req.params.projectId);

  const userId = req.user.id;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    return res.status(404).json({
      error: "Projeto não encontrado",
    });
  }

  const tasks = await prisma.task.findMany({
    where: {
      projectId,
    },
  });

  res.json(tasks);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const { title, done } = req.body;

  const userId = req.user.id;

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
    },
  });

  if (!task || task.project.userId !== userId) {
    return res.status(404).json({
      error: "Tarefa não encontrada",
    });
  }

  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      done,
    },
  });

  res.json(updatedTask);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.user.id;

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
    },
  });

  if (!task || task.project.userId !== userId) {
    return res.status(404).json({
      error: "Tarefa não encontrada",
    });
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Tarefa deletada com sucesso",
  });
});

export default router;