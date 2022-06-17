export const update_like = async (userid, like) => {
  const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `
    mutation MyMutation( $userid: Int,$like:Int) {
      update_voice(where: { id: {_eq: $userid}}, _set: {like:$like }) {
        returning {
          id
          like
        }
      }
    }
    `,
      variables: {
        userid,
        like,
      },
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};
