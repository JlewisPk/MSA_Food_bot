var request = require('request'); //node module for http post requests

exports.retreiveMessage = function messageRetreival(session){
    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/9f1a4fed-e53f-4301-abb2-c7a08ed6da56/url?iterationId=eb287f9b-377f-48c4-aa6a-d08f2b8dacad',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '2c8600cda0a845ee834da798650406f7'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}