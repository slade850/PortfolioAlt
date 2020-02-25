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
    getUser: (param, successCallback, failureCallback) => {
        let sqlQuery = "SELECT * FROM `users` ";
        db.query(sqlQuery, (err, rows, fields, res) => {
            if (err) {
                return failureCallback(err);
            }
            if (rows.length > 0) {
                return successCallback(rows);
            } else {
                return failureCallback("No pages.");
            }
        })
    }
}

export default Query