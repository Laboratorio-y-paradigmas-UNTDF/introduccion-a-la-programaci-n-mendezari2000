import { soloMayusculas } from "../../src/index";

describe("TS-11: soloMayusculas — map", () => {
  test("convierte a mayúsculas", () => {
    expect(soloMayusculas(["hola", "mundo"])).toEqual(["HOLA", "MUNDO"]);
  });

  test("ya estaban en mayúsculas", () => {
    expect(soloMayusculas(["HOLA", "MUNDO"])).toEqual(["HOLA", "MUNDO"]);
  });

  test("mezcla de mayúsculas y minúsculas", () => {
    expect(soloMayusculas(["HoLa", "MuNdO"])).toEqual(["HOLA", "MUNDO"]);
  });

  test("array vacío", () => {
    expect(soloMayusculas([])).toEqual([]);
  });

  test("strings con espacios y acentos", () => {
    const resultado = soloMayusculas(["programación funcional"]);
    expect(resultado[0]).toBe("PROGRAMACIÓN FUNCIONAL");
  });

  test("no muta el array original", () => {
    const original = ["hola", "mundo"];
    const copia = [...original];
    soloMayusculas(original);
    expect(original).toEqual(copia);
  });
});
