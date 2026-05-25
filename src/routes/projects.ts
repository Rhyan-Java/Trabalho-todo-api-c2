import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  const userId = req.user.id;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      userId,
    },
  });

  res.status(201).json(project);
});

router.get("/", async (req, res) => {
  const userId = req.user.id;

  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.user.id;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!project) {
    return res.status(404).json({
      error: "Projeto não encontrado",
    });
  }

  res.json(project);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.user.id;

  const { title, description } = req.body;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!project) {
    return res.status(404).json({
      error: "Projeto não encontrado",
    });
  }

  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });

  res.json(updatedProject);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.user.id;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!project) {
    return res.status(404).json({
      error: "Projeto não encontrado",
    });
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Projeto deletado com sucesso",
  });
});

export default router;