import UserQueries from './query';
import bcrypt from 'bcrypt';

const UserServices = {
    authenticate: async (req) => {

        const user = await UserQueries.authenticate(req.body.namefield);
        console.log(user);
        
        if(!user){
            return { status: 400, payload: { success: false, message: 'user not found' } };
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                return { status: 201, payload: { success: true, message: 'wellcome' } };
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
    }
}

export default UserServices