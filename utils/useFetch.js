export const fetchPublic = async (language) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($language:String) {
        news(where: {language: {_eq: $language}, publics: {_eq: "true"}}) {
          category
          content
          id
          img
          language
          publics
          shown
          source
          title
          video
        }
      }`,
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
      query: `query MyQuery($language: String) {
        news(where: {language: {_eq: $language}}) {
          category
          content
          id
          img
          language
          newsid
          publics
          shown
          source
          title
          video
          voices {
            id
          }
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
      query: `query MyQuery($newsid:Int) {
        voice(where: {newsid: {_eq: $newsid}}) {
          newsid
          id
          like
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
        newsid,
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
      query: `query MyQuery($category: String,$language:String) {
        news(where: {category: {_eq: $category}, language: {_eq: $language}}) {
          content
          id
          img
          newsid
          publics
          shown
          source
          title
          video
          voices {
            id
          }
        }
      }
      
      `,
      variables: {
        category,
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
        news(where: {voices: {userid: {_eq:$userid }}}) {
          content
          id
          img
          language
          newsid
          publics
          shown
          source
          video
          title
          voices {
            voice
            like
            newsid
            userid
            id
          }
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
