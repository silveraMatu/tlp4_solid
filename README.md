# Actividad Práctica de SOLID con TypeScript

## Objetivos

Al terminar estos ejercicios deberias poder:

- Reconocer problemas comunes en clases y dependencias.
- Explicar con tus palabras cada principio SOLID.
- Separar responsabilidades en clases pequeñas.
- Preferir composicion e interfaces simples antes que jerarquias rigidas.

Agregar un script por cada archivo de `ejercicios/`

- Abri `package.json` y, dentro de `"scripts"`, agrega una linea por cada archivo de la carpeta `ejercicios/`.
- Se puede utilizar `npx` o `node` para ejecutar los scripts.

  ```json
  {
    "scripts": {
      "01-srp": "node ejercicios/01-srp.ts",
      "02-ocp": "node ejercicios/02-ocp.ts",
      "03-lsp": "node ejercicios/03-lsp.ts",
      "04-isp": "node ejercicios/04-isp.ts",
      "05-dip": "node ejercicios/05-dip.ts"
    }
  }
  ```

## Como trabajar cada ejercicio

1. Lee primero el archivo de `ejercicios/`.
2. Ejecuta o compila el ejemplo.
3. Identifica que partes de la clase cambiarian por motivos diferentes.
4. Responde las preguntas de la seccion correspondiente.

Los ejemplos funcionan, pero estan diseñados para mostrar codigo dificil de mantener. Que el programa funcione no significa que este bien diseñado.

---

## 1. SRP: Single Responsibility Principle

### Responsabilidad unica

Una clase debe tener un solo motivo para cambiar. No significa que una clase solo pueda tener un metodo; significa que sus metodos deben pertenecer a la misma responsabilidad.

### Ejercicio

Revisa [`ejercicios/01-srp.ts`](ejercicios/01-srp.ts). La clase `UserManager` registra usuarios, valida datos, guarda informacion y envia correos.

Identificar cada responsabilidad y mover a su propia clase (validacion, almacenamiento, envio de correo). Dejar un servicio de registro que coordine esas clases por composicion y mantenga el mismo comportamiento visible.

Preguntas:

- Que responsabilidades tiene `UserManager`?
- Que ocurre si cambia la forma de guardar datos?
- Que clase podria encargarse de enviar correos?

La solucion separa esas tareas en `UserValidator`, `UserRepository`, `EmailService` y `UserRegistrationService`.

---

## 2. OCP: Open/Closed Principle

### Abierto para extension, cerrado para modificacion

El codigo deberia permitir agregar comportamientos nuevos sin modificar constantemente una clase estable.

### Ejercicio

Revisa [`ejercicios/02-ocp.ts`](ejercicios/02-ocp.ts). Cada nuevo medio de pago obliga a agregar otro `case` dentro de `PaymentProcessor`.

Definir una interfaz comun para los metodos de pago y crear una clase por cada uno (tarjeta, efectivo, transferencia). `PaymentProcessor` debe recibir un medio de pago y delegar en el, sin `switch`, de modo que agregar uno nuevo no lo modifique.

Preguntas:

- Que parte debe modificarse para agregar pago con transferencia?
- Como podriamos representar un medio de pago?
- Que comportamiento comun tienen todos los medios de pago?

La solucion utiliza la interfaz `PaymentMethod` y agrega nuevos metodos de pago mediante nuevas clases.

---

## 3. LSP: Liskov Substitution Principle

### Sustitucion de Liskov

Una subclase debe poder utilizarse en cualquier lugar donde se espera su clase base sin romper las reglas del programa.

### Ejercicio

Revisa [`ejercicios/03-lsp.ts`](ejercicios/03-lsp.ts). `Square` hereda de `Rectangle`, pero cambia el comportamiento esperado de `setWidth` y `setHeight`.

Eliminar la herencia entre `Square` y `Rectangle`. Definir un contrato comun `Shape` con `area()` y modelar cada figura por separado, para que `resizeRectangle` solo dependa de operaciones que toda figura cumple sin sorpresas.

Preguntas:

- Por que el area final no coincide con lo que espera `resizeRectangle`?
- Es siempre correcto modelar un cuadrado como un rectangulo por herencia?
- Que abstraccion comun podriamos usar?

La solucion elimina la herencia incorrecta y modela ambas figuras como objetos que cumplen el contrato `Shape`.

---

## 4. ISP: Interface Segregation Principle

### Segregacion de interfaces

Es mejor tener varias interfaces pequenas y especificas que una interfaz grande que obligue a implementar metodos innecesarios.

### Ejercicio

Revisa [`ejercicios/04-isp.ts`](ejercicios/04-isp.ts). Una impresora sencilla debe implementar `scan` y `fax` aunque solo puede imprimir.

Partir la interfaz `MultifunctionPrinter` en interfaces chicas (`Printer`, `Scanner`, `Fax`). Hacer que `SimplePrinter` implemente solo `Printer`, sin metodos que lancen errores, y deja las demas capacidades para clases que si las necesiten.

Preguntas:

- Que metodo no necesita `SimplePrinter`?
- Que problema causa implementar metodos que lanzan errores?
- Como separar las capacidades de una impresora?

La solucion divide la interfaz en `Printer`, `Scanner` y `Fax`.

---

## 5. DIP: Dependency Inversion Principle

### Inversion de dependencias

Las clases de alto nivel no deberian depender directamente de clases concretas de bajo nivel. Ambas deberian depender de abstracciones.

### Ejercicio

Revisa [`ejercicios/05-dip.ts`](ejercicios/05-dip.ts). `OrderService` crea directamente un `EmailSender`, por lo que no puede cambiar facilmente a SMS ni probarse sin enviar un correo real.

Definir una interfaz `Notifier` con un metodo de envio y haz que `OrderService` la reciba por el constructor en lugar de instanciar `EmailSender`. Crear al menos una implementacion concreta y pasala desde afuera al crear el servicio.

Preguntas:

- Que dependencia concreta crea `OrderService`?
- Como probarias la clase sin enviar un correo?
- Que contrato comun podrian implementar el correo y el SMS?

La solucion recibe una dependencia que cumple la interfaz `Notifier` mediante el constructor.

---
