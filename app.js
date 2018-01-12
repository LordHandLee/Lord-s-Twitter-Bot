/* Made by Kristof Litavecz based on @BrandonMorelli 's Twitter bot. See more here:
https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
https://github.com/bmorelli25/Twitter-Favorite-Bot
*/


var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '@CORSAIR',
  count: 1,
  result_type: 'recent',
  lang: 'en'
}

//set up tweet time interval
var INTERVAL = 1*60*60*1000;

//set up array of tweets that can be randomly selected
var TWEETS_TO_REPLY = [
    "I purchased a GTX 1080 TI and ordered 2 day shipping with UPS Second Day Air. Instead I received Fed Ex International Priority. It took 12 days to receive my product, because the shipping manager forgot to include customs info. Not what I paid for. I demand a refund on shipping!",
    "I purchased 2 day shipping, not 12 day shipping for my GTX 1080 TI. Shipping manager forgot to send information to clear customs. Unacceptable. I demand a refund for shipping!",
    "Customer service rep told me my GTX 1080 TI would ship from California, not Taiwan. Paid for 2 day shipping and got 12 day shipping instead all because shipping manager forgot to send customs info. I demand a refund."
];

function BotStart() {
// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      
      //Do not retweet Own user --> replace your username
      if (data.statuses[i].user.screen_name != 'MY USER NAME')
      {
          // Try to Favorite the selected Tweet
          T.post('statuses/update', { in_reply_to_status_id: data.statuses[0].id_str, status: '@' + data.statuses[0].user.screen_name + TWEETS_TO_REPLY[Math.floor(Math.random()*TWEETS_TO_REPLY.length)] }, function(err, response){
            // If the favorite fails, log the error message
            if(err){
              console.log(err[0].message);
            }
            // If the favorite is successful, log the url of the tweet
            else{
              let username = response.user.screen_name;
              let tweetId = response.id_str;
              //log results to the console
              console.log('Tweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
              console.log(data.statuses[i])
            }
          });
      }
    }
  } else {
    console.log(err);
  }
})

}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);
