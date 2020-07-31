import {FormControlBase} from './form-control-base';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

export function toFormGroup<T>(controls: FormControlBase<T>[]): FormGroup {
  const group: { [key: string]: AbstractControl } = {};
  controls.forEach(control => {
    group[control.key] = new FormControl(control.value, [...control.validators]);
  });
  return new FormGroup(group);
}
