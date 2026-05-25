import { Router } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserSchema,
  loginSchema,
} from "../schemas/user.schema";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      error: "Email já cadastrado",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

router.post("/login", async (req, res) => {
  const validation = loginSchema.safeParse(
  req.body
);

if (!validation.success) {
  return res.status(400).json({
    errors: validation.error.flatten().fieldErrors,
  });
}
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "Email ou senha inválidos",
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      error: "Email ou senha inválidos",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.json({
    token,
  });
});

router.get(
  "/me",
  authenticate,
  async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }

  res.json(user);
});

export default router;