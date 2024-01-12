const fs = require('fs');
const { db } = require('@vercel/postgres');

async function seedConditions(client) {
  try {
    // Create the "conditions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS conditions (
        condition VARCHAR(255),
        symptom VARCHAR(255),
        UNIQUE (condition, symptom)
      );
    `;

    console.log(`Created "conditions" table`);

    // Insert data into the "symptoms" table
    const data = fs.readFileSync('./data/conditions.csv')
      .toString()
      .split(/\r?\n/)
      .map(row => {
        return row.split(',')
        .map(token => token.trim())
        .filter(token => token != '')
      });

    const insertedEntries = await Promise.all(
      data.filter(row => row.length > 1)
        .map(async (row) => {
        const condition = row[0];
        return Promise.all(row.slice(1)
          .map(symptom => client.sql`
            INSERT INTO conditions (condition, symptom)
            VALUES (${condition}, ${symptom})
            ON CONFLICT (condition, symptom) DO NOTHING;
          `)
        );
      }),
    );

    console.log(`Seeded ${insertedEntries.length} entries`);

    return {
      createTable,
      entries: insertedEntries,
    };
  } catch (error) {
    console.error('Error seeding conditions:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedConditions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
