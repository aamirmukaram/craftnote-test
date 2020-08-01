import {FormControl} from '@angular/forms';

export class CustomValidators {
  static upperCase(totalUpperCaseRequired: number): (control: FormControl) => null | { uppercase: boolean } {
    return (control: FormControl): null | { uppercase: boolean } => {
      const value: string = control.value || '';

      const totalUpperCaseChars = value
        .split('')
        .map((v: string) => v.charCodeAt(0) >= 'A'.charCodeAt(0) && v.charCodeAt(0) <= 'Z'.charCodeAt(0))
        .filter(Boolean)
        .length;
      return totalUpperCaseChars >= totalUpperCaseRequired || value.length === 0 ? null : {uppercase: true};
    };
  }

  static lowerCase(totalLowerCaseRequired: number): (control: FormControl) => null | { lowercase: boolean } {
    return (control: FormControl): null | { lowercase: boolean } => {
      const value: string = control.value || '';

      const totalLowerCaseChars = value
        .split('')
        .map((v: string) => v.charCodeAt(0) >= 'a'.charCodeAt(0) && v.charCodeAt(0) <= 'z'.charCodeAt(0))
        .filter(Boolean)
        .length;
      return totalLowerCaseChars >= totalLowerCaseRequired || value.length === 0 ? null : {lowercase: true};
    };
  }

  static numbers(totalNumberRequired: number): (control: FormControl) => null | { numbers: boolean } {
    return (control: FormControl): null | { numbers: boolean } => {
      const value: string = control.value || '';

      const totalNumbers = value.replace(/[^0-9]/g, '').length;
      return totalNumbers >= totalNumberRequired || value.length === 0 ? null : {numbers: true};
    };
  }
}
