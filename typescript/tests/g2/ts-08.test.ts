import { actualizarPrecio } from "../../src/index";

describe("TS-08: actualizarPrecio — inmutabilidad de objetos", () => {
  test("actualiza el precio correctamente", () => {
    const prod = { nombre: "Libro", precio: 100 };
    const resultado = actualizarPrecio(prod, 120);
    expect(resultado.precio).toBe(120);
  });

  test("conserva otros campos del objeto", () => {
    const prod = { nombre: "Notebook", precio: 1000, stock: 5 };
    const resultado = actualizarPrecio(prod, 1200);
    expect(resultado.nombre).toBe("Notebook");
    expect(resultado.precio).toBe(1200);
    expect((resultado as typeof prod).stock).toBe(5);
  });

  test("NO muta el objeto original", () => {
    const prod = { nombre: "Teclado", precio: 200 };
    actualizarPrecio(prod, 250);
    expect(prod.precio).toBe(200);
  });

  test("retorna un NUEVO objeto (no el mismo objeto)", () => {
    const prod = { nombre: "Mouse", precio: 50 };
    const resultado = actualizarPrecio(prod, 75);
    expect(resultado).not.toBe(prod);
  });

  test("precio nuevo puede ser cero", () => {
    const prod = { nombre: "Promo", precio: 100 };
    const resultado = actualizarPrecio(prod, 0);
    expect(resultado.precio).toBe(0);
  });
});
