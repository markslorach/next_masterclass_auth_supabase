import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// http://localhost:3000/api/tickets
export async function GET() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return NextResponse.json(tickets, {
    status: 200,
  });
}

export async function POST(request) {
  const ticket = await request.json();

  const res = await fetch("http://localhost:4000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  const newTicket = await res.json();

  return NextResponse.json(newTicket, {
    status: 201,
  });
}

export async function PUT(request) {
    const ticket = await request.json();
  
    const res = await fetch(`http://localhost:4000/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
  
    if (!res.ok) {
      return NextResponse.error({ status: res.status });
    }
  
    const updatedTicket = await res.json();
  
    return NextResponse.json(updatedTicket, {
      status: 200,
    });
  }
