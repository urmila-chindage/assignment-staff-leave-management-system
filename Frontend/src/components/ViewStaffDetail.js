import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const ViewStaffDetail = () => {
  const [staffDetail, setStaffDetail] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    dept: "",
});
const params = useParams();
  useEffect(() => {
    getStaffInfo();
  }, []);
  const getStaffInfo = async ()=>{
    let result = await fetch(`http://localhost:5000/staffdetail/${params.id}`);
    result = await result.json();
    //console.log(result)
    setStaffDetail(result);
}
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/hoddashboard">
        Back to Dashboard
      </Link>
      
      <hr />
      <ul className="list-group w-50 mx-auto">
        <li className="list-group-item">Name: {staffDetail.name}</li>
        <li className="list-group-item">Username: {staffDetail.username}</li>
        <li className="list-group-item">Email: {staffDetail.email}</li>
        <li className="list-group-item">Mobile: {staffDetail.contact}</li>
        <li className="list-group-item">Department: {staffDetail.dept}</li>
      </ul>
    </div>
  );
};

export default ViewStaffDetail;