import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (value == null) {
      return null;
    }

    const hasCorrectLength = value.length === 12;
    const startsWith2Letters = RegExp('^[a-zA-Z]{2}').test(value);

    const isValid = hasCorrectLength && startsWith2Letters;

    return isValid ? null : { isinInvalid: true };
  };
}
