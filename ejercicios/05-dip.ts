class EmailSender {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

interface INotifier {
  send(to: string, message: string): void
}

class Notifier implements INotifier{
  send(to: string, message: string): void {
  }
}

class OrderService {
  constructor(private emailSender: INotifier){}

  createOrder(customerEmail: string): void {
    console.log("Pedido creado");

    this.emailSender.send(customerEmail, "Tu pedido fue creado");
  }
}

new OrderService(new Notifier()).createOrder("susana@gmail.com");
