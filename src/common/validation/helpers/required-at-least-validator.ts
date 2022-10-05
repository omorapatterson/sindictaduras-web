import { AbstractControl, ValidatorFn, Validators, UntypedFormGroup } from '@angular/forms';

export function requiredAtLeast(amount = 1): ValidatorFn {
    return (formGroup: UntypedFormGroup): { [key: string]: any } => {
      const controls = Object.keys(formGroup.controls || {});

      const isValid = controls.filter(ctrlName => {
        const ctrl = formGroup.get(ctrlName);
        return ctrl.value ? true : false ;
      }).length >= amount;

      return isValid ? null : { requiredAtLeast: true };
    };
}
