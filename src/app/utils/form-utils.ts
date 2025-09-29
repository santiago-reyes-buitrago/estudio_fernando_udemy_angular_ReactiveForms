import {FormArray, FormGroup} from '@angular/forms';

const errorsObject: Record<string, Function> = {
  'minlength': (errors:any) => `Este Campo requiere un minimo de ${errors['minlength'].requiredLength} caracteres`,
  'min': (errors:any) => `Este Campo requiere un minimo de ${errors['min'].min}`,
  'required': (errors:any) => `Este campo es requerido`,
  'email': (errors:any) => `Este campo deber ser un email valido`
}
export class FormUtils {

  static isValidFile(fieldName: string,myForm:FormGroup):boolean | null {
    console.log(myForm.controls[fieldName]);
    return !!myForm.controls[fieldName].errors && myForm.controls[fieldName].touched;
  }

  static getFieldError(fieldName: string,myForm:FormGroup):string | null {
    if (!myForm.controls[fieldName]) return null;
    console.log(myForm.controls[fieldName]);
    const errors = myForm.controls[fieldName].errors ?? {};
    for ( const key of Object.keys(errors)){
      return errorsObject[key](errors);
    }
    return null;
  }

  static isValidFieldArray(fieldArray: FormArray,index: number) {
    return !!fieldArray.controls[index].errors && fieldArray.controls[index].touched
  }

  static getFieldErrorArray(index: number,fieldArray:FormArray):string | null{
    if (!fieldArray.controls[index]) return null;
    const errors = fieldArray.controls[index].errors ?? {};
    for ( const key of Object.keys(errors)){
      return errorsObject[key](errors);
    }
    return null;
  }
}
