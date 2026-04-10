import { ordenarSinMutar } from "../../src/index";

describe("TS-09: ordenarSinMutar — inmutabilidad", () => {
  test("ordena ascendentemente", () => {
    expect(ordenarSinMutar([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([
      1, 1, 2, 3, 4, 5, 6, 9,
    ]);
  });

  test("array ya ordenado", () => {
    expect(ordenarSinMutar([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  test("un solo elemento", () => {
    expect(ordenarSinMutar([42])).toEqual([42]);
  });

  test("negativos y positivos", () => {
    expect(ordenarSinMutar([-3, 1, -1, 2, 0])).toEqual([-3, -1, 0, 1, 2]);
  });

  test("NO muta el array original", () => {
    const original = [5, 3, 1, 4, 2];
    const copia = [...original];
    ordenarSinMutar(original);
    expect(original).toEqual(copia);
  });

  test("retorna NUEVO array (no es el mismo objeto)", () => {
    const original = [3, 1, 2];
    const resultado = ordenarSinMutar(original);
    expect(resultado).not.toBe(original);
  });

  test("orden numérico correcto (no lexicográfico)", () => {
    // Si .sort() sin comparador: [10, 2, 1] → [1, 10, 2] (lexicográfico) → incorrecto
    // Con comparador numérico: [1, 2, 10]
    expect(ordenarSinMutar([10, 2, 1, 20])).toEqual([1, 2, 10, 20]);
  });
});
