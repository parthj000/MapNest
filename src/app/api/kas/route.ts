export async function GET() {
  return Response.json({ message: "Hello from App Router!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body });
}