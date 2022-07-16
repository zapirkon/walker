import { Step, StepType } from './step';

describe('Step', () => {

  describe('invalid steps', () => {
    test('too much space', () => {
      const value = ' ';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.BLANK);
      expect(step.canStepOn).toBe(false);
    });

    test('nothing here', () => {
      const value = '';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.INVALID);
      expect(step.canStepOn).toBe(false);
    });

    test('no jumping', () => {
      const value = 'JUMP';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.INVALID);
      expect(step.canStepOn).toBe(false);
    });
  });

  describe('no turning back', () => {
    test('start', () => {
      const value = '@';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.START);
      expect(step.canStepOn).toBe(false);
    });
  });

  describe('walking', () => {
    test('horizontal', () => {
      const value = '-';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.HORIZONTAL);
      expect(step.canStepOn).toBe(true);
    });

    test('vertical', () => {
      const value = '|';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.VERTICAL);
      expect(step.canStepOn).toBe(true);
    });

    test('turn', () => {
      const value = '+';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.TURN);
      expect(step.canStepOn).toBe(true);
    });

    test('end', () => {
      const value = 'x';
      const step = new Step(value);
      expect(step.value).toBe(value);
      expect(step.type).toBe(StepType.END);
      expect(step.canStepOn).toBe(true);
    });
  });

  describe('reading', () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    test('known alphabet', () => {
      for (const letter of letters) {
        const step = new Step(letter);
        expect(step.value).toBe(letter);
        expect(step.type).toBe(StepType.LETTER);
        expect(step.canStepOn).toBe(true);
      }
    });

    test('unknown languages', () => {
      for (const letter of letters.toLowerCase()) {
        const step = new Step(letter);
        expect(step.value).toBe(letter);
        if (letter === 'x') {
          expect(step.type).toBe(StepType.END);
          expect(step.canStepOn).toBe(true);
        } else {
          expect(step.type).toBe(StepType.INVALID);
          expect(step.canStepOn).toBe(false);
        }
      }
    });
  });

});
