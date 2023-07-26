/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        logger: {
            warn: function(message) {
                console.log(message)
            },
            debug: function(message) {
                console.log(message)
            }
        }
    }
}

module.exports = nextConfig
