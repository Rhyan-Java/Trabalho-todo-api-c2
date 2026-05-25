import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authorize } from "../middlewares/authorize";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }

  res.json(user);
});

router.post("/", async (req, res) => {
  const validation = createUserSchema.safeParse(
  req.body
);

if (!validation.success) {
  return res.status(400).json({
    errors: validation.error.flatten().fieldErrors,
  });
}

  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json(user);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }

  router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Usuário deletado com sucesso",
  });
});

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
    },
  });

  res.json(updatedUser);
});

router.delete(
  "/:id",
  authorize("ADMIN"),
  async (req, res) => {
    const id = Number(req.params.id);

    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Usuário deletado com sucesso",
    });
  }
);

export default router;