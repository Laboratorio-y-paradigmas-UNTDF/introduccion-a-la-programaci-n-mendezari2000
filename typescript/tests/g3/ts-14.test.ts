import { contarPalabras } from "../../src/index";

describe("TS-14: contarPalabras — split + reduce", () => {
  test("cuenta palabras repetidas", () => {
    expect(contarPalabras("hola mundo hola")).toEqual({ hola: 2, mundo: 1 });
  });

  test("string vacío → objeto vacío", () => {
    expect(contarPalabras("")).toEqual({});
  });

  test("una sola palabra", () => {
    expect(contarPalabras("funcional")).toEqual({ funcional: 1 });
  });

  test("todas únicas", () => {
    expect(contarPalabras("lambda calculo church turing")).toEqual({
      lambda: 1,
      calculo: 1,
      church: 1,
      turing: 1,
    });
  });

  test("múltiples espacios entre palabras", () => {
    const resultado = contarPalabras("hola  mundo");
    // No deben aparecer strings vacíos como claves
    expect(Object.keys(resultado)).not.toContain("");
    expect(resultado["hola"]).toBe(1);
    expect(resultado["mundo"]).toBe(1);
  });

  test("tres repeticiones", () => {
    expect(contarPalabras("a a a")).toEqual({ a: 3 });
  });
});
