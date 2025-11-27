import { MongoClient } from 'mongodb';

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('tds-website');
  const page = await db.collection('pages').findOne({ slug: 'about-us' });

  console.log('Page found:', page ? 'yes' : 'no');

  if (!page) {
    await client.close();
    return;
  }

  const cardBlocks = (page.layout || []).filter(b => b.blockType === 'cardGrid' || b.blockType === 'inlineCard');
  console.log('Card blocks found:', cardBlocks.length);

  cardBlocks.forEach((block, i) => {
    console.log('\n=== Block ' + (i + 1) + ' (' + block.blockType + ') ===');
    if (block.blockType === 'cardGrid' && block.cards) {
      block.cards.forEach((card, j) => {
        const hasContent = card.content ? 'YES' : 'NO';
        const hasDesc = card.description ? 'YES' : 'NO';
        console.log('  Card ' + (j + 1) + ': content=' + hasContent + ', description=' + hasDesc);
      });
    } else if (block.blockType === 'inlineCard') {
      const hasContent = block.content ? 'YES' : 'NO';
      const hasDesc = block.description ? 'YES' : 'NO';
      console.log('  content=' + hasContent + ', description=' + hasDesc);
    }
  });

  await client.close();
})();
