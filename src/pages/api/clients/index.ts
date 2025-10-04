import type { APIRoute } from 'astro';
import { Clients, db } from 'astro:db';
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clients = await db.select().from(Clients);
console.log(clients);
  return new Response(
    JSON.stringify({ method: 'GET', message: 'Lista de cientes', ...clients }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({
        method: 'POST',
        message: 'Cliente registrado correctamente',
        id: +lastInsertRowid!.toString(),
        ...body,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
