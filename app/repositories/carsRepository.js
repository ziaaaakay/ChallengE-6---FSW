const { Car, User } = require("../models")
const { Op } = require("sequelize")

module.exports = {
    create(createArgs) {
        return Car.create(createArgs)
    },

    update(id, updateArgs) {
        return Car.update(updateArgs, { where: { id }})
    },

    delete(id) {
        return Car.destroy({ where: { id } })
    },

    find(id) {
        return Car.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['name']
                },
                {
                    model: User,
                    as: 'updator',
                    attributes: ['name']
                },
                {
                    model: User,
                    as: 'deletor',
                    attributes: ['name']
                }
            ]
        })
    },

    search(key) {
        return Car.findAll({
            where: {
                [Op.and]: [
                    {
                        available: true
                    },
                    {
                        [Op.or]: [
                            {
                                name: { [Op.substring]: key }
                            },
                            {
                                size: { [Op.substring]: key }
                            }
                        ]
                    }
                ]
            }
        })
    },

    findAll() {
        return Car.findAll()
    },

    findAvailable() {
        return Car.findAll({ where: { available: true } })
    },

    findUserCars(id) {
        return Car.findAll({ where: { createdBy: id } })
    },

    getTotalCars() {
        return Car.count()
    }
}