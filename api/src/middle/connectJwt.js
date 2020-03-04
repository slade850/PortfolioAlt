import jwt from 'jsonwebtoken';
import UserServices from '../modules/user/service'

function jwtAuthenticate(req, role){
    return new Promise((resolve, reject) => {
        jwt.verify(req.headers.authorization.split(' ')[1], 'secureToken', function(err, decoded) {
            // err
            if(err){
                resolve({ authorize: false, message: 'fuck! your token is invalid' });
            }
            // decoded
            if(decoded){
                UserServices.getUserById(decoded.userId)
                .then((result => {
                    console.log(result.payload.user)
                result.payload.success && (result.payload.user.role_name == role || role == null) ? resolve({ authorize: true, message: 'welcome' }) : resolve({ authorize: false, message: "you are not allowed"});
            }))
            }
        })    
    })
}

const connectJwt = {
    adminOnly: async (req, res, next) => {
        let authorize = await jwtAuthenticate(req, 'admin');
        authorize.authorize ? next() : res.status(403).send(authorize.message);
        },
    allUser: async (req, res, next) => {
        let authorize = await jwtAuthenticate(req, null);
        authorize.authorize ? next() : res.status(403).send(authorize.message);
        }    
};


export default connectJwt;