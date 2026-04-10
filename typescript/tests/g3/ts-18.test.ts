import { totalVentasCredito } from "../../src/index";

describe("TS-18: totalVentasCredito — pipeline completo", () => {
  test("caso mixto", () => {
    const transacciones = [
      { monto: 200, tipo: "credito" as const },
      { monto: 50, tipo: "credito" as const },
      { monto: 300, tipo: "debito" as const },
      { monto: 150, tipo: "credito" as const },
    ];
    // credito y > 100: 200 + 150 = 350
    expect(totalVentasCredito(transacciones)).toBe(350);
  });

  test("ninguna transacción cumple los dos criterios → 0", () => {
    const transacciones = [
      { monto: 50, tipo: "credito" as const },
      { monto: 200, tipo: "debito" as const },
    ];
    expect(totalVentasCredito(transacciones)).toBe(0);
  });

  test("todas crédito y > 100", () => {
    const transacciones = [
      { monto: 200, tipo: "credito" as const },
      { monto: 300, tipo: "credito" as const },
    ];
    expect(totalVentasCredito(transacciones)).toBe(500);
  });

  test("array vacío → 0", () => {
    expect(totalVentasCredito([])).toBe(0);
  });

  test("monto exactamente 100 no se incluye (debe ser > 100)", () => {
    const transacciones = [
      { monto: 100, tipo: "credito" as const },
      { monto: 101, tipo: "credito" as const },
    ];
    expect(totalVentasCredito(transacciones)).toBe(101);
  });

  test("no muta el array original", () => {
    const transacciones = [
      { monto: 200, tipo: "credito" as const },
    ];
    const copia = [...transacciones];
    totalVentasCredito(transacciones);
    expect(transacciones).toEqual(copia);
  });
});
