const db = require("../model/dbConnect");

const students = db.students

module.exports ={
    addStudent :async(req,res,next)=>{
        try{
            let info ={
                firstname:req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
            }

            const addStudent = await students.create(info)

            res.status(200).send(addStudent)
        }catch(error){
            next(error)
        }
        
    },
}
