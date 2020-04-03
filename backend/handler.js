'use strict';

const middy = require('middy')
const { cors } = require('middy/middlewares')
var AWS = require('aws-sdk');

var handler = async event => {
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  var params = {
    TableName: 'serverless-gfd-it1-posts-database',
    Key: {
      'id': { S: '1234' }
    },
    ProjectionExpression: 'posts'
  };
  return await new Promise((resolve, reject) => {
    ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        var parse = AWS.DynamoDB.Converter.output;

        resolve(parse({ "M": data.Item}).posts);
      }
    });
  });
}

module.exports.hello = middy(handler).use(cors())

