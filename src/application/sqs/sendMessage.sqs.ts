import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../../infrastructure/config/aws/aws.config";
import TransactionDTO from "../services/transaction/transaction.dto";

export default async function SendMessageSQS(data: TransactionDTO) {
  const transaction = data;

  const sqs = sqsClient;

  const queueUrl = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${process.env.SQS_QUEUE_NAME}`;

  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(transaction),
  };

  try {
    const command = new SendMessageCommand(params);
    await sqs.send(command);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
