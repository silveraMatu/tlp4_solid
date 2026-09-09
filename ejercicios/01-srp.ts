interface User {
  username: string;
  email: string;
}

//Interfaces para definir los contratos y la inyeccion de dependencias
interface IUserValidator{
  validarEmail(User: User): boolean | void
}

interface IUserRepository{
  users: User[]

  register({username, email}:User): void
}

interface IEmailService{
  sendWelcomeEmail(email: string):void
}

class UserValidator implements IUserValidator{ //Valida el usuario
 public validarEmail(User: User): boolean | void{
    if(!User.email.includes("@")){
      throw new Error("El correo no es valido")
    }
    return true
  }
}

class UserRepository implements IUserRepository{ //Se encarga de guardar el usuario
  public users: User[] = [];

  public register({username, email}: User): void {
    this.users.push({ username, email});
  }
}

class EmailService implements IEmailService{ //Ahora EmailManager se encarga de los envios de emails de bienvenida
  
  public sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

class UserRegistrationService { //Orquestador

  constructor(
    private userValidator: IUserValidator,
    private userRepository : IUserRepository,
    private emailService: IEmailService) 
    {

    }

  Register(username: string, email: string){
    this.userValidator.validarEmail({username, email})
    this.userRepository.register({username, email})
    this.emailService.sendWelcomeEmail(email)
  }
}

const userValidator =  new UserValidator()
const userRepository =  new UserRepository()
const emailService = new EmailService()
const userRegistrationService = new UserRegistrationService(userValidator, userRepository, emailService) //Inyeccion de dependencias


try {
  userRegistrationService.Register("Coker", "matusilvera808@gmail.com")
  console.log(userRepository.users);
} catch (error: any) {
  console.log(error.message)
}