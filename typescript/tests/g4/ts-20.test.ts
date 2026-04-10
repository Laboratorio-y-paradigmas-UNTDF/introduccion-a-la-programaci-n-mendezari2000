import { pipe } from "../../src/index";

describe("TS-20: pipe — aplicación izquierda a derecha", () => {
  const inc = (x: number) => x + 1;
  const doble = (x: number) => x * 2;
  const cuadrado = (x: number) => x * x;

  test("pipe(f, g)(x) === g(f(x)) — f se aplica PRIMERO", () => {
    // inc(3)=4, luego doble(4)=8
    expect(pipe(inc, doble)(3)).toBe(8);
  });

  test("tres funciones en pipe", () => {
    // inc(2)=3, doble(3)=6, cuadrado(6)=36
    expect(pipe(inc, doble, cuadrado)(2)).toBe(36);
  });

  test("pipe de una sola función", () => {
    expect(pipe(doble)(5)).toBe(10);
  });

  test("pipe vacío retorna la función identidad — acepta cualquier valor", () => {
    // pipe() sin argumentos debería devolver una función que retorna x
    const id = pipe<number>();
    expect(id(42)).toBe(42);
  });

  test("pipe no es conmutativo con compose", () => {
    // pipe(inc, doble)(3): inc primero → 8
    // compose(doble, inc)(3): inc primero → 8 (igual que pipe(inc, doble))
    expect(pipe(inc, doble)(3)).toBe(8);
  });

  test("retorna una función reutilizable", () => {
    const procesar = pipe(inc, doble);
    expect(procesar(1)).toBe(4);
    expect(procesar(5)).toBe(12);
    expect(procesar(10)).toBe(22);
  });
});
