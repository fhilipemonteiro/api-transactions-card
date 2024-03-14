export default interface TransactionDTO {
  idempotencyId?: string;
  amount: number;
  type: string;
}
