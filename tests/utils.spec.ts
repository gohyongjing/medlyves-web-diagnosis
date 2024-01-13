import { Condition } from '@/app/lib/definitions';
import { rankByRelevance } from '@/app/lib/utils';
import { test, expect } from '@playwright/test';

test('can rank conditions based on number of symptoms', () => {
  const tests: [Condition[], string[]][] = [
    [[], []],
    [[{condition: 'conditionA', symptom: 'symptom1'},
      {condition: 'conditionA', symptom: 'symptom2'}], ['conditionA']],
    [[{condition: 'conditionA', symptom: 'symptom1'},
      {condition: 'conditionB', symptom: 'symptom1'},
      {condition: 'conditionA', symptom: 'symptom2'},
      {condition: 'conditionB', symptom: 'symptom3'},
      {condition: 'conditionB', symptom: 'symptom4'}], ['conditionB', 'conditionA']],
  ];
  for (const [input, output] of tests) {
    expect(rankByRelevance(input)).toEqual(output);
  }
});
