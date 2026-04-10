import { agruparPorParidad } from "../../src/index";

describe("TS-02: agruparPorParidad — función pura", () => {
  test("mezcla de pares e impares", () => {
    expect(agruparPorParidad([1, 2, 3, 4, 5])).toEqual({
      pares: [2, 4],
      impares: [1, 3, 5],
    });
  });

  test("todos pares", () => {
    expect(agruparPorParidad([2, 4, 6, 8])).toEqual({
      pares: [2, 4, 6, 8],
      impares: [],
    });
  });

  test("todos impares", () => {
    expect(agruparPorParidad([1, 3, 5])).toEqual({
      pares: [],
      impares: [1, 3, 5],
    });
  });

  test("array vacío", () => {
    expect(agruparPorParidad([])).toEqual({ pares: [], impares: [] });
  });

  test("negativos — el cero es par", () => {
    expect(agruparPorParidad([-2, -1, 0, 1])).toEqual({
      pares: [-2, 0],
      impares: [-1, 1],
    });
  });

  test("no muta el array original", () => {
    const original = [1, 2, 3, 4];
    const copia = [...original];
    agruparPorParidad(original);
    expect(original).toEqual(copia);
  });
});
