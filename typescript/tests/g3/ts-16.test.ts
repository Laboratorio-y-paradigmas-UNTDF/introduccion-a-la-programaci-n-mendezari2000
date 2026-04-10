import { promedioAprobados } from "../../src/index";

describe("TS-16: promedioAprobados — pipeline funcional", () => {
  test("caso mixto", () => {
    const estudiantes = [
      { nombre: "Ana", nota: 8 },
      { nombre: "Beto", nota: 4 },
      { nombre: "Carla", nota: 6 },
    ];
    expect(promedioAprobados(estudiantes)).toBeCloseTo(7, 5);
  });

  test("todos aprobados", () => {
    const estudiantes = [
      { nombre: "A", nota: 8 },
      { nombre: "B", nota: 10 },
      { nombre: "C", nota: 6 },
    ];
    expect(promedioAprobados(estudiantes)).toBeCloseTo(8, 5);
  });

  test("ningún aprobado → 0", () => {
    const estudiantes = [
      { nombre: "A", nota: 3 },
      { nombre: "B", nota: 5 },
    ];
    expect(promedioAprobados(estudiantes)).toBe(0);
  });

  test("array vacío → 0", () => {
    expect(promedioAprobados([])).toBe(0);
  });

  test("nota exactamente 6 → aprobado", () => {
    const estudiantes = [{ nombre: "Borde", nota: 6 }];
    expect(promedioAprobados(estudiantes)).toBe(6);
  });

  test("múltiples aprobados — promedio correcto", () => {
    const estudiantes = [
      { nombre: "A", nota: 7 },
      { nombre: "B", nota: 9 },
      { nombre: "C", nota: 4 },
      { nombre: "D", nota: 8 },
    ];
    // Aprobados: 7, 9, 8 → promedio = 24/3 = 8
    expect(promedioAprobados(estudiantes)).toBeCloseTo(8, 5);
  });
});
