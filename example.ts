import Lithic from './index';

const lithic = new Lithic('5344d81a-da4a-4843-bce5-5495e79096b3', {
  environment: 'sandbox',
});

async function main() {
  const card1 = await lithic.cards.create({
    type: 'SINGLE_USE',
  });
  console.log(card1);

  const cards = await lithic.cards.list();
  console.log(cards);

  for (const card of cards.data) {
    const card_token = card.token!;
    console.log('Card', card_token);

    const {token} = await lithic.transactions.simulateAuthorization({
      amount: 200,
      descriptor: 'Test',
      pan: card.pan!,
    });
    await lithic.transactions.simulateClearing({
      amount: 200,
      token: token!,
    });
    const transactions = await lithic.transactions.list({
      card_token,
    });
    console.log(
      'Transactions',
      transactions.data.map(({result, status, amount}) => ({
        result,
        status,
        amount,
      }))
    );
  }
}

main().catch(console.error);
