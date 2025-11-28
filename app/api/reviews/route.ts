export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('review received', body);
    // TODO: persist to DB or cloud storage
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
