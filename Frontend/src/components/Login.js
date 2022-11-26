import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    })

    const login = async () => {
        if (!username || !password) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        //console.log(result);

        if (result.role === "Staff") {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/StaffDashboard");
        }
        else if (result.role === "HOD") {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/hodDashboard");
        }
        else {
            alert("Please enter correct details")
        }


    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-md-offset-4 login-container-up">
                    <div className="login-container-down"><br />
                        <h3 className="text-center text-dark font-weight-bold">Login</h3>
                        <div className="container text-center">
                            <div>
                                <input
                                    type="text"
                                    placeholder='UserName'
                                    className='form-control form--input'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                {error && !username && <span className="error-text">Enter username</span>}

                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='form-control form--input'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {error && !password && <span className="error-text">Enter password</span>}

                                <br /><br />
                                <button className='btn btn-success bt-lg login--button' onClick={login}>Login</button>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}