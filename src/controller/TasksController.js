const TasksModel = require("../models/TasksModel")

exports.createTask=(req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email']
    TasksModel.create(reqBody, (err, data) => {
        if(err){
            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})
        }
    })
}

exports.deleteTask=(req, res) => {
    let id = req.params.id;
    let query = {_id: id};
    
    TasksModel.remove(query, (err, data) => {
        if(err){
            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})
        }
    })
}

exports.updateTaskStatus=(req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let query = {_id: id};
    let reqBody={status:status}
    
    TasksModel.updateOne(query,reqBody, (err, data) => {
        if(err){
            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})
        }
    })
}

exports.listTaskByStatus=(req,res)=>{
    let status= req.params.status;
    let email=req.headers['email'];
    TasksModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
                _id:1,title:1,description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
    ], (err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}