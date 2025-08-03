import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function RegistrationPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); 
        
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/viewLogin")
            } else {
                setError(result.message);
            }

        } catch (err) {
            console.error(err);
        }
    };
    
    return (
            <div className="row justify-content-center" style={{ marginTop: '50px' }}>
                <div className="col-sm-6 col-lg-4">
                    <div className="card card-light" style={{ border: '1px solid gray', padding: '20px' }}>
                        <div className="card-body">
                            <h2 className="text-center">Register</h2>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && <div className="text-danger">{error}</div>}

                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Already have an account? <Link to="/viewLogin">Log in</Link></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default RegistrationPage;