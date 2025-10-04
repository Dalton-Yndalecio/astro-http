import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId;
  const clients = await db.select().from(Clients).where(eq(Clients.id, Number(clientId)));
  if (clients.length === 0) {
    return new Response(  JSON.stringify({ error: `Cliente con id ${clientId} no encontrado` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(
    JSON.stringify({
      method: 'GET',
      message: 'Lista de cientes',
      ...clients[0],
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const PUT: APIRoute = async ({ params, request }) => {
  return new Response(
    JSON.stringify({
      method: 'POST',
      message: 'Data cliente',
      clientId: params.clientId,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';
  try {
    const { id, ...body } = await request.json();

    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, Number(clientId)));
    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, Number(clientId)));

    return new Response(
      JSON.stringify({
        method: 'POST',
        message: 'Cliente registrado correctamente',
        ...updatedClient,
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

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';
  try {
    const { rowsAffected } = await db
      .delete(Clients)
      .where(eq(Clients.id, Number(clientId)));

    if (rowsAffected === 0) {
      return new Response(
        JSON.stringify({
          error: `Cliente con id ${clientId} no encontrado`,
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(
      JSON.stringify({
        method: 'DELETE',
        message: 'Cliente eliminado correctamente',
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
