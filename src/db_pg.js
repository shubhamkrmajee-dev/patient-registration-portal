import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patient-db');

await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        contact BIGINT NOT NULL
    );
`);

export default db;