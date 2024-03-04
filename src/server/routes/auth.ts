import { Hono } from "hono";
import { validator } from "hono/validator";
import v from "valibot";
import { vValidator } from "@hono/valibot-validator";

const auth = new Hono();

const BodySchema = v.object({
  email: v.string(),
  password: v.string(),
});

auth.post("/login", vValidator("form", BodySchema), async (c) => {
  try {
    const { email, password } = c.req.valid("form");

    return c.text("Login success");
  } catch (e) {
    c.status(401);
    return c.text("Login failed");
  }
});
