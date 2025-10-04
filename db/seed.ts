import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Clients).values([
    { id: 1, name: 'Kasim', age: 30, isActive: true },
    { id: 2, name: 'Mina', age: 25, isActive: false },
    { id: 3, name: 'Dalton', age: 21, isActive: true },
    { id: 4, name: 'Max', age: 35, isActive: true },
    { id: 5, name: 'Erick', age: 40, isActive: false },
  ]);
}
