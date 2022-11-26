import React, { useEffect, useState } from 'react';
import { Link,useParams} from 'react-router-dom';
import Pagination from "./Pagination";

export default function HodDashboard() {
    const [staff, setStaff] = useState([]);
    const [staffleavedetails, setStaffLeaveDetails] = useState([]);
    const [show,setShow] = useState(false);
    const params = useParams();

    const [showPerPage, setShowPerPage] = useState(4);
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage,
    });

    const onPaginationChange = (start, end) => {
        setPagination({ start: start, end: end });
    };

    useEffect(() => {
        getStaffDetails();
        getStaffLeaveDetails();
    }, [])
    const getStaffDetails = async () => {
        const staffdept = JSON.parse(localStorage.getItem("user")).dept;
        let result = await fetch(`http://localhost:5000/staffmembers/${staffdept}`);
        result = await result.json();
        setStaff(result);
    }
   
    const deleteStaffMember = async (id) => {
        let result = await fetch(`http://localhost:5000/staffmember/${id}`, {
            method: "Delete",

        });
        result = await result.json()
        if (result) {
            getStaffDetails();

        }
    }

    const getStaffLeaveDetails = async () => {
        const staffdept = JSON.parse(localStorage.getItem("user")).dept;
        console.log(staffdept)
        let result = await fetch(`http://localhost:5000/staffleavesdetail/${staffdept}`);
        result = await result.json();
        setStaffLeaveDetails(result);
    }
    //console.log(staffleavedetails)

  return (
        <div className="d-flex" id="wrapper">

            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                    className="fas fa-user-secret me-2"></i>SLMS</div>
                <div className="list-group list-group-flush my-3">
                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                        className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-project-diagram me-2"></i>Staff Management</a>
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
                                    <h3 className="fs-2">{staff.length}</h3>
                                    <p className="fs-5">Total Number of Staff Members</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        {staff.length > 0 ? 
                        <h3 className="fs-4 mb-3">List of total numbers of Staff members</h3>
                        : <h3 className="fs-4 mb-3">No staff Memebers Are available</h3> }
                        <div className="col-md-12">
                            <div className="table-responsive">
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                    {staff.length>0 ? 
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Action</th>
                                    </tr> : !show 
                                    }
                                </thead>
                                <tbody>
                                    {  Array.isArray(staff) ? staff.slice(pagination.start, pagination.end).map((item) =>
                                        <tr key={item._id}>

                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.contact}</td>
                                            <td>
                                                <Link className="btn btn-success" to={"/viewstaffdetail/" + item._id}>View</Link>
                                                <button className="btn btn-success ms-1" onClick={() => deleteStaffMember(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ):null}
                                </tbody>
                            </table>
                            </div>
                            {staff.length > 0 ?
                            <Pagination
                                showPerPage={showPerPage}
                                onPaginationChange={onPaginationChange}
                                total={staff.length}
                            /> : !show }
                        </div>
                    </div>

                    <div className="row my-5">
                    <h3 className="fs-4 mb-3">Leave Management</h3>
                    {
                                 staffleavedetails.map((leave) =>
                       
                        <div className="card" key={leave._id} style={{width: "18rem",marginRight:"10px",marginBottom:"10px"}}>
                           
                            
                            <div className="card-body">
                                <p className="card-text">{leave.leave_from_date}</p>
                                <p className="card-text">{leave.leave_to_date}</p>
                                <p className="card-text">{leave.reason}</p>
                                <p className="card-text">{leave.status}</p>
                                <Link className="btn btn-success" to={"/staffinfo/" + leave.staffId}>More Info</Link>
                                {console.log(leave)}
                               
                            </div>
                           
                           
                        </div>
                        )}
                        
                        
                    </div>
                            
                       
                    </div>
                </div>
            </div>


            )
}