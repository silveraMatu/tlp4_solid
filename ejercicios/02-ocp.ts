type PaymentType = "card" | "cash" | "transfer"; 

interface IpaymentMethod{
  type: PaymentType,
  pay(amount:number): void
}

class CardPaymentProcessor implements IpaymentMethod{
  public type: PaymentType =  "card";
  
  pay(amount: number): void {
    console.log(`Pagando $${amount} con ${this.type}`);
  }
}

class CashPaymentProcessor implements IpaymentMethod{
  public type: PaymentType = "cash"
  pay(amount: number): void {
    console.log(`Pagando $${amount} con ${this.type}`);
  }
}

//Nueva clase de transferencia
class TransferPaymentProccesor implements IpaymentMethod{
  type: PaymentType = "transfer";
  pay(amount: number): void {
    console.log(`Pagando $${amount} con ${this.type}`);
  }
}

class PaymentProccesor{
 constructor(private paymentMethod: IpaymentMethod)
 {}

 pay(amount: number){
  this.paymentMethod.pay(amount)
 }
}

const paymentProccesorTransferencia = new PaymentProccesor(new TransferPaymentProccesor()) //transferncia
const paymentProccesorCard = new PaymentProccesor(new CardPaymentProcessor()) //tarjeta
const paymentProccesorCash = new PaymentProccesor(new CashPaymentProcessor()) //efectivo

paymentProccesorTransferencia.pay(10000)
paymentProccesorCard.pay(10000)
paymentProccesorCash.pay(10000)


