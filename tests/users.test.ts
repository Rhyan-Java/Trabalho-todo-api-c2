import { describe, it, expect } from "vitest";

describe("Users", () => {
  it("deve criar um usuário corretamente", () => {
    const user = {
      name: "Rhyan",
      email: "rhyan@email.com",
      password: "123456",
    };

    expect(user.name).toBe("Rhyan");
    expect(user.email).toContain("@");
    expect(user.password.length).toBeGreaterThanOrEqual(6);
  });
});