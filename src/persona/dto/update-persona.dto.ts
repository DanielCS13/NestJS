//Update persona dto like update-user.dto.ts
export class UpdatePersonaDto {
  cPerApellido?: string;
  cPerNombre?: string;
  cPerDireccion?: string;
  cPerFecNac?: Date;
  nPerEdad?: number;
  nPerSueldo?: number;
  cPerRnd?: string;
  cPerEstado?: string;
  remember_token?: string;
}
