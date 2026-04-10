import { validarContrasena } from "../../src/index";

describe("TS-04: validarContrasena — función pura", () => {
  test("contraseña válida", () => {
    const resultado = validarContrasena("Abc12345");
    expect(resultado.valida).toBe(true);
    expect(resultado.errores).toHaveLength(0);
  });

  test("muy corta (menos de 8 caracteres)", () => {
    const resultado = validarContrasena("Ab1");
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBeGreaterThanOrEqual(1);
    expect(resultado.errores.some((e) => e.toLowerCase().includes("8"))).toBe(
      true
    );
  });

  test("sin mayúsculas", () => {
    const resultado = validarContrasena("abcdefg1");
    expect(resultado.valida).toBe(false);
    expect(
      resultado.errores.some(
        (e) =>
          e.toLowerCase().includes("mayúscula") ||
          e.toLowerCase().includes("mayuscul")
      )
    ).toBe(true);
  });

  test("sin dígitos", () => {
    const resultado = validarContrasena("AbcdefgH");
    expect(resultado.valida).toBe(false);
    expect(
      resultado.errores.some(
        (e) =>
          e.toLowerCase().includes("dígito") ||
          e.toLowerCase().includes("digito") ||
          e.toLowerCase().includes("número") ||
          e.toLowerCase().includes("numero")
      )
    ).toBe(true);
  });

  test("completa con múltiples errores", () => {
    const resultado = validarContrasena("abc");
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBeGreaterThanOrEqual(3);
  });

  test("es PURA — misma contraseña → mismo resultado", () => {
    const r1 = validarContrasena("weakpas1A");
    const r2 = validarContrasena("weakpas1A");
    expect(r1).toEqual(r2);
  });
});
