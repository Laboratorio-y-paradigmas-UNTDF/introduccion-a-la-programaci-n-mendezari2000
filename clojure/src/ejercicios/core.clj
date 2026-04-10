(ns ejercicios.core
  (:require [clojure.string :as str]))

;; ================================================================
;; TP 03 — Programación Funcional con Clojure
;; Paradigmas y Lenguajes de Programación 2026 — UNTDF/IDEI
;; ================================================================
;;
;; Implementá cada función reemplazando el (throw ...) con tu solución.
;; NO modificar los nombres de las funciones ni sus aridades.
;; Estilo puramente funcional: sin def mutable, sin loop/recur donde
;; el enunciado pide recursión, sin efectos colaterales.
;; ================================================================

;; ─── GRUPO 1: Funciones básicas y listas ────────────────────────

(defn contar-pares
  "CLJ-01: Cuenta cuántos números pares hay en coll.
   Usar filter + count. Sin loops imperativos.

   (contar-pares [1 2 3 4 5 6]) => 3
   (contar-pares [1 3 5])       => 0
   (contar-pares [])            => 0"
  [coll]
  (count (filter even? coll)))

(defn suma-lista
  "CLJ-02: Suma todos los elementos de coll usando reduce.
   Sin loops. Sin variables mutables.
   Array vacío => 0.

   (suma-lista [1 2 3 4 5]) => 15
   (suma-lista [])          => 0"
  [coll]
  (reduce + 0 coll))

