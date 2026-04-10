import { sumaTotal } from "../../src/index";

describe("TS-13: sumaTotal — reduce", () => {
  test("suma varios números", () => {
    expect(sumaTotal([1, 2, 3, 4, 5])).toBe(15);
  });

  test("array de un elemento", () => {
    expect(sumaTotal([42])).toBe(42);
  });

  test("array vacío → 0", () => {
    expect(sumaTotal([])).toBe(0);
  });

  test("incluye negativos", () => {
    expect(sumaTotal([10, -3, 5, -2])).toBe(10);
  });

  test("todos ceros", () => {
    expect(sumaTotal([0, 0, 0])).toBe(0);
  });

  test("decimales", () => {
    expect(sumaTotal([1.5, 2.5, 3.0])).toBeCloseTo(7.0, 5);
  });

  test("no muta el array original", () => {
    const original = [1, 2, 3];
    const copia = [...original];
    sumaTotal(original);
    expect(original).toEqual(copia);
  });
});
