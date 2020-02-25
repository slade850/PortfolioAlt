import UserServices from './service';

const UserController = {
    authenticate: (req, res) => {
        UserServices.authenticate(req)
            .then(result => res.status(result.status).send(result.payload))
            .catch(err => res.status(500).send(err))
    },
    register: (req, res) => {
        UserServices.register(req)
            .then(result => res.status(result.status).send(result.payload))
    }
}

export default UserController