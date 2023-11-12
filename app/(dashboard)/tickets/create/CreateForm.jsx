"use client";
// Importing the useRouter hook from next/navigation and useState hook from react
import { useRouter } from "next/navigation";
import { useState } from "react";

// This is the main component that displays a form to create a new ticket
export default function CreateForm() {
  // Using the useRouter hook to get the router object
  const router = useRouter();

  // Using the useState hook to manage the form fields and loading state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  // This function handles the form submission
  const handleSubmit = async (e) => {
    // Preventing the default form submission
    e.preventDefault();
    // Setting the loading state to true
    setIsLoading(true);

    // Creating the ticket object
    const ticket = {
      title, body, priority, user_email: 'hello@markslorach.com'
    }

    // Sending a POST request to the server to create a new ticket
    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ticket)
    })
    // If the response status is 201, redirecting to the tickets page
    if(res.status === 201){
      router.refresh()
      router.push('/tickets')
    }
  };

  // Returning the JSX for the component
  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      {/* The title field */}
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      {/* The body field */}
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      {/* The priority field */}
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      {/* The submit button */}
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
