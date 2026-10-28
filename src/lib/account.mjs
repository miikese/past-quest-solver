// Supabase returns many failures as { error }, rather than rejecting the promise.
export async function loadAccountHistory(client) {
  const { data, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  if (!data?.user) return { user: null, answers: [] };
  const { data: answers, error } = await client.from('user_answers').select('id, subject').eq('user_id', data.user.id);
  if (error) throw error;
  return { user: data.user, answers: answers || [] };
}

export async function signOutAccount(client) {
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
