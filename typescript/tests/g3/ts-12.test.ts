import { productosBaratos } from "../../src/index";

describe("TS-12: productosBaratos — filter", () => {
  test("filtra productos bajo el límite", () => {
    const productos = [
      { nombre: "A", precio: 50 },
      { nombre: "B", precio: 150 },
      { nombre: "C", precio: 100 },
    ];
    expect(productosBaratos(productos, 100)).toEqual([
      { nombre: "A", precio: 50 },
      { nombre: "C", precio: 100 },
    ]);
  });

  test("ninguno pasa el filtro", () => {
    const productos = [
      { nombre: "X", precio: 500 },
      { nombre: "Y", precio: 1000 },
    ];
    expect(productosBaratos(productos, 100)).toEqual([]);
  });

  test("todos pasan el filtro", () => {
    const productos = [
      { nombre: "A", precio: 10 },
      { nombre: "B", precio: 20 },
    ];
    expect(productosBaratos(productos, 100)).toEqual(productos);
  });

  test("precio exactamente igual al límite (incluido)", () => {
    const productos = [{ nombre: "Exacto", precio: 100 }];
    expect(productosBaratos(productos, 100)).toHaveLength(1);
  });

  test("array vacío", () => {
    expect(productosBaratos([], 100)).toEqual([]);
  });

  test("no muta el array original", () => {
    const productos = [
      { nombre: "A", precio: 50 },
      { nombre: "B", precio: 200 },
    ];
    const copia = [...productos];
    productosBaratos(productos, 100);
    expect(productos).toEqual(copia);
  });
});
