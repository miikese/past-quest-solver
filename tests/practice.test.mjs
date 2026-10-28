import test from 'node:test';
import assert from 'node:assert/strict';
import { selectPracticeQuestions, summarizePractice } from '../src/lib/practice.mjs';
const questions = Array.from({ length: 24 }, (_, id) => ({ id, subject: id % 2 ? 'Physics' : 'Mathematics' }));
test('subject sessions only contain the requested subject and leave the bank untouched', () => {
  const before = JSON.stringify(questions);
  const result = selectPracticeQuestions(questions, ' mathematics ', () => 0.4);
  assert.equal(result.length, 10);
  assert.ok(result.every(question => question.subject === 'Mathematics'));
  assert.equal(new Set(result.map(question => question.id)).size, 10);
  assert.equal(JSON.stringify(questions), before);
});
test('unknown subjects yield an empty session rather than unrelated questions', () => {
  assert.deepEqual(selectPracticeQuestions(questions, 'Unknown'), []);
});
test('small subjects do not duplicate questions', () => {
  assert.equal(selectPracticeQuestions(questions.slice(0, 3)).length, 3);
});
test('self-assessment summary distinguishes reviewed material from verified scores', () => {
  assert.deepEqual(summarizePractice([{ understood: true }, { understood: false }]), { total: 2, understood: 1, revisit: 1 });
  assert.deepEqual(summarizePractice([]), { total: 0, understood: 0, revisit: 0 });
});

test('blank subject input includes the mixed bank', () => {
  assert.equal(selectPracticeQuestions(questions, '   ', () => 0.4).length, 10);
});
