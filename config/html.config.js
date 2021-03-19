const {readFileSync} = require('fs')

const htmlConfig = {
    generate: async (template)=>{
        try {
            const html= readFileSync(`./templates/${template}`)
            return ({success: true, message: `ok`, html})
        } catch (error) {
            return ({success: false, message: `fail`})
        }
    }
    
}

module.exports = htmlConfig;
