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
            res.json(user);
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

    //[GET] get-role-position/:type
    getAllcode = async (req, res) => {
        try {
            const type = req.params.type;

            const objCode = await db.Allcode.findAll({
                where: {
                    type: type
                }
            })
            if (!objCode) {
                res.json({
                    errCode: 1,
                    message: `Type is not valid`,
                    objCode: []
                });
            }
            if (objCode) {
                res.json({
                    errCode: 0,
                    message: `Get ${type} successfully`,
                    objCode: objCode
                });
            }
        } catch (err) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new AdminController;