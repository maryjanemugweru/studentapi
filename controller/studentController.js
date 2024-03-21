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

    // get all students
    getAllStudents :async (req,res,next)=>{
        try{
            let allStudents =await students.findAll({})
            res.status(200).send(allStudents)
        }
        catch(error) {
            next(error)
        }
    },

    //  get all student by ID
    getStudent :async (req,res,next)=>{
        try{
           let id = req.params.id
           let Student = await students.findOne({where: {student_id: id}})
           if(!students) {
            throw(createError(404,"student does not exist."))
           }
           res.status(200).send(Student)
        }
        catch(error) {
            next(error)
        }
    },

    // Update Student by ID
    updateStudent: async(req, res, next) => {
        try {
            let id = req.params.id

            const updateStudent = await student.update(req.body, {where: {student_id: id}})

            if(!student) {
                throw(createError(404, "Student does not exist."))
            }
            res.status(200).send(updateStudent)
        } catch (error) {
            next(error)
        }
    },
}
