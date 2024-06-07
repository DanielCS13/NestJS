export class UpdateUserDto {
  name?: string;
  password?: string;
  email?: string;
  email_verified_at?: Date;
  rememberToken?: string;
  createdAt?: Date;
  authStrategy?: string;
}
