import UserQueries from './query';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserServices = {
    authenticate: async (req) => {
        const user = await UserQueries.authenticate(req.body.namefield);
        
        if(!user){
            return { status: 400, payload: { success: false, message: 'user not found' } };
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                let payload = {userId: user.id, username: user.username};
                let token = jwt.sign(payload, 'secureToken', { expiresIn: 900});
                return { status: 201, payload: { success: true, message: 'wellcome', token: token } };
            }
            return { status: 400, payload: { success: false, message: 'wrong password' } };
        }
    },
    register: async (req) => {
        let { username, password, email } = req.body;

        if (typeof username !== "string" || typeof password !== "string" || typeof email !== "string") {
            return { status: 400, payload: { success: false, message: "All fields are required and must be a string type" } }
        }

        return bcrypt.genSalt()
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => UserQueries.register({ username, hashedPassword, email }))
        .then(user => ({ status: 201, payload: { success: true, message: 'User successfully registered' } }))
        .catch(err => ({ status: 400, payload: { success: false, message: err } }))
    },
    getUserById: async (id) => {
        const user = await UserQueries.getUserById(id);
        if(!user){
            return { status: 400, payload: { success: false, message: 'user not found' } };
        }
        return { status: 200, payload: { success: true, user: user }
    }
    },
    UserCall: async ()=> {
        return { status: 200, payload: { success: true, message: "wellcome"}}
    }
}

export default UserServices