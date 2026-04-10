import { agregarElemento } from "../../src/index";

describe("TS-06: agregarElemento — inmutabilidad", () => {
  test("agrega al final de array de números", () => {
    expect(agregarElemento([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
  });

  test("agrega a array vacío", () => {
    expect(agregarElemento([], 42)).toEqual([42]);
  });

  test("agrega string a array de strings", () => {
    expect(agregarElemento(["a", "b"], "c")).toEqual(["a", "b", "c"]);
  });

  test("NO muta el array original", () => {
    const original = [1, 2, 3];
    const copia = [...original];
    agregarElemento(original, 99);
    expect(original).toEqual(copia);
    expect(original.length).toBe(3);
  });

  test("retorna un NUEVO array (no el mismo objeto)", () => {
    const original = [1, 2, 3];
    const resultado = agregarElemento(original, 4);
    expect(resultado).not.toBe(original);
  });

  test("agrega elemento al array de un solo elemento", () => {
    expect(agregarElemento([100], 200)).toEqual([100, 200]);
  });
});
