module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("Users", 'image', {
            type: Sequelize.BLOB("long"),
            allowNull: true,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("Users", 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};