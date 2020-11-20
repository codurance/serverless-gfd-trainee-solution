'use strict';

const middy = require('middy')
const { cors } = require('middy/middlewares')
var AWS = require('aws-sdk');

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
        resolve({ "M": data.Item});
      }
    });
  });
}

module.exports.hello = middy(handler).use(cors())

