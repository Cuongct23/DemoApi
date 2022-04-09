const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.postReg = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);

        const user = new User(req.body)
        user.passwd = await bcrypt.hash(req.body.passwd, salt);


        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})


    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}
exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.passwd)
        if (!user) {
            return res.status(401).send({error: 'Login failed!Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }
}
exports.getProfile = (req, res, next) => {
    res.send(req.user)
}
exports.postLogout = (req, res, next) => {

}
