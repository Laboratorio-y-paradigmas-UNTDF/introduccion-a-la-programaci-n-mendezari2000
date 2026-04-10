(ns ejercicios.grupo4-test
  (:require [clojure.test :refer [deftest testing is]]
            [ejercicios.core :refer [factorial fibonacci-clj
                                     aplanar-profundo potencia]]))

;; ── CLJ-17: factorial ────────────────────────────────────────────────────────

(deftest test-factorial
  (testing "factorial de 0 = 1"
    (is (= 1 (factorial 0))))
  (testing "factorial de 1 = 1"
    (is (= 1 (factorial 1))))
  (testing "factorial de 5 = 120"
    (is (= 120 (factorial 5))))
  (testing "factorial de 10 = 3628800"
    (is (= 3628800 (factorial 10))))
  (testing "factorial de 12 = 479001600"
    (is (= 479001600 (factorial 12)))))

;; ── CLJ-18: fibonacci-clj ────────────────────────────────────────────────────

(deftest test-fibonacci-clj
  (testing "fibonacci(0) = 0"
    (is (= 0 (fibonacci-clj 0))))
  (testing "fibonacci(1) = 1"
    (is (= 1 (fibonacci-clj 1))))
  (testing "fibonacci(2) = 1"
    (is (= 1 (fibonacci-clj 2))))
  (testing "fibonacci(5) = 5"
    (is (= 5 (fibonacci-clj 5))))
  (testing "fibonacci(10) = 55"
    (is (= 55 (fibonacci-clj 10))))
  (testing "fibonacci(15) = 610"
    (is (= 610 (fibonacci-clj 15)))))

;; ── CLJ-19: aplanar-profundo ─────────────────────────────────────────────────

(deftest test-aplanar-profundo
  (testing "un nivel de anidamiento"
    (is (= [1 2 3 4] (into [] (aplanar-profundo [[1 2] [3 4]])))))
  (testing "múltiples niveles"
    (is (= [1 2 3 4 5] (into [] (aplanar-profundo [1 [2 [3 [4]]] 5])))))
  (testing "lista vacía"
    (is (= [] (into [] (aplanar-profundo [])))))
  (testing "sin anidamiento — retorna los elementos tal cual"
    (is (= [1 2 3] (into [] (aplanar-profundo [1 2 3])))))
  (testing "profundamente anidado"
    (is (= [1 2 3 4 5] (into [] (aplanar-profundo [[1 2] [3 [4 [5]]]])))))
  (testing "orden preservado"
    (is (= [1 2 3 4 5 6] (into [] (aplanar-profundo [[1 [2 3]] [4 [5 6]]]))))))

;; ── CLJ-20: potencia ─────────────────────────────────────────────────────────

(deftest test-potencia
  (testing "cualquier base a la 0 = 1"
    (is (= 1 (potencia 5 0))))
  (testing "base a la 1 = base"
    (is (= 7 (potencia 7 1))))
  (testing "2 elevado a la 10 = 1024"
    (is (= 1024 (potencia 2 10))))
  (testing "3 elevado a la 3 = 27"
    (is (= 27 (potencia 3 3))))
  (testing "base negativa — exponente par → positivo"
    (is (= 4 (potencia -2 2))))
  (testing "uno elevado a cualquier potencia = 1"
    (is (= 1 (potencia 1 100)))))
