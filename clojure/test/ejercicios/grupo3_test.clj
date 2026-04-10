(ns ejercicios.grupo3-test
  (:require [clojure.test :refer [deftest testing is]]
            [ejercicios.core :refer [mi-map mi-filter componer
                                     aplicar-n-veces contar-con]]))

;; ── CLJ-12: mi-map ───────────────────────────────────────────────────────────

(deftest test-mi-map
  (testing "aplica inc a cada elemento"
    (is (= [2 3 4] (into [] (mi-map inc [1 2 3])))))
  (testing "dobla cada elemento"
    (is (= [2 4 6 8] (into [] (mi-map #(* % 2) [1 2 3 4])))))
  (testing "lista vacía → secuencia vacía"
    (is (= [] (into [] (mi-map inc [])))))
  (testing "convierte a string"
    (is (= ["1" "2" "3"] (into [] (mi-map str [1 2 3])))))
  (testing "cuadrado de cada elemento"
    (is (= [1 4 9 16 25] (into [] (mi-map #(* % %) [1 2 3 4 5]))))))

;; ── CLJ-13: mi-filter ────────────────────────────────────────────────────────

(deftest test-mi-filter
  (testing "filtra pares"
    (is (= [2 4] (into [] (mi-filter even? [1 2 3 4 5])))))
  (testing "filtra positivos"
    (is (= [1 2] (into [] (mi-filter pos? [-1 0 1 2])))))
  (testing "ninguno pasa el filtro"
    (is (= [] (into [] (mi-filter even? [1 3 5])))))
  (testing "todos pasan el filtro"
    (is (= [2 4 6] (into [] (mi-filter even? [2 4 6])))))
  (testing "lista vacía → secuencia vacía"
    (is (= [] (into [] (mi-filter even? []))))))

;; ── CLJ-14: componer ─────────────────────────────────────────────────────────

(deftest test-componer
  (testing "doble luego inc — g se aplica primero"
    ;; doble(3)=6, inc(6)=7
    (is (= 7 ((componer inc #(* % 2)) 3))))
  (testing "inc luego doble — nota el orden"
    ;; inc(3)=4, doble(4)=8
    (is (= 8 ((componer #(* % 2) inc) 3))))
  (testing "retorna una función"
    (is (fn? (componer inc inc))))
  (testing "con str e inc"
    (is (= "6" ((componer str inc) 5))))
  (testing "composición de tres vía dos componer"
    ;; (componer (componer f g) h)(x) = f(g(h(x)))
    (let [triple-comp (componer (componer inc inc) inc)]
      (is (= 13 (triple-comp 10))))))

;; ── CLJ-15: aplicar-n-veces ──────────────────────────────────────────────────

(deftest test-aplicar-n-veces
  (testing "0 veces → retorna x sin cambios"
    (is (= 42 (aplicar-n-veces inc 0 42))))
  (testing "1 vez"
    (is (= 1 (aplicar-n-veces inc 1 0))))
  (testing "3 veces inc desde 0"
    (is (= 3 (aplicar-n-veces inc 3 0))))
  (testing "4 veces doble desde 1 → 1→2→4→8→16"
    (is (= 16 (aplicar-n-veces #(* % 2) 4 1))))
  (testing "5 veces cuadrado desde 2 → 2→4→16→256→65536→4294967296"
    (is (= 4294967296N (aplicar-n-veces #(* % %) 5 2)))))

;; ── CLJ-16: contar-con ───────────────────────────────────────────────────────

(deftest test-contar-con
  (testing "cuenta pares"
    (is (= 3 (contar-con even? [1 2 3 4 5 6]))))
  (testing "ninguno satisface"
    (is (= 0 (contar-con neg? [1 2 3]))))
  (testing "todos satisfacen"
    (is (= 4 (contar-con pos? [1 2 3 4]))))
  (testing "lista vacía → 0"
    (is (= 0 (contar-con even? []))))
  (testing "cuenta mayores a 5"
    (is (= 3 (contar-con #(> % 5) [3 6 7 1 8])))))
