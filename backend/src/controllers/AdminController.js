const adminService = require("../services/adminService");
const db = require("../models/index");

class AdminController {

    //[POST] create-new-user
    createUser = async (req, res) => {
        try {
            let data = await adminService.createUser(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-user/:role
    getAllUserByRole = async (req, res) => {
        try {
            const roleid = req.params.role;
            const user = await db.User.findAll({
                where: {
                    roleid: roleid
                }, attributes: { exclude: ['password'] },
            })
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[PATCH] edit-user/:id
    editUser = async (req, res) => {
        try {
            const id = req.params.id;
            const dataUpdate = req.body;
            const data = await adminService.editUser(id, dataUpdate);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[DELETE] delete-user/:id
    deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await adminService.deleteUser(id);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-role
    getRole = async (req, res) => {
        try {
            const objCode = await db.Allcode.findAll({
                where: {
                    type: "ROLE"
                }
            });
            if (!objCode) {
                res.json({
                    errCode: 1,
                    message: `Get role fail`,
                    objCode: []
                });
            }
            if (objCode) {
                res.json({
                    errCode: 0,
                    message: `Get Role successfully`,
                    objCode: objCode
                });
            }
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[POST] save-info-doctor/:id
    saveInfoDoctor = async (req, res) => {
        try {
            const data = await adminService.saveInfoDoctor(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-info-doctor/:doctorId
    getInfoDoctor = async (req, res) => {
        try {
            const doctorId = req.params.doctorId;
            const info = await db.Markdown.findOne({
                where: {
                    doctorId: doctorId
                }
            })
            res.status(200).json({
                errCode: 0,
                message: "Get information doctor successfully",
                info: info
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    createSpecialty = async (req, res) => {
        try {
            let data = await adminService.createSpecialty(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllSpecialty = async (req, res) => {
        try {
            const specialty = await db.Specialty.findAll();
            res.status(200).json({
                errCode: 0,
                message: "Get list specialty successfully",
                data: specialty
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    editSpecialty = async (req, res) => {
        try {
            const id = req.params.id;
            const dataUpdate = req.body;
            const data = await adminService.editSpecialty(id, dataUpdate);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    deleteSpecialty = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await adminService.deleteSpecialty(id);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    createClinic = async (req, res) => {
        try {
            let data = await adminService.createClinic(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllClinic = async (req, res) => {
        try {
            const clinic = await db.Clinic.findAll();
            res.status(200).json({
                errCode: 0,
                message: "Get list Clinic successfully",
                data: clinic
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    editClinic = async (req, res) => {
        try {
            const id = req.params.id;
            const dataUpdate = req.body;
            const data = await adminService.editClinic(id, dataUpdate);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    deleteClinic = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await adminService.deleteClinic(id);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new AdminController;