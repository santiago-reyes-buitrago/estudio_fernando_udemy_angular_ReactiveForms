import {FormGroup} from '@angular/forms';

const errorsObject: Record<string, Function> = {
  'minlength': (errors:any) => `Este Campo requiere un minimo de ${errors['minlength'].requiredLength} caracteres`,
  'min': (errors:any) => `Este Campo requiere un minimo de ${errors['min'].min}`,
  'required': (errors:any) => `Este campo es requerido`
}
export class FormUtils {

  static isValidFile(fieldName: string,myForm:FormGroup):boolean | null {
    return !!myForm.controls[fieldName].errors && myForm.controls[fieldName].touched;
  }

  static getFieldError(fieldName: string,myForm:FormGroup):string | null {
    if (!myForm.controls[fieldName]) return null;
    const errors = myForm.controls[fieldName].errors ?? {};
    for ( const key of Object.keys(errors)){
      return errorsObject[key](errors);
    }
    return null;
  }
}
