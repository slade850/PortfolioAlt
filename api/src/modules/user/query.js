import db from "../../setup/database";

// Notre query s'occupe d'effectuer la requête sur la base de donneés et de renvoyer au service les datas
const Query = {
    authenticate: (user) => {
        return new Promise((resolve, reject) => {
           let sqlQuery = "SELECT * FROM `users` WHERE `username` = "+`'${user}'`+ " OR email =" +`'${user}'`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    },
    register: (user) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users VALUES (NULL, "${user.username}", "${user.hashedPassword}", "${user.email}", "user");`;
            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    }
}

export default Query