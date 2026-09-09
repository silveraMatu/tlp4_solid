class EmailSender {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

class OrderService {
  createOrder(customerEmail: string): void {
    console.log("Pedido creado");

    const emailSender = new EmailSender();
    emailSender.send(customerEmail, "Tu pedido fue creado");
  }
}

new OrderService().createOrder("ana@example.com");
