import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddEventPage() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault(); 

        if (!title || !location || !date) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/addEvent", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    title,
                    location,
                    date,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/")
            } else {
                setError(result.message);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
            <div className="row justify-content-center" style={{ marginTop: '50px' }}>
                <div className="col-sm-6 col-lg-4">
                    <div className="card card-light" style={{ border: '1px solid gray', padding: '20px' }}>
                        <div className="card-body">
                            <h2 className="text-center">Add an event</h2>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label htmlFor="title">Event title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location">Event location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        className="form-control"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date">Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            
                                {error && <div className="text-danger">{error}</div>}

                                <button type="submit" className="btn btn-primary w-100">
                                    Add Event
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default AddEventPage;