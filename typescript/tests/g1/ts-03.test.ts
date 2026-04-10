import { fibonacci } from "../../src/index";

describe("TS-03: fibonacci — recursivo puro", () => {
  test("fibonacci(0) === 0", () => {
    expect(fibonacci(0)).toBe(0);
  });

  test("fibonacci(1) === 1", () => {
    expect(fibonacci(1)).toBe(1);
  });

  test("fibonacci(2) === 1", () => {
    expect(fibonacci(2)).toBe(1);
  });

  test("fibonacci(5) === 5", () => {
    expect(fibonacci(5)).toBe(5);
  });

  test("fibonacci(10) === 55", () => {
    expect(fibonacci(10)).toBe(55);
  });

  test("fibonacci(15) === 610", () => {
    expect(fibonacci(15)).toBe(610);
  });

  test("es PURA — mismo resultado en llamadas repetidas", () => {
    expect(fibonacci(8)).toBe(fibonacci(8));
  });
});
