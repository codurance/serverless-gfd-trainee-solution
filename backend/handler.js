'use strict';

const middy = require('middy')
const { cors } = require('middy/middlewares')
const AWS = require('aws-sdk');
const parse = AWS.DynamoDB.Converter.output;

var handler = async event => {
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  var params = {
    TableName: 'mob-programming-serverless-lau',
    Key: {
      'id': { S: '200300400' }
    },
    ProjectionExpression: 'posts'
  };
  return await new Promise((resolve, reject) => {
    ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
          const posts = parse({'M': data.Item}).posts;
          resolve({
            "statusCode": 200,
            "body": JSON.stringify(posts)
        });
      }
    });
  });
}

module.exports.hello = middy(handler).use(cors())

