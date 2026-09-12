interface Printer{
  print(document: string): void
}

interface Scanner{
  scan(document: string): void
}

interface Fax{
  fax(document: string): void
}


class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }
}

new SimplePrinter().print("tarea.txt");
