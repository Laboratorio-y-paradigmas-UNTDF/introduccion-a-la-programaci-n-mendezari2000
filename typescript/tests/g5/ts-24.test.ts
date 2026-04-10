import { estadisticasArray } from "../../src/index";

describe("TS-24: estadisticasArray — pipeline funcional completo", () => {
  test("caso con longitud par", () => {
    // sorted: [1,1,2,3,4,5,6,9] → mediana = (3+4)/2 = 3.5
    const resultado = estadisticasArray([3, 1, 4, 1, 5, 9, 2, 6]);
    expect(resultado.min).toBe(1);
    expect(resultado.max).toBe(9);
    expect(resultado.sum).toBe(31);
    expect(resultado.promedio).toBeCloseTo(3.875, 5);
    expect(resultado.mediana).toBeCloseTo(3.5, 5);
  });

  test("caso con longitud impar", () => {
    // sorted: [1,2,3,4,5] → mediana = 3
    const resultado = estadisticasArray([5, 1, 3, 2, 4]);
    expect(resultado.min).toBe(1);
    expect(resultado.max).toBe(5);
    expect(resultado.sum).toBe(15);
    expect(resultado.promedio).toBe(3);
    expect(resultado.mediana).toBe(3);
  });

  test("array de un elemento", () => {
    const resultado = estadisticasArray([42]);
    expect(resultado.min).toBe(42);
    expect(resultado.max).toBe(42);
    expect(resultado.sum).toBe(42);
    expect(resultado.promedio).toBe(42);
    expect(resultado.mediana).toBe(42);
  });

  test("array vacío → todos cero", () => {
    expect(estadisticasArray([])).toEqual({
      min: 0,
      max: 0,
      sum: 0,
      promedio: 0,
      mediana: 0,
    });
  });

  test("no muta el array original", () => {
    const original = [5, 3, 1, 4, 2];
    const copia = [...original];
    estadisticasArray(original);
    expect(original).toEqual(copia);
  });

  test("dos elementos — mediana es el promedio de ambos", () => {
    // sorted: [3, 7] → mediana = (3+7)/2 = 5
    const resultado = estadisticasArray([7, 3]);
    expect(resultado.mediana).toBe(5);
  });
});
