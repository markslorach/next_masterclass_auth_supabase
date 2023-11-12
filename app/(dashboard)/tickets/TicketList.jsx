// Importing the Link component from next/link
import Link from "next/link";

// This function fetches all tickets from the server
async function getTickets() {

    // Imitating a delay
    await new Promise(resolve => setTimeout(resolve, 2000));

  // Fetching the ticket data from the server
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0,
    },
  });
  // Returning the ticket data
  return res.json();
}

// This is the main component that displays a list of all tickets
export default async function TicketList() {
  // Fetching the ticket data
  const tickets = await getTickets();

  // Returning the JSX for the component
  return (
    <>
      {/* Mapping over the tickets to display each one */}
      {tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
        {/* Using the Link component to create a link to the ticket details page */}
        <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            {/* Displaying a preview of the ticket body */}
            <p>{ticket.body.slice(0, 200)}...</p>
            {/* Displaying the ticket priority */}
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
        </Link>
          </div>
      ))}
      {/* Displaying a message if there are no tickets */}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets!</p>
      )}
    </>
  );
}
