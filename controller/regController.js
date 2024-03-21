const db = require("../model/dbConnect");
const {signAccessToken} = require("../helpers/jwtHelpers");

const reg = db.reg;

module.exports = {
    // Add Reg
    addReg: async(req, res, next) => {
        try {
            const {regName, regEmail, regPassword} = req.body;
            const exists = await reg.findOne({where: {regEmail}})
            if (exists) {
                throw createError.Conflict(`${regEmail} has already been registered.`)
            }
            const newUser = new reg({regName, regEmail, regPassword})
            const savedUser = await newUser.save()

            const accessToken = await signAccessToken(savedUser.reg_id)
            res.status(200).send({accessToken})
        } catch(error) {
            next(error)
        }
    },
    
    // Get All Reg
    getAllReg: async(req, res, next) => {
        try {
            let regs = await reg.findAll({})
            res.status(200).send(regs)
        } catch (error) {
            next(error)
        }
    },
    
    // Get Reg by ID
    getReg: async(req, res, next) => {
        try {
            let id = req.params.id
            let Reg = await reg.findOne({where: {reg_id: id}})

            if(!reg) {
                throw(createError(404, "Registration does not exist."))
            }
            res.status(200).send(Reg)
        } catch (error) {
            next(error)
        }
    },

    // Update Reg by ID
    updateReg: async(req, res, next) => {
        try {
            let id = req.params.id

            const updateReg = await reg.update(req.body, {where: {reg_id: id}})

            if(!reg) {
                throw(createError(404, "Registration does not exist."))
            }
            res.status(200).send(updateReg)
        } catch (error) {
            next(error)
        }
    },
}