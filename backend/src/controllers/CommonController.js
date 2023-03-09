const db = require("../models/index");

class CommonController {
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

module.exports = new CommonController;