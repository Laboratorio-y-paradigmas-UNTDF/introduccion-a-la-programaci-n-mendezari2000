import { compose } from "../../src/index";

describe("TS-19: compose — composición de funciones", () => {
  const inc = (x: number) => x + 1;
  const doble = (x: number) => x * 2;
  const cuadrado = (x: number) => x * x;

  test("compose(f, g)(x) === f(g(x)) — g se aplica PRIMERO", () => {
    // doble(3) = 6, luego inc(6) = 7
    expect(compose(inc, doble)(3)).toBe(7);
  });

  test("compose no es conmutativo", () => {
    // compose(doble, inc)(3): inc(3)=4, luego doble(4)=8
    // compose(inc, doble)(3): doble(3)=6, luego inc(6)=7
    expect(compose(doble, inc)(3)).toBe(8);
    expect(compose(inc, doble)(3)).toBe(7);
  });

  test("compose con cuadrado e inc", () => {
    // compose(cuadrado, inc)(4): inc(4)=5, luego 5²=25
    expect(compose(cuadrado, inc)(4)).toBe(25);
  });

  test("retorna una función", () => {
    expect(typeof compose(inc, doble)).toBe("function");
  });

  test("compose de strings", () => {
    const trim = (s: string) => s.trim();
    const upper = (s: string) => s.toUpperCase();
    // upper(trim(" hola ")) = upper("hola") = "HOLA"
    expect(compose(upper, trim)("  hola  ")).toBe("HOLA");
  });

  test("identity compose de cualquier f retorna f", () => {
    const identity = (x: number) => x;
    expect(compose(identity, doble)(5)).toBe(10);
    expect(compose(doble, identity)(5)).toBe(10);
  });
});
