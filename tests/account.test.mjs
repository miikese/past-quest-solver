import test from 'node:test';
import assert from 'node:assert/strict';
import { loadAccountHistory, signOutAccount } from '../src/lib/account.mjs';

test('a returned authentication error stops the account query', async () => {
  const error = new Error('expired session');
  await assert.rejects(loadAccountHistory({ auth: { getUser: async () => ({ error }) }, from: () => assert.fail('queried without authentication') }), error);
});
test('signed out visitors do not query private history', async () => {
  assert.deepEqual(await loadAccountHistory({ auth: { getUser: async () => ({ data: { user: null } }) }, from: () => assert.fail('queried private history') }), { user: null, answers: [] });
});
test('history failures are not represented as an empty successful history', async () => {
  const error = new Error('history unavailable');
  const client = { auth: { getUser: async () => ({ data: { user: { id: 'learner-1' } } }) }, from: () => ({ select: () => ({ eq: async () => ({ error }) }) }) };
  await assert.rejects(loadAccountHistory(client), error);
});
test('private history query uses the authenticated identity', async () => {
  const user = { id: 'learner-1' };
  const answers = [{ id: 'response-1', subject: 'Physics' }];
  const client = { auth: { getUser: async () => ({ data: { user } }) }, from: table => {
    assert.equal(table, 'user_answers');
    return { select: columns => { assert.equal(columns, 'id, subject'); return { eq: async (column, id) => {
      assert.equal(column, 'user_id'); assert.equal(id, user.id); return { data: answers };
    } }; } };
  } };
  assert.deepEqual(await loadAccountHistory(client), { user, answers });
});
test('returned sign out failures do not report success', async () => {
  const error = new Error('offline');
  await assert.rejects(signOutAccount({ auth: { signOut: async () => ({ error }) } }), error);
  await signOutAccount({ auth: { signOut: async () => ({ error: null }) } });
});
