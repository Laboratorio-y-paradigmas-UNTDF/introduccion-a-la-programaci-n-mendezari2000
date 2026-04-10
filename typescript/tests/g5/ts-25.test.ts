import { transformarDatos } from "../../src/index";

describe("TS-25: transformarDatos — pipeline funcional capstone", () => {
  test("caso completo del enunciado", () => {
    const registros = [
      { nombre: "Ana", ventas: [100, 200, 150], activo: true },
      { nombre: "Beto", ventas: [50], activo: false },
      { nombre: "Carla", ventas: [300, 400], activo: true },
      { nombre: "Dana", ventas: [], activo: true },
    ];
    expect(transformarDatos(registros)).toEqual([
      { nombre: "Carla", promedio: 350 },
      { nombre: "Ana", promedio: 150 },
      { nombre: "Dana", promedio: 0 },
    ]);
  });

  test("todos inactivos → array vacío", () => {
    const registros = [
      { nombre: "A", ventas: [100], activo: false },
      { nombre: "B", ventas: [200], activo: false },
    ];
    expect(transformarDatos(registros)).toEqual([]);
  });

  test("un solo activo", () => {
    const registros = [
      { nombre: "Solo", ventas: [10, 20, 30], activo: true },
    ];
    expect(transformarDatos(registros)).toEqual([
      { nombre: "Solo", promedio: 20 },
    ]);
  });

  test("array vacío → array vacío", () => {
    expect(transformarDatos([])).toEqual([]);
  });

  test("orden correcto — mayor promedio primero", () => {
    const registros = [
      { nombre: "B", ventas: [10], activo: true },
      { nombre: "A", ventas: [50], activo: true },
      { nombre: "C", ventas: [30], activo: true },
    ];
    const resultado = transformarDatos(registros);
    expect(resultado[0].nombre).toBe("A");
    expect(resultado[1].nombre).toBe("C");
    expect(resultado[2].nombre).toBe("B");
  });

  test("no muta los registros originales", () => {
    const registros = [
      { nombre: "Ana", ventas: [100, 200], activo: true },
    ];
    const copiaVentas = [...registros[0].ventas];
    transformarDatos(registros);
    expect(registros[0].ventas).toEqual(copiaVentas);
    expect(registros[0].activo).toBe(true);
  });

  test("promedio redondeado a 2 decimales", () => {
    // (10+20+30) / 3 = 20.00 exacto; probar con fracción:
    // (10+11) / 3 = 7.00... pero mejor: ventas: [1, 2] → 1.5
    const registros = [
      { nombre: "Fraccion", ventas: [1, 2], activo: true },
    ];
    const resultado = transformarDatos(registros);
    expect(resultado[0].promedio).toBeCloseTo(1.5, 2);
  });
});
