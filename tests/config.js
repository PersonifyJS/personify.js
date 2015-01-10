// In order to run 'npm test' you will need to paste your Watson and Twitter 
// credentials
var config = {
    translateConfig : {
        service_url : "https://gateway.watsonplatform.net/laser/service/api/v1/smt",
        service_username : "54fa5070-8c12-4ab8-b5d4-c126279b5b2a",
        service_password : "WmlLWdYClQBm"
    },
    personalityConfig : {
        service_url: "https://gateway.watsonplatform.net/systemu/service/",
        service_username: "12312a68-fdff-4064-9928-eb088a960815",
        service_password: "KUwy0neR5kpV"
    },
    twitterConfig : {
        consumer_key:         'nnnMzv63aJKbQgzF77vQLXCm0',
        consumer_secret:      'BAG1XL3PHUVw6AsW7K0dRcIv6qkITkWARmZL9Bb8nOKfTkbTpo',
        access_token:         '35398491-9KTshSy7QNiKh0Ia71AeZ6D1XMg6teKJWAwp6YNNE',
        access_token_secret:  'ivIGOcV4OHxW9lRrW7pevEcxwtk2RDGzVSW6IdOqz9R0D'
    }
}


module.exports = config;    