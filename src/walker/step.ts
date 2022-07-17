export enum StepType {
  INVALID,
  LETTER,
  BLANK = ' ',
  START = '@',
  HORIZONTAL = '-',
  VERTICAL = '|',
  TURN = '+',
  END = 'x',
}

export class Step {
  readonly type: StepType;

  constructor(readonly value: string) {
    this.type = Step.getStepType(this.value);
  }

  private static getStepType(value: string) {
    switch (value) {
      case StepType.BLANK:
      case StepType.START:
      case StepType.HORIZONTAL:
      case StepType.VERTICAL:
      case StepType.TURN:
      case StepType.END:
        return value;
      default:
        if (value.length === 1 && value.charAt(0).match(/[A-Z]/)) {
          return StepType.LETTER;
        }
    }
    return StepType.INVALID;
  }

  get canStepOn() {
    return [
      StepType.HORIZONTAL,
      StepType.VERTICAL,
      StepType.TURN,
      StepType.LETTER,
      StepType.END,
    ].includes(this.type);
  }
}
