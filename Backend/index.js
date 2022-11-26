const express = require("express");
const cors = require("cors");

require('./db/config');
const Users = require('./db/registration');
const Leave = require("./db/leave");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/registration",async(req,res)=>{
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})
app.post("/login",async(req,res)=>{
    if(req.body.username && req.body.password){
        let staffmember = await Users.findOne(req.body).select("-password");
            if(staffmember){
                res.send(staffmember)
            }
            else
            {
                res.send({result:"No User Found"});
            }
    }
    
    else{
        res.send({result:"No User Found"});
    }
    
})

app.get("/staffmembers/:dept",async(req,res)=>{
    let staffdept = req.params.dept;
    let staffs = await Users.find({role:"Staff",dept:staffdept});
    if(staffs.length>0){
        res.send(staffs)
    }else{
        res.send({result:"No staff memebers in this department"})
    }
})

app.delete("/staffmember/:id",async(req,res)=>{
    const result = await Users.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get("/staffdetail/:id",async(req,res)=>{
    const result = await Users.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"No Record Found"})
    }
})
app.post("/leave",async(req,res)=>{
    let leave = new Leave(req.body);
    let result = await leave.save();
    res.send(result);
})
app.get("/leavedata/:staff_Id",async(req,res)=>{
    var id = req.params.staff_Id;
   // console.log(staff.id);
    let getLeave = await Leave.find({staffId:id});
    console.log(getLeave)
    if(getLeave.length>0){
        res.send(getLeave)
    }
    else{
        res.send({result:"No leaves details"})
    }
})

app.get("/leavedetail/:id",async(req,res)=>{
    const result = await Leave.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"No Record Found"})
    }
})
app.get("/staffleavesdetail/:dept",async(req,res)=>{
   var staffdept = req.params.dept;
   const result = await Leave.find({dept:staffdept})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"No Record Found"})
    }
})

app.listen(5000);