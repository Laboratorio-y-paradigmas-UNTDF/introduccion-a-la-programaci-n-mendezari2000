(ns ejercicios.grupo5-test
  (:require [clojure.test :refer [deftest testing is]]
            [ejercicios.core :refer [frecuencias-manual agrupar-por-tipo
                                     aplicar-descuento zip-listas
                                     pipeline-estudiantes]]))

;; ── CLJ-21: frecuencias-manual ───────────────────────────────────────────────

(deftest test-frecuencias-manual
  (testing "caso básico"
    (is (= {1 3, 2 1, 3 1} (frecuencias-manual [1 1 2 3 1]))))
  (testing "lista vacía → mapa vacío"
    (is (= {} (frecuencias-manual []))))
  (testing "todos iguales"
    (is (= {5 4} (frecuencias-manual [5 5 5 5]))))
  (testing "todos únicos"
    (is (= {:a 1 :b 1 :c 1} (frecuencias-manual [:a :b :c]))))
  (testing "strings"
    (is (= {"hola" 2 "mundo" 1} (frecuencias-manual ["hola" "mundo" "hola"])))))

;; ── CLJ-22: agrupar-por-tipo ─────────────────────────────────────────────────

(deftest test-agrupar-por-tipo
  (testing "dos tipos distintos"
    (let [registros [{:nombre "A" :tipo "X"}
                     {:nombre "B" :tipo "X"}
                     {:nombre "C" :tipo "Y"}]
          resultado (agrupar-por-tipo registros)]
      (is (= 2 (count (get resultado "X"))))
      (is (= 1 (count (get resultado "Y"))))))
  (testing "todos del mismo tipo"
    (let [registros [{:nombre "A" :tipo "Z"}
                     {:nombre "B" :tipo "Z"}]
          resultado (agrupar-por-tipo registros)]
      (is (= 2 (count (get resultado "Z"))))))
  (testing "lista vacía → mapa vacío"
    (is (= {} (agrupar-por-tipo []))))
  (testing "un solo registro"
    (let [resultado (agrupar-por-tipo [{:nombre "Solo" :tipo "U"}])]
      (is (= 1 (count (get resultado "U"))))))
  (testing "los objetos en los grupos son los originales"
    (let [r {:nombre "A" :tipo "X"}
          resultado (agrupar-por-tipo [r])]
      (is (= r (first (get resultado "X")))))))

;; ── CLJ-23: aplicar-descuento ────────────────────────────────────────────────

(deftest test-aplicar-descuento
  (testing "aplica 10% de descuento"
    (let [resultado (into [] (aplicar-descuento [{:nombre "A" :precio 100}
                                                  {:nombre "B" :precio 200}]))]
      (is (= 90.0 (:precio (first resultado))))
      (is (= 180.0 (:precio (second resultado))))))
  (testing "conserva :nombre"
    (let [resultado (first (aplicar-descuento [{:nombre "Libro" :precio 50}]))]
      (is (= "Libro" (:nombre resultado)))))
  (testing "lista vacía → secuencia vacía"
    (is (= [] (into [] (aplicar-descuento [])))))
  (testing "no muta los mapas originales"
    (let [prod {:nombre "Test" :precio 1000}
          productos [prod]]
      (aplicar-descuento productos)
      (is (= 1000 (:precio prod)))))
  (testing "precio 0 → sigue siendo 0"
    (let [resultado (first (aplicar-descuento [{:nombre "Gratis" :precio 0}]))]
      (is (= 0.0 (:precio resultado))))))

;; ── CLJ-24: zip-listas ───────────────────────────────────────────────────────

(deftest test-zip-listas
  (testing "zip básico"
    (let [resultado (into [] (zip-listas [1 2 3] [:a :b :c]))]
      (is (= 3 (count resultado)))
      (is (= 1 (first (first resultado))))
      (is (= :a (second (first resultado))))))
  (testing "zip de strings"
    (let [resultado (into [] (zip-listas ["x" "y"] [10 20]))]
      (is (= "x" (first (first resultado))))
      (is (= 10 (second (first resultado))))))
  (testing "listas vacías → secuencia vacía"
    (is (= [] (into [] (zip-listas [] [])))))
  (testing "un solo par"
    (let [resultado (into [] (zip-listas [42] [:respuesta]))]
      (is (= 1 (count resultado)))
      (is (= 42 (first (first resultado))))
      (is (= :respuesta (second (first resultado)))))))

;; ── CLJ-25: pipeline-estudiantes ─────────────────────────────────────────────

(deftest test-pipeline-estudiantes
  (testing "caso completo del enunciado"
    (is (= ["Diana" "Ana" "Carla"]
           (pipeline-estudiantes [{:nombre "Ana"   :nota 8}
                                   {:nombre "Beto"  :nota 4}
                                   {:nombre "Carla" :nota 6}
                                   {:nombre "Diana" :nota 9}]))))
  (testing "ningún aprobado → vector vacío"
    (is (= [] (pipeline-estudiantes [{:nombre "Beto" :nota 3}
                                      {:nombre "Ana"  :nota 5}]))))
  (testing "lista vacía → vector vacío"
    (is (= [] (pipeline-estudiantes []))))
  (testing "nota exactamente 6 → aprobado"
    (is (= ["Borde"] (pipeline-estudiantes [{:nombre "Borde" :nota 6}]))))
  (testing "orden descendente por nota"
    (let [resultado (pipeline-estudiantes [{:nombre "B" :nota 7}
                                            {:nombre "A" :nota 9}
                                            {:nombre "C" :nota 8}])]
      (is (= "A" (first resultado)))
      (is (= "C" (second resultado)))
      (is (= "B" (nth resultado 2)))))
  (testing "retorna solo los nombres — no los mapas completos"
    (let [resultado (pipeline-estudiantes [{:nombre "Ana" :nota 8}])]
      (is (string? (first resultado))))))
