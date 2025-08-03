import {useState, useContext} from "react";
import {useNavigate, Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/styles.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    const submit = async (e) => {
        e.preventDefault(); 

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                loggedIn(result.user);
                navigate("/")
            } else {
                setError(result.message);
            }

        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div className="row justify-content-center"> 
            <div className="col-sm-6 col-lg-4">
                <div className="card card-light">
                    <div className="card-body">
                        <h2 className="text-center">Log in</h2>
                            <form onSubmit={submit}>
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
                                    Log in
                                </button>
                            </form>

                            <div className="mt-3 text-center">
                                <p>Create an account <Link to="/viewRegister">Register</Link></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;