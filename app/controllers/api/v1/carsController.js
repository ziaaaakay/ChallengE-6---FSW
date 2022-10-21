const carsService = require("../../../services/carsService")
const cloudinary = require("../../../../cloudinary")

module.exports = {
    async list(req, res) {
        const isAdmin = await req.user.role

        if (isAdmin === "member") {
            res.status(401).json({ message: "Danger area, not user access zone" })
            return
        }

        carsService.list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "OK",
                    data: { cars: data },
                    meta: { total: count }
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    listAvailable(req, res) {
        carsService.getAvilable()
            .then((cars) => {
                res.status(200).json({
                    status: "OK",
                    data: cars
                })
            })
            .catch((err) => {
                res.status(404).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    },

    show(req, res) {
        carsService.get(req.params.id)
            .then((cars) => {
                res.status(200).json({
                    status: "OK",
                    data: cars
                })
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    search(req, res) {
        const key = req.params.key

        carsService.search(key)
            .then((cars) => {
                res.status(200).json({
                    status: "OK",
                    data: cars
                })
            })
            .catch((err) => {
                res.status(404).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    },

    async create(req, res) {
        const creator = await req.user.id
        const isAdmin = await req.user.role

        if (isAdmin === "member") {
            res.status(401).json({ message: "Danger area, not user access zone" })
            return
        }

        if (req.file == null) {
            const body = {
                ...req.body,
                available: true,
                createdBy: creator
            }

            carsService.create(body)
                .then((cars) => {
                    res.status(201).json({
                        status: "Created",
                        data: cars
                    })
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "FAIL",
                        message: err.message
                    })
                })
        } else {
            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`

            cloudinary.uploader.upload(file, { folder: 'samples' }, function (err, result) {
                if (!!err) {
                    res.status(400).json({
                        status: "Upload Fail",
                        errors: err.message
                    })
                    return
                }

                const body = {
                    ...req.body,
                    available: true,
                    createdBy: creator,
                    image: result.url
                }

                carsService.create(body)
                    .then((cars) => {
                        res.status(201).json({
                            status: "Created",
                            data: cars
                        })
                    })
                    .catch((err) => {
                        res.status(422).json({
                            status: "FAIL",
                            message: err.message
                        })
                    })
            })
        }
    },

    async update(req, res) {
        const updator = await req.user.id
        const isAdmin = await req.user.role

        if (isAdmin === "member") {
            res.status(401).json({ message: "Danger area, not user access zone" })
            return
        }

        if (req.file == null) {
            const payload = {
                ...req.body,
                updatedBy: updator
            }

            carsService.update(req.params.id, payload)
                .then(() => {
                    res.status(200).json({
                        status: "OK"
                    })
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "FAIL",
                        message: err.message
                    })
                })
        } else {
            const body = await carsService.get(req.params.id)
            const oldImage = body.dataValues.image

            if (oldImage !== null) {
                const getImageID = oldImage.split("/").pop().split(".")[0]

                await cloudinary.uploader.destroy(`samples/${getImageID}`)
            }

            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`

            cloudinary.uploader.upload(file, { folder: 'samples' }, function (err, result) {
                if (!!err) {
                    res.status(400).json({
                        status: "UPLOAD FAIL",
                        errors: err.message
                    })
                    return
                }

                const payload = {
                    ...req.body,
                    updatedBy: updator,
                    image: result.url
                }

                carsService.update(req.params.id, payload)
                    .then(() => {
                        res.status(200).json({
                            status: "OK"
                        })
                    })
                    .catch((err) => {
                        res.status(422).json({
                            status: "FAIL",
                            message: err.message
                        })
                    })
            })
        }
    },

    async destroy(req, res) {
        const deletor = await req.user.id
        const isAdmin = await req.user.role

        if (isAdmin === "member") {
            res.status(401).json({ message: "Danger area, not user access zone" })
            return
        }

        const payload = {
            deletedBy: deletor,
            available: false
        }

        carsService.update(req.params.id, payload)
            .then(() => {
                res.status(204).end()
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    }
}