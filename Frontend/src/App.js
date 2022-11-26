import React from 'react';
import Login from './components/Login';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Registration from './components/Registration';
import StaffDashboard from './components/StaffDashboard';
import HodDashboard from './components/HodDashboard';
import PrivateComponent from './components/PrivateComponent';
import ViewStaffDetail from './components/ViewStaffDetail';
import LeaveForm from "./components/LeaveForm"
import ViewLeaveDetails from "./components/ViewLeaveDetails";
import PageNotFound from './components/PageNotFound';
import StaffInfo from './components/StaffInfo'

/* Added routes  */
export default function App(){
  return(
    <Router>
      <div className="App">
          <Navbar/>
            <Routes>
            
                <Route path="/" element={<Home/>}></Route>
                <Route path="/registration" element={<Registration/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/logout" element={<h1>Logout</h1>}></Route>
                <Route path="/*" element={<PageNotFound/>}></Route>   

                <Route element={<PrivateComponent/>} >
                <Route path="/staffdashboard" element={<StaffDashboard/>}></Route>
                <Route path="/hoddashboard" element={<HodDashboard/>}></Route>
                <Route path="/viewstaffdetail/:id" element={<ViewStaffDetail/>}></Route>
                <Route path="/leaveform" element={<LeaveForm/>}></Route>
                <Route path="/viewleavedetail/:id" element={<ViewLeaveDetails/>}></Route>
                <Route path="/staffinfo/:id" element={<StaffInfo/>}></Route>
                </Route>

            </Routes>
      </div>
    </Router>
    
  )
}