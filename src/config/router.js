const semver = require('semver')

class Router {
    static handler(basePath, req, res, next) {
        if (req.url.indexOf(basePath) === -1) {
            return next(new Error('This is an invalid base path'))
        }

        req.originalUrl = req.url
        req.url = req.url.replace(basePath || '', '')

        let pieces = req.url.replace(/^\/+/, '').split('/')
        let version = pieces[0]

        version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3')
        version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0')
        version = version.replace(/v(\d{1})/, '$1.0.0')

        if (semver.valid(version)) {
            req.url = req.url.substr(pieces[0].length + 2)
            req.headers = req.headers || []
            req.headers['accept-version'] = version
        } else {
            return next(new Error('This is an invalid version'))
        }

        next()
    }
}

module.exports = Router
