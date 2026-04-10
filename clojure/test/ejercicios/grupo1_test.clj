(ns ejercicios.grupo1-test
  (:require [clojure.test :refer [deftest testing is]]
            [ejercicios.core :refer [contar-pares suma-lista invertir-lista
                                     maximo-lista rango-lista]]))

;; ── CLJ-01: contar-pares ─────────────────────────────────────────────────────

(deftest test-contar-pares
  (testing "lista mixta"
    (is (= 3 (contar-pares [1 2 3 4 5 6]))))
  (testing "solo pares"
    (is (= 4 (contar-pares [2 4 6 8]))))
  (testing "solo impares"
    (is (= 0 (contar-pares [1 3 5 7]))))
  (testing "lista vacía"
    (is (= 0 (contar-pares []))))
  (testing "negativos — -2 es par, -3 es impar"
    (is (= 2 (contar-pares [-2 -1 0 -3]))))
  (testing "un solo par"
    (is (= 1 (contar-pares [2])))))

;; ── CLJ-02: suma-lista ───────────────────────────────────────────────────────

(deftest test-suma-lista
  (testing "suma simple"
    (is (= 15 (suma-lista [1 2 3 4 5]))))
  (testing "lista vacía -> 0"
    (is (= 0 (suma-lista []))))
  (testing "un solo elemento"
    (is (= 42 (suma-lista [42]))))
  (testing "con negativos"
    (is (= 0 (suma-lista [-5 -3 2 6]))))
  (testing "todos cero"
    (is (= 0 (suma-lista [0 0 0])))))

;; ── CLJ-03: invertir-lista ───────────────────────────────────────────────────

(deftest test-invertir-lista
  (testing "invierte tres elementos"
    (is (= [3 2 1] (into [] (invertir-lista [1 2 3])))))
  (testing "lista vacía"
    (is (= [] (into [] (invertir-lista [])))))
  (testing "un solo elemento"
    (is (= [42] (into [] (invertir-lista [42])))))
  (testing "cinco elementos"
    (is (= [5 4 3 2 1] (into [] (invertir-lista [1 2 3 4 5])))))
  (testing "no modifica el original — puede verificar con coll persistente"
    (let [original [1 2 3]]
      (invertir-lista original)
      (is (= [1 2 3] original)))))

;; ── CLJ-04: maximo-lista ─────────────────────────────────────────────────────

(deftest test-maximo-lista
  (testing "máximo en lista desordenada"
    (is (= 9 (maximo-lista [3 1 4 1 5 9 2 6]))))
  (testing "un solo elemento"
    (is (= 7 (maximo-lista [7]))))
  (testing "todos negativos"
    (is (= -1 (maximo-lista [-5 -1 -3 -2]))))
  (testing "todos iguales"
    (is (= 4 (maximo-lista [4 4 4 4]))))
  (testing "máximo al principio"
    (is (= 100 (maximo-lista [100 50 25 10])))))

;; ── CLJ-05: rango-lista ──────────────────────────────────────────────────────

(deftest test-rango-lista
  (testing "caso básico"
    (let [r (rango-lista [3 1 4 1 5 9])]
      (is (= 1 (:min r)))
      (is (= 9 (:max r)))
      (is (= 8 (:rango r)))))
  (testing "un elemento — rango 0"
    (let [r (rango-lista [5])]
      (is (= 5 (:min r)))
      (is (= 5 (:max r)))
      (is (= 0 (:rango r)))))
  (testing "todos negativos"
    (let [r (rango-lista [-5 -1 -3])]
      (is (= -5 (:min r)))
      (is (= -1 (:max r)))
      (is (= 4 (:rango r)))))
  (testing "retorna mapa con exactamente las claves :min :max :rango"
    (let [r (rango-lista [1 2 3])]
      (is (contains? r :min))
      (is (contains? r :max))
      (is (contains? r :rango)))))
