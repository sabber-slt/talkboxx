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
export const faSearch = async (title) => {
  const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `
      query MyQuery($title: String) {
        faJson(distinct_on: id, where: {title: {_regex: $title}}) {
          author
          categories
          content
          description
          enclosure
          guid
          id
          link
          title
          thumbnail
          pubDate
        }
      }
    `,
      variables: {
        title,
      },
    }),
  });
  const data = await res.json();

  return data;
};
export const enSearch = async (title) => {
  const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `
      query MyQuery($title: String) {
        enJsons(distinct_on: id, where: {title: {_regex: $title}}) {
          url
          urlToImage
          title
          source
          publishedAt
          id
          description
          content
          cat
          author
        }
      }
      
    `,
      variables: {
        title,
      },
    }),
  });
  const data = await res.json();

  return data;
};
export const frSearch = async (title) => {
  const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `
      query MyQuery($title: String) {
        frJson(distinct_on: id, where: {title: {_regex: $title}}) {
          url
          urlToImage
          title
          source
          publishedAt
          id
          description
          content
          cat
          author
        }
      }
      
    `,
      variables: {
        title,
      },
    }),
  });
  const data = await res.json();

  return data;
};
