import { inject, injectable } from 'tsyringe';
import { Body, Controller, Post, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { InfrastructureDiType } from '../../infrastructure/infrastructure-di-type';
import { Repository } from '../../infrastructure/repositories/Companies.interface';
import { StatusCodes } from 'http-status-codes';
import { AddUserDto, UserDto } from '../../infrastructure/repositories/Users';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
@Route('login')
@Tags('Login')
export class LoginController extends Controller {
  private readonly _tokenExpirationTimeInSeconds = 2 * 60 * 60;

  constructor(
    @inject(InfrastructureDiType.UsersRepository) private readonly _usersRepository: Repository<UserDto, AddUserDto>
  ) {
    super();
  }

  @SuccessResponse(StatusCodes.OK, 'Login')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Post()
  public async login(@Body() body: Partial<UserDto>): Promise<void> {
    const user = await this._usersRepository.getByField!({ username: body.username });

    if (user === null) {
      this.setStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    // @ts-ignore
    const isCorrectPassword = await compare(body.password, user.password);

    if(!isCorrectPassword) {
      return;
    }

    //generate jwt
    const token = jwt.sign({ username: body.username }, 'glass-lewis-super-secret-key', {
      expiresIn: `${this._tokenExpirationTimeInSeconds/60/60}h`
    });

    this.setHeader('set-cookie', `token=${token}; HttpOnly; Max-Age=${this._tokenExpirationTimeInSeconds}`);
  }
}
