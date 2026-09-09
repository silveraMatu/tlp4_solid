interface MultifunctionPrinter {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

class SimplePrinter implements MultifunctionPrinter {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  scan(_document: string): void {
    throw new Error("Esta impresora no puede escanear");
  }

  fax(_document: string): void {
    throw new Error("Esta impresora no puede enviar fax");
  }
}

new SimplePrinter().print("tarea.txt");
