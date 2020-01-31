import PageQueries from './query'

const PageServices = {
    allPages: (req, callback) => {
        PageQueries.getAllPages(req.body, res =>{
            return callback({success: true, message: res})
        }, err => {
            return callback({success: false, })
        })
    },
    pageById: (req, callback) => {
        PageQueries.getPageById(req.params.id, res =>{
            return callback({success: true, message: res})
        }, err => {
            return callback({success: false, })
        })
    }
}

export default PageServices