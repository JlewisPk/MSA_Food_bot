var builder = require('botbuilder');
var food = require('./FavouriteFoods');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/13702282-9cad-4130-8385-2e193543d98d?subscription-key=56878aa5033a475abfe27372bb74580d&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function (session, args) {
        session.send("Get Calories intent found");
    }).triggerAction({
        matches: 'GetCalories'
    });
    
    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
        }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });
     bot.dialog('LookForFavourite', function (session, args) {
        // Insert favourite food logic here later
        session.send("Look Favourite Food intent found");
     }).triggerAction({
         matches: 'LookForFavourite'
     });
     bot.dialog('WantFood', function (session, args) {
        // Insert favourite food logic here later
        session.send("Want Food intent found");
     }).triggerAction({
         matches: 'WantFood'
     });
     bot.dialog('WelcomeIntent', function (session, args) {
        // Insert favourite food logic here later
        session.send("Welcome Intent intent found");
     }).triggerAction({
         matches: 'WelcomeIntent'
     });
 
    //  bot.dialog('LookForFavourite', [
    //      // Insert logic here later
    //      session.send("Look For Favourite intent found");
    //  ]).triggerAction({
    //      matches: 'LookForFavourite'
    //  });
     
 
    //  bot.dialog('WelcomeIntent', [
    //      // Insert logic here later
    //      session.send("Welcome intent found");
    //  ]).triggerAction({
    //      matches: 'WelcomeIntent'
    //  });


    // function isAttachment(session) { 
    //     var msg = session.message.text;
    //     if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
            
    //         //call custom vision here later
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
}