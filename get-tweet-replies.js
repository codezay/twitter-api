// Search for public Tweets across the whole Twitter archive
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/full-archive-search

const needle = require("needle");
const dotenv = require("dotenv");

dotenv.config();

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.TWITTER_BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const conversation_id = "1470251903925719043";


async function getRequest() {
  // These are the parameters for the API request
  // specify Tweet IDs to fetch, and any additional fields that are required
  // by default, only the Tweet ID and text are returned
  const params = {
    // 'query': 'from:twitterdev -is:retweet',
    query: `conversation_id:${conversation_id}`,
    "tweet.fields": "in_reply_to_user_id,author_id,created_at,conversation_id",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2FullArchiveJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

(async () => {
  try {
    // Make request
    const response = await getRequest();
    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
