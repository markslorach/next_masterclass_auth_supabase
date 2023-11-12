// Importing the notFound function from next/navigation
import { notFound } from "next/navigation"

// Setting the dynamicParams variable to true
export const dynamicParams = true // default val = true

// This function generates metadata for a specific ticket based on its id
export async function generateMetadata({ params }) {
  const id = params.id

  // Fetching the ticket data from the server
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()
 
  // Returning the title for the metadata
  return {
    title: `Dojo Helpdesk | ${ticket.title}`
  }
}

// This function generates static parameters for all tickets
export async function generateStaticParams() {
  // Fetching all tickets from the server
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()
 
  // Mapping over the tickets to return an array of ids
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
}

// This function fetches a specific ticket based on its id
async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60
    }
  })

  // If the response is not ok, it triggers the notFound function
  if (!res.ok) {
    notFound()
  }

  // Returning the ticket data
  return res.json()
}

// This is the main component that displays the ticket details
export default async function TicketDetails({ params }) {
  // Fetching the ticket data
  const ticket = await getTicket(params.id)

  // Returning the JSX for the component
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
