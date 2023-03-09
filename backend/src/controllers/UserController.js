const db = require("../models/index");

class UserController {

    //[GET] get-top-doctor-home
    getTopDoctorHome = async (req, res) => {
        try {
            let limitInput = req.params.limit;
            let limit;
            if (!limitInput) {
                limit = 10;
            } else {
                limit = parseInt(limitInput);
            }
            const user = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                where: {
                    roleid: "R2"
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            res.json(user);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new UserController;