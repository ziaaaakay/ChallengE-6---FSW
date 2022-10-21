const carsRepository = require("../repositories/carsRepository")

module.exports = {
    create(requestBody) {
        return carsRepository.create(requestBody)
    },

    update(id, requestBody) {
        return carsRepository.update(id, requestBody)
    },

    delete(id) {
        return carsRepository.delete(id)
    },

    get(id) {
        return carsRepository.find(id)
    },

    getAvilable() {
        return carsRepository.findAvailable()
    },

    search(key) {
        return carsRepository.search(key)
    },

    async list() {
        try {
            const cars = await carsRepository.findAll()
            const carsCount = await carsRepository.getTotalCars()

            return {
                data: cars,
                count: carsCount,
            }
        } catch (err) {
            throw err
        }
    }
}