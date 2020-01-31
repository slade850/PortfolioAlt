import PageServices from './service'

const PageController = {
    allPages: (req, res) => {
        PageServices.allPages(req, result => {
            result.success ? res.status(200).send(result) : res.status(404).send(result)
        })
    },
    pageById: (req, res) => {
        PageServices.pageById(req, result => {
            result.success ? res.status(200).send(result) : res.status(404).send(result)
        })
    }
}

export default PageController