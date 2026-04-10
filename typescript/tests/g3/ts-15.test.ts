import { sumaFiltradosAlCuadrado } from "../../src/index";

describe("TS-15: sumaFiltradosAlCuadrado — pipeline filter/map/reduce", () => {
  test("caso básico", () => {
    // > 2: [3,4,5] → [9,16,25] → 50
    expect(sumaFiltradosAlCuadrado([1, 2, 3, 4, 5], 2)).toBe(50);
  });

  test("ninguno supera el umbral → 0", () => {
    expect(sumaFiltradosAlCuadrado([1, 2, 3], 10)).toBe(0);
  });

  test("todos superan el umbral", () => {
    // > 0: [1,2,3] → [1,4,9] → 14
    expect(sumaFiltradosAlCuadrado([1, 2, 3], 0)).toBe(14);
  });

  test("array vacío → 0", () => {
    expect(sumaFiltradosAlCuadrado([], 5)).toBe(0);
  });

  test("umbral exactamente igual no filtra (solo > umbral)", () => {
    // umbral=3, solo >3: [4,5] → [16,25] → 41
    expect(sumaFiltradosAlCuadrado([1, 2, 3, 4, 5], 3)).toBe(41);
  });

  test("negativos en el array", () => {
    // > -1: [0,1,2] → [0,1,4] → 5
    expect(sumaFiltradosAlCuadrado([-2, -1, 0, 1, 2], -1)).toBe(5);
  });
});
