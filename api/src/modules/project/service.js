import ProjectQueries from './query'

const ProjectServices = {
    allProjects: (req, callback) => {
        ProjectQueries.getAllProjects(req.body, res =>{
            return callback({success: true, message: res})
        }, err => {
            return callback({success: false, })
        })
    }
}

export default ProjectServices