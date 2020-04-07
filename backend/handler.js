'use strict';

const middy = require('middy')
const { cors } = require('middy/middlewares')
var AWS = require('aws-sdk');

var handler = async event => {
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  var userId = event.pathParameters.user_id
  var params = {
    TableName: 'serverless-gfd-it1-posts-database',
    Key: {
      'id': { S: userId }
    },
    ProjectionExpression: 'posts'
  };
  return await new Promise((resolve, reject) => {
    ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        var parse = AWS.DynamoDB.Converter.output;
        var posts = parse({ "M": data.Item}).posts
        const response = {
          statusCode: 200,
          body: JSON.stringify(
            posts,
            null,
            2
          )
        }
        resolve(response)
      }
    });
  });
}

module.exports.hello = middy(handler).use(cors())

