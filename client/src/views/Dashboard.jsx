import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          setError("Failed to fetch events.");
        }
      } catch (err) {
        setError("Something went wrong while fetching events.");
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteEvent/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
      } else {
        setError("Failed to delete the event.");
      }
    } catch (err) {
      setError("An error occurred while deleting the event.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container align-items-center">
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <Link to="/viewAddEvent" className="btn button_style ms-auto">Add New Event</Link>
          </div>
        </div>
      </div>

      <table className="table table_style table-bordered mt-3">
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No events found.</td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-danger ms-auto" 
                    onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;