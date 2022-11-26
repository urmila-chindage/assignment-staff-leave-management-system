import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const ViewLeaveDetails = () => {
  const [leaveDetail, setLeaveDetail] = useState({
    leave_from_date: "",
    leave_to_date: "",
    reason: "",
});
const params = useParams();
  useEffect(() => {
    getLeaveInfo();
  }, []);
  const getLeaveInfo = async ()=>{
    let result = await fetch(`http://localhost:5000/leavedetail/${params.id}`);
    result = await result.json();
    setLeaveDetail(result);
}
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/staffdashboard">
        Back to Dashboard
      </Link>
      
      <hr />
      <ul className="list-group w-50 mx-auto">
        <li className="list-group-item">Leave From Date: {leaveDetail.leave_from_date}</li>
        <li className="list-group-item">Leave To Date: {leaveDetail.leave_to_date}</li>
        <li className="list-group-item">Reason: {leaveDetail.reason}</li>
    </ul>
    </div>
  );
};

export default ViewLeaveDetails;