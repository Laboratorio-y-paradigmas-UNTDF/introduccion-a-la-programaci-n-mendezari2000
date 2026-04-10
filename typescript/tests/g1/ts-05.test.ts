import { componerNombre } from "../../src/index";

describe("TS-05: componerNombre — función pura", () => {
  test("nombre y apellido sin título", () => {
    expect(componerNombre("Alan", "Turing")).toBe("Alan Turing");
  });

  test("nombre, apellido y título", () => {
    expect(componerNombre("Alan", "Turing", "Dr.")).toBe("Dr. Alan Turing");
  });

  test("título vacío tratado como sin título o incluido", () => {
    // Con string vacío como título → aceptar ambas formas razonables
    const result = componerNombre("Grace", "Hopper", "");
    expect(typeof result).toBe("string");
    expect(result).toContain("Grace");
    expect(result).toContain("Hopper");
  });

  test("título Lic.", () => {
    expect(componerNombre("Alonzo", "Church", "Lic.")).toBe(
      "Lic. Alonzo Church"
    );
  });

  test("sin título — solo nombre y apellido", () => {
    expect(componerNombre("Grace", "Hopper")).toBe("Grace Hopper");
  });

  test("es PURA — mismo resultado para los mismos argumentos", () => {
    expect(componerNombre("John", "McCarthy", "Prof.")).toBe(
      componerNombre("John", "McCarthy", "Prof.")
    );
  });
});
