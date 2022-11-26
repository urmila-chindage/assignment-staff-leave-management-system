import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function StaffRegistration() {

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [dept, setDept] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    })

    const collectData = async () => {

        if (!role || !name || !username || !email || !contact || !password || !dept) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:5000/registration", {
            method: "post",
            body: JSON.stringify({ role, name, username, email, contact, dept, password, file }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));

        if (result) {
            navigate('/')
            alert("Successfully Register")
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-offset-3 login-container-up">
                    <div className="login-container-down"><br />
                        <h3 className="text-center text-dark font-weight-bold">Registration</h3>

                        <div className="container text-center wrapper">
                            <div>
                                <h6 className="float-left mr-30">Choose Role</h6>
                                <div className="radio float-left">
                                    <label>
                                        <input
                                            type="radio"
                                            value="HOD"
                                            name="role"
                                            checked={role === "HOD"}
                                            onChange={() => setRole("HOD")}
                                        />
                                        HOD
                                    </label>
                                </div>

                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Staff"
                                            name="role"
                                            checked={role === "Staff"}
                                            onChange={() => setRole("Staff")}
                                        />
                                        Staff
                                    </label>
                                </div>
                                {error && !role && <span className="error-text">Please select role</span>}
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className='form-control form--input'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {error && !name && <span className="error-text">Enter valid name</span>}

                                <input
                                    type="text"
                                    placeholder='UserName'
                                    className='form-control form--input'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                {error && !username && <span className="error-text">Enter valid username</span>}

                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='form-control form--input'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {error && !email && <span className="error-text">Enter valid email</span>}

                                <input
                                    type="number"
                                    placeholder='Contact No'
                                    className='form-control form--input'
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                />
                                {error && !contact && <span className="error-text">Enter mobile number</span>}

                                <select
                                    className="form--input float-left dropdown" value={dept} onChange={e => setDept(e.target.value)}>
                                    <option value="">--Choose Department--</option>
                                    <option value="Computer">Computer</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Civil">Civil</option>
                                    <option value="AutoMobile">Automobile</option>
                                </select>
                                {error && !dept && <span className="error-text">select department</span>}

                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='form-control form--input'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {error && !password && <span className="error-text">Enter correct password</span>}

                                <input
                                    type="file"
                                    onChange={handleChange}
                                    className='form-control form--input'
                                />
                                <img src={file} className="imageupload" alt="Profile" />
                                <br /><br />

                                <div className="text-center col-xs-4 register-wrapper"><button className='btn btn-success bt-lg login--button btn-xs' onClick={collectData}>Register</button></div>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}