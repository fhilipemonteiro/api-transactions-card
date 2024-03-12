export default class TransactionCard {
  _idempotencyId: string;
  _amount: number;
  _type: string;

  constructor(idempotencyId: string, amount: number, type: string) {
    this._idempotencyId = idempotencyId;
    this._amount = amount;
    this._type = type;
    this.validate();
  }

  validate(): void {
    if (this._idempotencyId.length === 0) {
      throw new Error("idempotencyId is empty");
    }
    if (this._amount < 0) {
      throw new Error("amount is negative");
    }
    if (this._type.length === 0) {
      throw new Error("type is empty");
    }
  }

  get idempotencyId(): string {
    return this._idempotencyId;
  }

  get amount(): number {
    return this._amount;
  }

  get type(): string {
    return this._type;
  }
}
