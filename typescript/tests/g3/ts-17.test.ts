import { aplanarLista } from "../../src/index";

describe("TS-17: aplanarLista — flatMap", () => {
  test("aplana lista de arrays de números", () => {
    expect(aplanarLista([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
  });

  test("arrays vacíos en la lista", () => {
    expect(aplanarLista([[], [1, 2], [], [3]])).toEqual([1, 2, 3]);
  });

  test("lista vacía → array vacío", () => {
    expect(aplanarLista([])).toEqual([]);
  });

  test("un solo sub-array", () => {
    expect(aplanarLista([[1, 2, 3]])).toEqual([1, 2, 3]);
  });

  test("arrays de strings", () => {
    expect(aplanarLista([["a", "b"], ["c"]])).toEqual(["a", "b", "c"]);
  });

  test("orden preservado", () => {
    expect(aplanarLista([[3, 1], [4, 1], [5, 9]])).toEqual([3, 1, 4, 1, 5, 9]);
  });
});
