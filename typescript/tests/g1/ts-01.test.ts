import { calcularConImpuesto } from "../../src/index";

describe("TS-01: calcularConImpuesto — función pura", () => {
  test("impuesto del 21%", () => {
    expect(calcularConImpuesto(100, 21)).toBeCloseTo(121, 2);
  });

  test("impuesto del 10%", () => {
    expect(calcularConImpuesto(200, 10)).toBeCloseTo(220, 2);
  });

  test("impuesto del 0% (sin impuesto)", () => {
    expect(calcularConImpuesto(100, 0)).toBeCloseTo(100, 2);
  });

  test("precio base cero", () => {
    expect(calcularConImpuesto(0, 21)).toBeCloseTo(0, 2);
  });

  test("resultado redondeado a 2 decimales", () => {
    // 10.50 * 1.21 = 12.705 → 12.71
    expect(calcularConImpuesto(10.5, 21)).toBeCloseTo(12.71, 2);
  });

  test("es PURA — llamadas repetidas producen el mismo resultado", () => {
    const r1 = calcularConImpuesto(150, 16);
    const r2 = calcularConImpuesto(150, 16);
    const r3 = calcularConImpuesto(150, 16);
    expect(r1).toBe(r2);
    expect(r2).toBe(r3);
  });

  test("tasa fraccionaria", () => {
    expect(calcularConImpuesto(100, 5.5)).toBeCloseTo(105.5, 2);
  });
});