(defn invertir-lista
  "CLJ-03: Invierte coll usando reduce.
   SIN usar reverse ni rseq. SIN loop.
   Retorna una secuencia con los elementos en orden inverso.

   (invertir-lista [1 2 3]) => (3 2 1)
   (invertir-lista [])      => ()"
  [coll]
  (reduce conj '() coll))

(defn maximo-lista
  "CLJ-04: Retorna el máximo de coll usando reduce.
   SIN usar la función max de Clojure ni sort.
   Asumir que coll tiene al menos un elemento.

   (maximo-lista [3 1 4 1 5 9 2 6]) => 9
   (maximo-lista [-5 -1 -3])        => -1"
  [coll]
  (reduce (fn [acc x]
            (if (> x acc) x acc))
          (first coll)
          coll))

(defn rango-lista
  "CLJ-05: Retorna {:min <min> :max <max> :rango <max-min>}.
   Usar reduce para calcular min y max en un solo recorrido.
   Asumir que coll no está vacía.

   (rango-lista [3 1 4 1 5 9]) => {:min 1 :max 9 :rango 8}"
  [coll]
  (let [primer-elemento (first coll)
        stats (reduce (fn [acc x]
                        (let [nuevo-min (min (:min acc) x)
                              nuevo-max (max (:max acc) x)]
                          {:min nuevo-min :max nuevo-max}))
                      {:min primer-elemento :max primer-elemento}
                      coll)]
    (assoc stats :rango (- (:max stats) (:min stats)))))


;; ─── GRUPO 2: map / filter / reduce ─────────────────────────────

(defn doblar
  "CLJ-06: Dobla cada elemento de coll usando map. Sin loops.

   (doblar [1 2 3]) => (2 4 6)
   (doblar [])      => ()"
  [coll]
  (map #(* 2 %) coll))

(defn solo-positivos
  "CLJ-07: Retorna solo los elementos estrictamente mayores a 0. Usar filter.

   (solo-positivos [-2 -1 0 1 2 3]) => (1 2 3)
   (solo-positivos [-1 -2])         => ()"
  [coll]
  (filter (fn [x] (> x 0)) coll))

(defn producto-lista
  "CLJ-08: Producto de todos los elementos usando reduce.
   Asumir que coll no está vacía.

   (producto-lista [1 2 3 4 5]) => 120
   (producto-lista [7])         => 7"
  [coll]
  (reduce * coll))

(defn palabras-mayusculas
  "CLJ-09: Convierte cada string a mayúsculas usando map y clojure.string/upper-case.

   (palabras-mayusculas [\"hola\" \"mundo\"]) => (\"HOLA\" \"MUNDO\")
   (palabras-mayusculas [])               => ()"
  [palabras]
  (map str/upper-case palabras))

(defn suma-cuadrados-pares
  "CLJ-10: Pipeline: filtrar pares → elevar al cuadrado → sumar.
   En una sola expresión encadenada con ->> o equivalente.

   (suma-cuadrados-pares [1 2 3 4 5]) => 4+16 = 20
   (suma-cuadrados-pares [1 3 5])     => 0"
  [coll]
  (->> coll
       (filter even?) ; paso 1: filtrar pares
       (map #(* % %)) ; paso 2: elevar cada numero al cuadrado
       (reduce + 0))) ; paso 3: sumar los cuadrados, con 0 como valor inicial para el caso de lista vacía

(defn aplanar-listas
  "CLJ-11: Aplana lista de listas con mapcat.
   (equivalente a flatMap en TypeScript)

   (aplanar-listas [[1 2] [3 4] [5]]) => (1 2 3 4 5)
   (aplanar-listas [[] [1] []])       => (1)"
  [listas]
  (mapcat identity listas))

;; ─── GRUPO 3: Funciones de Orden Superior ────────────────────────

(defn mi-map
  "CLJ-12: Implementar map propio usando RECURSIÓN. SIN usar map.
   Retorna una lista con f aplicada a cada elemento de coll.

   (mi-map inc [1 2 3])         => (2 3 4)
   (mi-map #(* % 2) [1 2 3 4]) => (2 4 6 8)
   (mi-map inc [])              => ()"
  [f coll]
  (if (empty? coll)
    () ; paso base: lista vacía retorna lista vacía
    (cons (f (first coll)) ; aplicar f al primer elemento y luego recursivamente al resto
      (mi-map f (rest coll))))) ; llamada recursiva con el resto de la lista

(defn mi-filter
  "CLJ-13: Implementar filter propio usando RECURSIÓN. SIN usar filter.
   Retorna una lista con los elementos de coll que satisfacen pred.

   (mi-filter even? [1 2 3 4 5]) => (2 4)
   (mi-filter pos? [-1 0 1 2])   => (1 2)
   (mi-filter even? [])          => ()"
  [pred coll]
  (if (empty? coll)
    ()
    (let [primero (first coll)
          resto (rest coll)]
      (if (pred primero)
        (cons primero (mi-filter pred resto))
        (mi-filter pred resto)))))

(defn componer
  "CLJ-14: Composición de dos funciones.
   Retorna una función h tal que (h x) = (f (g x)).
   g se aplica PRIMERO, luego f.

   ((componer inc #(* % 2)) 3) => 7  ;; doble(3)=6, luego inc(6)=7
   ((componer str inc) 5)      => \"6\""
  [f g] ; la función componer toma dos funciones f y g como argumentos
  (fn [x] ; retorna una función anónima que toma un argumento x  
    (f (g x)))) ; aplica g a x y luego f al resultado de g 

(defn aplicar-n-veces
  "CLJ-15: Aplica f exactamente n veces sobre x usando recursión.

   (aplicar-n-veces inc 3 0)        => 3  ;; 0→1→2→3
   (aplicar-n-veces #(* % 2) 4 1)   => 16 ;; 1→2→4→8→16
   (aplicar-n-veces inc 0 42)       => 42 ;; 0 veces, retorna x"
  [f n x] ; la función aplicar-n-veces toma una función f, un número n y un valor x
  (if (zero? n) ; si n es 0, no aplicamos f y retornamos
    x ; caso base: si n es 0, retorna x sin aplicar f
    (recur f (dec n) (f x)))) ; caso recursivo: aplica f a x y decrementa n

(defn contar-con
  "CLJ-16: Cuenta cuántos elementos de coll satisfacen pred.

   (contar-con even? [1 2 3 4 5 6]) => 3
   (contar-con pos? [-1 -2 -3])     => 0
   (contar-con any? [])             => 0"
  [pred coll]
  (->> coll ; toma la colección coll
       (filter pred) ; filtra los elementos que satisfacen pred
       (count))) ; cuenta cuántos elementos quedaron después del filtro

;; ─── GRUPO 4: Recursión ──────────────────────────────────────────

(defn factorial
  "CLJ-17: Factorial recursivo puro. Sin loops. Sin acumulador mutable.
   factorial(0) = 1
   factorial(n) = n * factorial(n-1)

   (factorial 0) => 1
   (factorial 5) => 120
   (factorial 10) => 3628800"
  [n]
  (if (zero? n) ; caso base: factorial de 0 es 1
    1 ; caso base: si n es 0, retorna 1 
    (* n (factorial (dec n))))) ; caso recursivo: n * factorial de n-1

(defn fibonacci-clj
  "CLJ-18: Fibonacci recursivo.
   fibonacci(0) = 0, fibonacci(1) = 1, fibonacci(n) = fib(n-1) + fib(n-2)
   Se puede usar loop/recur para n grandes, pero la lógica debe ser funcional.

   (fibonacci-clj 0)  => 0
   (fibonacci-clj 10) => 55
   (fibonacci-clj 15) => 610"
  [n]
  (loop [a 0 b 1 i n] ; inicializamos a=0 (fib(0)), b=1 (fib(1)) y i=n
    (if (zero? i) ; si i es 0, hemos llegado a fib(n)
      a ; retornamos a que es fib(n)
      (recur b (+ a b) (dec i))))) ; actualizamos a=b, b=a+b y decrementamos i

(defn aplanar-profundo
  "CLJ-19: Aplana una estructura anidada arbitrariamente profunda con recursión.
   No usar la función flatten de Clojure directamente — implementar con recursión.

   (aplanar-profundo [1 [2 [3 [4]]] 5])   => (1 2 3 4 5)
   (aplanar-profundo [[1 2] [3 [4 [5]]]]) => (1 2 3 4 5)
   (aplanar-profundo [])                  => ()"
  [coll]
  (if (coll? coll) ; si coll es una colección, necesitamos aplanarla
    (mapcat aplanar-profundo coll) ; aplicamos recursivamente a cada elemento y concatenamos los resultados 
    (list coll))) ; si no es una colección, lo convertimos en una lista para mantener la consistencia del tipo de retorno

(defn potencia
  "CLJ-20: Eleva base a exp (entero no negativo) con recursión.
   SIN usar Math/pow. SIN loops.
   potencia(base, 0) = 1
   potencia(base, n) = base * potencia(base, n-1)

   (potencia 2 10)  => 1024
   (potencia 3 3)   => 27
   (potencia 5 0)   => 1"
  [base exp]
  (if (zero? exp) ; caso base: cualquier número elevado a 0 es 1
    1 ; caso base: retorna 1 si exp es 0
    (* base (potencia base (dec exp))))) ; caso recursivo: base * potencia de base a exp-1

;; ─── GRUPO 5: Colecciones y mapas ────────────────────────────────

(defn frecuencias-manual
  "CLJ-21: Cuenta frecuencia de cada elemento usando reduce (SIN frequencies).
   Retorna un mapa {elemento -> cantidad}.

   (frecuencias-manual [1 1 2 3 1]) => {1 3, 2 1, 3 1}
   (frecuencias-manual [:a :b :a]) => {:a 2, :b 1}
   (frecuencias-manual [])         => {}"
  [coll]
  (reduce (fn [acc x] ; función reductora que toma el acumulador acc y el elemento x de la colección 
            (update acc x (fnil inc 0))) ; actualiza el conteo de x en el mapa acc, si x no existe lo inicializa en 0 antes de incrementar 
          {} ; valor inicial del acumulador es un mapa vacío {} 
          coll)) ; comenzamos con un mapa vacío y reducimos sobre coll

(defn agrupar-por-tipo
  "CLJ-22: Agrupa vector de mapas {:nombre :tipo} por valor de :tipo.
   SIN usar group-by. Usar reduce.
   Retorna mapa {tipo -> [lista de mapas]}.

   (agrupar-por-tipo [{:nombre \"A\" :tipo \"X\"}
                      {:nombre \"B\" :tipo \"X\"}
                      {:nombre \"C\" :tipo \"Y\"}])
   => {\"X\" [{:nombre \"A\" :tipo \"X\"} {:nombre \"B\" :tipo \"X\"}],
       \"Y\" [{:nombre \"C\" :tipo \"Y\"}]}"
  [registros]
  (reduce (fn [acc registro] ; función reductora que toma el acumulador acc y el registro actual
            (let [tipoB (:tipo registro)] ; extraemos el tipo del registro
              (update acc tipoB (fnil conj []) registro))) ; actualizamos el mapa acc agrupando por tipo, si el tipo no existe lo inicializamos con una lista vacía antes de agregar el registro
          {} ; valor inicial del acumulador es un mapa vacío {}
          registros)) ; comenzamos con un mapa vacío y reducimos sobre registros

(defn aplicar-descuento
  "CLJ-23: Aplica exactamente 10% de descuento a :precio de cada mapa.
   SIN mutar los mapas originales. Usar map + assoc.
   El precio descontado debe ser (:precio * 0.9).

   (aplicar-descuento [{:nombre \"A\" :precio 100}
                       {:nombre \"B\" :precio 200}])
   => ({:nombre \"A\" :precio 90.0} {:nombre \"B\" :precio 180.0})"
  [productos]
  (map (fn [producto] ; función que toma un producto y retorna una versión con descuento aplicado
         (let [precioDescontado (* (:precio producto) 0.9)] ; calcula el precio con descuento
           (assoc producto :precio precioDescontado))) ; retorna un nuevo mapa con el precio actualizado, sin mutar el original
       productos)) ; aplicamos esta función a cada producto en la lista

(defn zip-listas
  "CLJ-24: Combina dos listas en pares usando map.
   Las listas deben tener la misma longitud.
   Retorna secuencia de vectores [elem1 elem2].

   (zip-listas [1 2 3] [:a :b :c]) => ([1 :a] [2 :b] [3 :c])
   (zip-listas [] [])              => ()"
  [lista1 lista2]
  (map vector lista1 lista2)) ; la función vector toma dos argumentos y los combina en un vector, map lo aplica a cada par de elementos de lista1 y lista2

(defn pipeline-estudiantes
  "CLJ-25: Pipeline funcional completo.
   Dado vector de mapas {:nombre :nota}:
     1. Filtrar aprobados (nota >= 6)
     2. Ordenar por nota DESCENDENTE
     3. Retornar solo los nombres (vector de strings)

   (pipeline-estudiantes [{:nombre \"Ana\"   :nota 8}
                          {:nombre \"Beto\"  :nota 4}
                          {:nombre \"Carla\" :nota 6}
                          {:nombre \"Diana\" :nota 9}])
   => [\"Diana\" \"Ana\" \"Carla\"]

   (pipeline-estudiantes [{:nombre \"Beto\" :nota 3}]) => []"
  [estudiantes]
  (->> estudiantes
       (filter (fn [e] (>= (:nota e) 6))) ; paso 1: filtrar aprobados
       (sort-by :nota >) ; paso 2: ordenar por nota descendente
       (map :nombre) ; paso 3: extraer solo los nombres
       (vec))) ; convertir a vector para el formato de salida esperado