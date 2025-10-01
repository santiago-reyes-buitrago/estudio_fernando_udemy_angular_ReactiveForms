import {FormUtils} from '../form-utils';

export const errorsObject: Record<string, Function> = {
  'minlength': (errors:any) => `Este Campo requiere un minimo de ${errors['minlength'].requiredLength} caracteres`,
  'min': (errors:any) => `Este Campo requiere un minimo de ${errors['min'].min}`,
  'required': (errors:any) => `Este campo es requerido`,
  'email': (errors:any) => `Este campo deber ser un email valido`,
  'pattern': (errors:any) => errors['pattern']['requiredPattern'] === FormUtils.emailPattern ? 'Este campo deber ser un email valido' : 'Este campo debe tener un formato valido',
  'emailTaken': (errors:any) => `Este correo electronico ya esta en uso`,
  'userForbidden': (errors:any) => `Este usuario no esta permitido por politicas de seguridad`,
}
