import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const todos = await document.query({
    TableName: 'todos',
    IndexName: 'index_user_id',
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id,
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
