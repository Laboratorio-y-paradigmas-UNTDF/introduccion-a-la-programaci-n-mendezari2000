import { aplicarDescuentoRegistros } from "../../src/index";

describe("TS-10: aplicarDescuentoRegistros — inmutabilidad", () => {
  test("aplica 10% de descuento a todos los productos", () => {
    const productos = [
      { nombre: "A", precio: 100 },
      { nombre: "B", precio: 200 },
    ];
    expect(aplicarDescuentoRegistros(productos, 10)).toEqual([
      { nombre: "A", precio: 90 },
      { nombre: "B", precio: 180 },
    ]);
  });

  test("descuento del 25% con redondeo a 2 decimales", () => {
    const productos = [{ nombre: "X", precio: 99 }];
    const resultado = aplicarDescuentoRegistros(productos, 25);
    expect(resultado[0].precio).toBeCloseTo(74.25, 2);
  });

  test("descuento del 0% — mismos precios", () => {
    const productos = [{ nombre: "Libre", precio: 500 }];
    expect(aplicarDescuentoRegistros(productos, 0)).toEqual([
      { nombre: "Libre", precio: 500 },
    ]);
  });

  test("NO muta el array original", () => {
    const productos = [{ nombre: "A", precio: 100 }];
    const copiaArr = [...productos];
    aplicarDescuentoRegistros(productos, 10);
    expect(productos).toEqual(copiaArr);
  });

  test("NO muta los objetos originales del array", () => {
    const prod = { nombre: "Mutable", precio: 1000 };
    const productos = [prod];
    aplicarDescuentoRegistros(productos, 20);
    expect(prod.precio).toBe(1000);
  });

  test("retorna NUEVOS objetos (no los mismos)", () => {
    const prod = { nombre: "A", precio: 100 };
    const resultado = aplicarDescuentoRegistros([prod], 10);
    expect(resultado[0]).not.toBe(prod);
  });
});
