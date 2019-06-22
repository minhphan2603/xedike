const jwt = require('jsonwebtoken');

const authenticating = (req,res,next) => { 
    // verify token
    //     thanhcong: return next()
    //     thatbai: res.json(err)
    const token = req.header('Authorization');
    
    try {
        const decoded = jwt.verify(token,'cybersoft');
        // console.log('giai ma: ',decoded);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(403).json('khong the login')
    }
}

const authorizing = (userTypeArray) => {
    return (req,res,next) => {
        const {userType} = req.user

        if (userTypeArray.includes(userType)) {
            next()
        } else {
             res.status(403).json('ban khong co quyen truy cap');
        }
       
    }

}

module.exports = {authenticating , authorizing};