interface Shape{
  area(): number
}

class Rectangle implements Shape {
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(protected side: number) {}

  setSide(side: number){
    this.side = side
  }

  area(): number {
    return this.side * this.side;
  }
}

function resizeRectangle(rectangle: Rectangle): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Area esperada: 50. Area obtenida: ${rectangle.area()}`);
}

resizeRectangle(new Rectangle(1, 1));
resizeRectangle(new Square(1, 1));
