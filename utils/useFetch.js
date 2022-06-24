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
export const fetchSearch = async (language) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($language: String) {
        jsonData(where: {language: {_eq: $language}, info: {_cast: {String: {_iregex: "title"}}}}) {
          info
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
export const fetchEn = async () => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery {
        enJson(distinct_on: id) {
          author
          cat
          content
          description
          id
          publishedAt
          source
          title
          url
          urlToImage
        }
      }
      `,
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchFr = async () => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery {
        frJson(distinct_on: id) {
          author
          cat
          content
          description
          id
          publishedAt
          source
          title
          url
          urlToImage
        }
      }
      `,
    }),
  });
  const data = await response.json();
  return data;
};
export const fetchIr = async () => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery {
        faJson(distinct_on: id) {
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
    }),
  });
  const data = await response.json();

  return data;
};

export const fetchEnCat = async (cat) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($cat: String ) {
        enJson(where: {cat: {_eq: $cat}}) {
          author
          cat
          description
          content
          id
          urlToImage
          url
          title
          source
          publishedAt
        }
      }
      
      `,
      variables: {
        cat,
      },
    }),
  });
  const data = await response.json();

  return data;
};
export const fetchFrCat = async (cat) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($cat: String ) {
        frJson(where: {cat: {_eq: $cat}}) {
          author
          cat
          description
          content
          id
          urlToImage
          url
          title
          source
          publishedAt
        }
      }
      
      `,
      variables: {
        cat,
      },
    }),
  });
  const data = await response.json();

  return data;
};
export const fetchIrCat = async (cat) => {
  const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: `query MyQuery($cat: jsonb) {
        faJson(where: {categories: {_contains: $cat}}) {
          author
          categories
          content
          description
          enclosure
          guid
          id
          link
          pubDate
          thumbnail
          title
        }
      }
      
      
      `,
      variables: {
        cat,
      },
    }),
  });
  const data = await response.json();

  return data;
};
