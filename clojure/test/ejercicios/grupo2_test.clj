(ns ejercicios.grupo2-test
  (:require [clojure.test :refer [deftest testing is]]
            [ejercicios.core :refer [doblar solo-positivos producto-lista
                                     palabras-mayusculas suma-cuadrados-pares
                                     aplanar-listas]]))

;; ── CLJ-06: doblar ───────────────────────────────────────────────────────────

(deftest test-doblar
  (testing "dobla tres elementos"
    (is (= [2 4 6] (into [] (doblar [1 2 3])))))
  (testing "lista vacía"
    (is (= [] (into [] (doblar [])))))
  (testing "un elemento"
    (is (= [10] (into [] (doblar [5])))))
  (testing "incluye cero"
    (is (= [0 2 4] (into [] (doblar [0 1 2])))))
  (testing "negativos"
    (is (= [-4 -2 0 2 4] (into [] (doblar [-2 -1 0 1 2]))))))

;; ── CLJ-07: solo-positivos ───────────────────────────────────────────────────

(deftest test-solo-positivos
  (testing "lista mixta"
    (is (= [1 2 3] (into [] (solo-positivos [-2 -1 0 1 2 3])))))
  (testing "ninguno positivo"
    (is (= [] (into [] (solo-positivos [-3 -2 -1 0])))))
  (testing "todos positivos"
    (is (= [1 2 3] (into [] (solo-positivos [1 2 3])))))
  (testing "lista vacía"
    (is (= [] (into [] (solo-positivos [])))))
  (testing "cero no es positivo (> 0)"
    (is (= [] (into [] (solo-positivos [0]))))))

;; ── CLJ-08: producto-lista ───────────────────────────────────────────────────

(deftest test-producto-lista
  (testing "producto de cinco factores"
    (is (= 120 (producto-lista [1 2 3 4 5]))))
  (testing "un elemento"
    (is (= 7 (producto-lista [7]))))
  (testing "incluye cero → producto 0"
    (is (= 0 (producto-lista [1 2 0 4]))))
  (testing "todos unos"
    (is (= 1 (producto-lista [1 1 1 1]))))
  (testing "incluye negativos — producto de dos negativos es positivo"
    (is (= 6 (producto-lista [-1 -2 3])))))

;; ── CLJ-09: palabras-mayusculas ──────────────────────────────────────────────

(deftest test-palabras-mayusculas
  (testing "convierte a mayúsculas"
    (is (= ["HOLA" "MUNDO"] (into [] (palabras-mayusculas ["hola" "mundo"])))))
  (testing "ya en mayúsculas — sin cambio"
    (is (= ["HOLA"] (into [] (palabras-mayusculas ["HOLA"])))))
  (testing "mezcla"
    (is (= ["CLOJURE" "TYPESCRIPT"] (into [] (palabras-mayusculas ["clojure" "TypeScript"])))))
  (testing "lista vacía"
    (is (= [] (into [] (palabras-mayusculas [])))))
  (testing "con tildes y caracteres especiales"
    (is (= ["PROGRAMACION"] (into [] (palabras-mayusculas ["programacion"]))))))

;; ── CLJ-10: suma-cuadrados-pares ─────────────────────────────────────────────

(deftest test-suma-cuadrados-pares
  (testing "caso básico [1 2 3 4 5] => 2²+4² = 4+16 = 20"
    (is (= 20 (suma-cuadrados-pares [1 2 3 4 5]))))
  (testing "sin pares → 0"
    (is (= 0 (suma-cuadrados-pares [1 3 5]))))
  (testing "todos pares"
    (is (= 4 (suma-cuadrados-pares [2]))))   ;; 2² = 4
  (testing "lista vacía → 0"
    (is (= 0 (suma-cuadrados-pares []))))
  (testing "[2 4 6] => 4+16+36 = 56"
    (is (= 56 (suma-cuadrados-pares [2 4 6])))))

;; ── CLJ-11: aplanar-listas ───────────────────────────────────────────────────

(deftest test-aplanar-listas
  (testing "aplana tres sub-listas"
    (is (= [1 2 3 4 5] (into [] (aplanar-listas [[1 2] [3 4] [5]])))))
  (testing "sub-listas vacías"
    (is (= [1 3] (into [] (aplanar-listas [[] [1] [] [3]])))))
  (testing "lista vacía → secuencia vacía"
    (is (= [] (into [] (aplanar-listas [])))))
  (testing "un solo sub-array"
    (is (= [1 2 3] (into [] (aplanar-listas [[1 2 3]])))))
  (testing "orden preservado"
    (is (= [3 1 4 1 5] (into [] (aplanar-listas [[3 1] [4 1] [5]]))))))
