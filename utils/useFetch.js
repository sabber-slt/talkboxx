export const fetchPublic = async (language) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($language: String) {
        jsonData( where: {language: {_eq: $language}}, limit: 1, order_by: {id: desc}) {
          id
          info
          language
          type
        }
      }
      `,
      variables: {
        language,
      },
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchMenu = async (language) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($language:String) {
        default(where: {language: {_eq: $language}}) {
          language
          info
          id
        }
      }
      `,
      variables: {
        language,
      },
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchNews = async (language) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($language:String) {
        jsonData(limit: 3, where: {language: {_eq: $language}}, order_by: {id: desc}) {
          id
          info
          type
          language
        }
      }
      
      `,
      variables: {
        language,
      },
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchComments = async (newsid) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($newsString:String) {
        voice(where: {newsString: {_eq: $newsString}}) {
          newsid
          id
          like
          newsString
          users {
            img
            username
            id
          }
          voice
        }
      }
      `,
      variables: {
        newsString: newsid,
      },
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchCategory = async (language, category) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($type:String,$language:String) {
        jsonData(where: {language: {_eq:$language}, type: {_eq: $type}}) {
          id
          info
          language
          type
        }
      }
      
      `,
      variables: {
        type: category,
        language,
      },
    }),
  });
  const data = await response.json();
  return data;
};
export const userComment = async (userid) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($userid:Int) {
        voice(where: {userid: {_eq: $userid}}) {
          like
          id
          newsString
          voice
        }
      }
      
      
      `,
      variables: {
        userid,
      },
    }),
  });
  const data = await response.json();
  return data;
};
