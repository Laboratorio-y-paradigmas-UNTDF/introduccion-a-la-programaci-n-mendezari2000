import { eliminarPorIndice } from "../../src/index";

describe("TS-07: eliminarPorIndice — inmutabilidad", () => {
  test("elimina elemento en el medio", () => {
    expect(eliminarPorIndice([10, 20, 30, 40], 1)).toEqual([10, 30, 40]);
  });

  test("elimina el primer elemento (índice 0)", () => {
    expect(eliminarPorIndice([10, 20, 30], 0)).toEqual([20, 30]);
  });

  test("elimina el último elemento", () => {
    expect(eliminarPorIndice([10, 20, 30], 2)).toEqual([10, 20]);
  });

  test("índice fuera de rango positivo → retorna copia sin cambios", () => {
    expect(eliminarPorIndice([1, 2, 3], 99)).toEqual([1, 2, 3]);
  });

  test("índice negativo → retorna copia sin cambios", () => {
    expect(eliminarPorIndice([1, 2, 3], -1)).toEqual([1, 2, 3]);
  });

  test("NO muta el array original", () => {
    const original = [10, 20, 30, 40];
    const copia = [...original];
    eliminarPorIndice(original, 2);
    expect(original).toEqual(copia);
  });

  test("retorna NUEVO array (no el mismo objeto)", () => {
    const original = [1, 2, 3];
    const resultado = eliminarPorIndice(original, 0);
    expect(resultado).not.toBe(original);
  });
});
