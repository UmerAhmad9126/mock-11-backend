
var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[0];
    console.log('token:', token)

    if (token) {

        const decode = jwt.verify(token, "shhhhh");
        console.log('decode:', decode);

        if (decode) {
            next();
        }
        else {
            res.status(400).send({ msg: "Login Required" })
        }

    }
    else {
        res.status(400).send({ msg: "Login Required" })
    }
};

module.exports = {
    auth
}