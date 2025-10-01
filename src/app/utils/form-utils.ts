import {AbstractControl, FormArray, FormGroup, ValidationErrors} from '@angular/forms';
import {errorsObject} from './constants/errors.constants';

const sleep = async (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms))


export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidFile(fieldName: string,myForm:FormGroup):boolean | null {
    return !!myForm.controls[fieldName].errors && myForm.controls[fieldName].touched;
  }

  static getFieldError(fieldName: string,myForm:FormGroup):string | null {
    if (!myForm.controls[fieldName]) return null;
    const errors = myForm.controls[fieldName].errors ?? {};
    for ( const key of Object.keys(errors)){
      return  typeof errorsObject?.[key] === 'function' ? errorsObject[key](errors) : `Error no controlado: ${key}`;
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
      return typeof errorsObject?.[key] === 'function' ? errorsObject[key](errors) : `Error no controlado`;
    }
    return null;
  }

  static ValidatorConfirmPassword(field:string,field2: string): ValidationErrors | null{
    return (formGroup:AbstractControl) => {
      const fieldValue = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return fieldValue === field2Value ? null:{passwordNotEqual:true};
    }
  }

  static checkingUser(control: AbstractControl): ValidationErrors | null{
    console.log('Validando contra servidor')
    const usersForbbidens = ['strider','jameeeeees','jameeeeees2'];
    const formValue = control.value as string;
    if (usersForbbidens.includes(formValue.toLowerCase())) return {userForbidden:true};
    return null
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    console.log('Validando contra servidor')
    await sleep(2500);
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') return {emailTaken:true};
    return null
  }
}
