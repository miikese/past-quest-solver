// Practice answers are self-assessed, never presented as automatically verified.
export function selectPracticeQuestions(questions, subject = '', random = Math.random) {
  const requestedSubject = subject.trim().toLowerCase();
  const pool = questions.filter(question => !requestedSubject || question.subject.toLowerCase() === requestedSubject);
  for (let index = pool.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [pool[index], pool[other]] = [pool[other], pool[index]];
  }
  return pool.slice(0, 10);
}

export function summarizePractice(answers) {
  const understood = answers.filter(answer => answer.understood).length;
  return { total: answers.length, understood, revisit: answers.length - understood };
}
