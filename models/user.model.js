var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_demoApi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt=require('bcrypt');
const UserSchema = new mongoose.Schema(
    {
        username: 'String',
        passwd: 'String',
        email: 'String',
        tokens: [{
            token: {
                type: String,
                required: true,
            }
        }]
    },
    {collection: 'demoApi'}
);
UserSchema.methods.generateAuthToken = async function () {
    console.log(chuoi_ky_tu_bi_mat);
    const user = this
    console.log(user)
    const token = jwt.sign({_id:user._id},chuoi_ky_tu_bi_mat)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.statics.findByCredentials = async (username, passwd) => {

    const user = await User.findOne({username})
    if (!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(passwd, user.passwd)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}
const User=mongoose.model('User',UserSchema);
module.exports=User;