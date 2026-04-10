import { procesarVentas } from "../../src/index";

describe("TS-23: procesarVentas — contraste imperativo vs funcional", () => {
  test("caso básico con mezcla", () => {
    const ventas = [
      { monto: 200, tipo: "online" },
      { monto: 50, tipo: "local" },
      { monto: 300, tipo: "online" },
    ];
    expect(procesarVentas(ventas)).toEqual({
      total: 500,
      count: 2,
      promedio: 250,
    });
  });

  test("ninguna venta > 100 → total 0, count 0, promedio 0", () => {
    const ventas = [
      { monto: 50, tipo: "local" },
      { monto: 99, tipo: "online" },
    ];
    expect(procesarVentas(ventas)).toEqual({ total: 0, count: 0, promedio: 0 });
  });

  test("todas > 100", () => {
    const ventas = [
      { monto: 200, tipo: "a" },
      { monto: 400, tipo: "b" },
    ];
    expect(procesarVentas(ventas)).toEqual({
      total: 600,
      count: 2,
      promedio: 300,
    });
  });

  test("una sola venta > 100", () => {
    const ventas = [
      { monto: 150, tipo: "x" },
      { monto: 90, tipo: "y" },
    ];
    expect(procesarVentas(ventas)).toEqual({
      total: 150,
      count: 1,
      promedio: 150,
    });
  });

  test("array vacío → ceros", () => {
    expect(procesarVentas([])).toEqual({ total: 0, count: 0, promedio: 0 });
  });

  test("promedio correcto con decimales", () => {
    const ventas = [
      { monto: 150, tipo: "a" },
      { monto: 200, tipo: "b" },
      { monto: 250, tipo: "c" },
    ];
    const resultado = procesarVentas(ventas);
    expect(resultado.total).toBe(600);
    expect(resultado.count).toBe(3);
    expect(resultado.promedio).toBeCloseTo(200, 5);
  });
});
