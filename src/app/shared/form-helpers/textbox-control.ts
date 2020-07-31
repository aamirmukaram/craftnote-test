import {FormControlBase, FormControlOptions, FormControlType, FormElementType} from './form-control-base';

export class TextboxControl extends FormControlBase<string> {
  controlType: FormControlType = FormControlType.TEXTBOX;

  constructor(private options: FormControlOptions<string>) {
    super(options);
  }
}
