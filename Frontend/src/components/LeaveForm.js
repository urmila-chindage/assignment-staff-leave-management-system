import React, { useState,useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'

export default function LeaveForm(){
    const [leave_from_date,setLeaveFromDate] = useState("");
    const [leave_to_date,setLeavetoDate] = useState("");
    const [reason,setReason] = useState("");
    const [dept,setDept] = useState("");
    const [error,setError] = useState(false)

    const navigate = useNavigate();
    
    const applyleave = async () => {
        if(!leave_from_date || !leave_to_date || !reason ||!dept){
            setError(true)
            return false
        }
       const staffId = JSON.parse(localStorage.getItem("user"))._id;
       //console.log(staffId._id)
        let result = await fetch("http://localhost:5000/leave", {
            method: "post",
            body: JSON.stringify({leave_from_date,leave_to_date,reason,staffId,dept}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        if (result) {
            navigate('/staffdashboard')
        }
    }

   

    return(
        
        <div className="container">
            <Link className="btn btn-primary mt-3" to="/staffdashboard">
        Back to Dashboard
      </Link>
            <div className="row">
           
                <div className="col-sm-6 offset-3 login-container-up">
                    <div className="login-container-down"><br/>
                        <h3 className="text-center text-dark font-weight-bold">Apply For Leave</h3>
                            <div className="container text-center">
                                <div>
                                    <label className="float-left">Leave From date</label>
                                    <input
                                        type="date"
                                        
                                        className='form-control form--input'
                                        value={leave_from_date}
                                        onChange={e=>setLeaveFromDate(e.target.value)}
                                    />
                                    {error && !leave_from_date && <span className="error-text">Select Date from leave</span>}

                                    <label className="float-left">Leave To date</label>
                                    <input
                                        type="date"
                                        
                                        className='form-control form--input'
                                        value={leave_to_date}
                                        onChange={e=>setLeavetoDate(e.target.value)}
                                    />
                                    {error && !leave_to_date && <span className="error-text">Select Date to leave</span>}

                                    <textarea
                                        
                                        placeholder='Reason'
                                        className='form-control form--input'
                                        value={reason}
                                        onChange={e=>setReason(e.target.value)}
                                    />
                                    {error && !reason && <span className="error-text">Enter reason for leave</span>}

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
                                    
                                    <br/><br/>
                                    <button className='btn btn-success bt-lg login--button' onClick={applyleave}>Apply</button>
                                    <br/><br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
