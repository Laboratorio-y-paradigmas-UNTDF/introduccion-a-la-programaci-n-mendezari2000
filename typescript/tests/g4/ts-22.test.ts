import { partial } from "../../src/index";

describe("TS-22: partial — aplicación parcial del primer argumento", () => {
  const multiplicar = (a: number, b: number) => a * b;
  const restar = (a: number, b: number) => a - b;
  const dividir = (a: number, b: number) => a / b;

  test("partial fija el primer argumento", () => {
    const triplicar = partial(multiplicar, 3);
    expect(triplicar(4)).toBe(12);
    expect(triplicar(7)).toBe(21);
  });

  test("partial de resta — orden importa", () => {
    // restar(10, b) = 10 - b
    const restarDe10 = partial(restar, 10);
    expect(restarDe10(3)).toBe(7);
    expect(restarDe10(6)).toBe(4);
  });

  test("partial de división", () => {
    const dividirPor2 = partial(dividir, 10);
    expect(dividirPor2(2)).toBe(5);
  });

  test("retorna una función", () => {
    expect(typeof partial(multiplicar, 5)).toBe("function");
  });

  test("la función parcializada es reutilizable", () => {
    const doblar = partial(multiplicar, 2);
    const resultados = [1, 2, 3, 4, 5].map(doblar);
    expect(resultados).toEqual([2, 4, 6, 8, 10]);
  });

  test("partial de concatenación de strings", () => {
    const concat = (a: string, b: string) => a + b;
    const hola = partial(concat, "Hola, ");
    expect(hola("Alan")).toBe("Hola, Alan");
    expect(hola("Grace")).toBe("Hola, Grace");
  });
});
