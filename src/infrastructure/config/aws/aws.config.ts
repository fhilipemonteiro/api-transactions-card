import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { SQSClient, SQSClientConfig } from "@aws-sdk/client-sqs";
import "dotenv/config";

const awsConfig: DynamoDBClientConfig & SQSClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION || "",
};

export const dynamoClient = new DynamoDBClient(awsConfig);
export const sqsClient = new SQSClient(awsConfig);
