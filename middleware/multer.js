const multer = require('multer')
const { promisify } = require('util')

const Mkdirp = async path => {
    if (!path || path.length === 0) throw new Error('invalid path')
    path = path.replace(/\\/gi, '/')

    const paths = path.split('/')
    let currentPath = ''
    
    for (let i=0; i<paths.length; i++) {
        currentPath += `${paths[i]}/`
        if (!(await IsExistAsync(currentPath))) await MkdirAsync(currentPath)
    }
}

const IsExistAsync = async path => {
    try {
        await promisify(fs.access)(path)
        return true
    }
    catch (e) {
        return false
    }
}

const MkdirAsync = async path => {
    try {
        await promisify(fs.mkdir)(path)
    }
    catch (e) {
        if (e && e.code === 'EEXIST') return null
        else throw e
    }
}

const diskStorage = GetPath => multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const savePath = await GetPath(req)
            req.body.folderPath = savePath
            
            await Mkdirp(savePath)
            cb(null, savePath)
        }
        catch (e) {
            console.log(e)
            cb(e)
        }
    },
    filename: function (req, file, cb) {
        req.body.originalname = file.originalname
        cb(null, file.originalname)
    }
})
const upload = GetPath => multer({ storage: diskStorage(GetPath) }).array('source')

module.exports = GetPath => (req, res, next) => {
    upload(GetPath)(req, res, err => {
        if (err) next(err)
        else next()
    })
}