import axios from "axios";

interface TransactionInterface {
  amount: number;
  type: string;
}

const transactions: TransactionInterface[] = [];

for (let i = 0; i < 100; i++) {
  const amount: number = Math.floor(Math.random() * 5000) + 1;
  const type: string = Math.random() < 0.5 ? "credit" : "debit";
  const transaction: TransactionInterface = {
    amount,
    type,
  };
  transactions.push(transaction);
}

const startTime = new Date();
const promises = transactions.map(async (transaction) => {
  try {
    await axios.post("http://localhost:3000/payments/card", transaction);
    console.log("Transação enviada com sucesso.");
  } catch (error) {
    console.error(`Erro ao enviar transação: ${error}`);
  }
});

Promise.all(promises)
  .then(() => {
    const endTime = new Date();
    console.log(
      `Tempo de execução: ${endTime.getTime() - startTime.getTime()}ms`
    );
  })
  .catch((error) => {
    console.error(`Erro ao aguardar promessas: ${error}`);
  });
