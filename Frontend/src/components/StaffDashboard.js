import React , {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'


export default function StaffDashboard() {
    const [leaves, setLeaves] = useState([]);
    const [show,setShow] = useState(true);
   
    
    useEffect(() => {
       
            getStaffDetails();
        
        
    }, [])
    const getStaffDetails = async () => {
       
        const staffId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch(`http://localhost:5000/leavedata/${staffId}`);
        result = await result.json();
        setLeaves(result);
        
    }
   
    
    
   
    return (
        <div className="d-flex" id="wrapper">

            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                    className="fas fa-user-secret me-2"></i>SLMS</div>
                <div className="list-group list-group-flush my-3">
                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                        className="fas fa-tachometer-alt me-2"></i>Dashboard</a>

                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-chart-line me-2"></i>Leave Management</a>
                </div>
            </div>

            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Dashboard</h2>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                </nav>

                <div className="container-fluid px-4">
                    <div className="row g-3 my-2">
                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">2</h3>
                                    <p className="fs-5">Total Leaves Applied</p>
                                </div>
                               
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">0</h3>
                                    <p className="fs-5">Total Approve</p>
                                </div>
                               
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">0</h3>
                                    <p className="fs-5">Total Rejected</p>
                                </div>
                              
                            </div>
                        </div>

                       
                    </div>

                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Leave Management</h3>
                        <div className="col-md-12">
                            <Link className="btn btn-success mb-3" to="/leaveform">apply for new leaves</Link>
                            <div className='table-responsive'>
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                {leaves.length>0 ? 
                                
                                    <tr>
                                    
                                        <th scope="col">Sr No.</th>
                                        <th scope="col">From_Date</th>
                                        <th scope="col">To_Date</th>
                                        <th scope="col">Reason</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr> : !show 
                         }
                                </thead>
                                <tbody>
                                   {
                                    Array.isArray(leaves) ?
                                       
                                     leaves.map((item,index) =>
                                    
                                        <tr key={item._id}>

                                            <td>{index+1}</td>
                                            <td>{item.leave_from_date}</td>
                                            <td>{item.leave_to_date}</td>
                                            <td>{item.reason}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link className="btn btn-success" to={"/viewleavedetail/" + item._id}>View</Link>
                                               
                                            </td>
                                        </tr>
                                       
                                    )
                                    :null}
                                    </tbody>
                            </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}