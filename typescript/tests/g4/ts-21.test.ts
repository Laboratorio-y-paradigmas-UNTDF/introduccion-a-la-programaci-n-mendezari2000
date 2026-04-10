import { curry2 } from "../../src/index";

describe("TS-21: curry2 — currying de función binaria", () => {
  const sumar = (a: number, b: number) => a + b;
  const multiplicar = (a: number, b: number) => a * b;
  const restar = (a: number, b: number) => a - b;

  test("curry2 permite aplicación en dos pasos", () => {
    expect(curry2(sumar)(3)(4)).toBe(7);
  });

  test("genera función reutilizable para el primer argumento", () => {
    const sumar10 = curry2(sumar)(10);
    expect(sumar10(5)).toBe(15);
    expect(sumar10(20)).toBe(30);
    expect(sumar10(0)).toBe(10);
  });

  test("multiplicación curried", () => {
    const triplicar = curry2(multiplicar)(3);
    expect(triplicar(4)).toBe(12);
    expect(triplicar(7)).toBe(21);
  });

  test("resta — el orden importa", () => {
    // restar(10, 3) = 7
    expect(curry2(restar)(10)(3)).toBe(7);
    // restar(3, 10) = -7
    expect(curry2(restar)(3)(10)).toBe(-7);
  });

  test("retorna una función después del primer argumento", () => {
    const parcial = curry2(sumar)(5);
    expect(typeof parcial).toBe("function");
  });

  test("funciona con strings", () => {
    const concatenar = (a: string, b: string) => a + b;
    const curried = curry2(concatenar)("hola ");
    expect(curried("mundo")).toBe("hola mundo");
  });
});
