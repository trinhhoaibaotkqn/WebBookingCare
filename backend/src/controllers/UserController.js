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
                    { model: db.Markdown, as: 'doctorData', attributes: ['contentHTML', 'contentMarkdown', "description"] },
                ],
                raw: true,
                nest: true
            })
            res.json(user);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-detail-doctor/:id
    getDetailDoctor = async (req, res) => {
        try {
            let id = req.params.id;
            const user = await db.User.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, as: 'doctorData', attributes: ['contentHTML', 'contentMarkdown', "description"] },
                ],
                raw: true,
                nest: true
            })
            res.status(200).json({
                errCode: 0,
                message: "Get detail information doctor successfully",
                user: user
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new UserController;