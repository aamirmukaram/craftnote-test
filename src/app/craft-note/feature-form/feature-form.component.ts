import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Feature} from '../interfaces/feature';
import {FormControlBase, FormElementType} from '../../shared/generic-form/form-helpers/form-control-base';
import {TextboxControl} from '../../shared/generic-form/form-helpers/textbox-control';
import {toFormGroup} from '../../shared/generic-form/form-helpers/to-form-group';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss']
})
export class FeatureFormComponent {
  featureForm: FormControlBase<string | null>[] = [
    new TextboxControl({
      type: FormElementType.TEXT,
      key: 'featureName',
      value: '',
      label: 'Enter feature name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Feature name is required',
      }
    }),
    new TextboxControl({
      type: FormElementType.NUMBER,
      key: 'importance',
      value: null,
      label: 'Enter importance',
      validators: [Validators.required],
      errorMessages: {
        required: 'Importance is required',
      }
    }),
    new TextboxControl({
      type: FormElementType.NUMBER,
      key: 'quantity',
      value: null,
      label: 'Enter quantity',
      validators: [Validators.required],
      errorMessages: {
        required: 'Quantity is required',
      }
    }),
  ];
  featuresFormGroup: FormGroup = toFormGroup<string | null>(this.featureForm);

  @Output()
  addFeature: EventEmitter<Feature> = new EventEmitter<Feature>();


  onFormSubmit(featureFormGroup: FormGroup): void {
    this.addFeature.emit(featureFormGroup.value);
  }
}
