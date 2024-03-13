import { createSQSClient } from "../../infrastructure/aws/aws.config";
import TransactionDTO from "../services/transaction/transaction.dto";
import { Response } from "express";

export default function SendMessageSQS(data: TransactionDTO, res: Response) {
  const transaction = data;

  const sqs = createSQSClient();

  const queueUrl = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${process.env.SQS_QUEUE_NAME}`;

  const params: AWS.SQS.SendMessageRequest = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(transaction),
  };

  return new Promise<void>((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
