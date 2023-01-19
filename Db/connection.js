const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGOGb_CONNECT_ADDRESS)
    .then(() => {
        console.log('database is connected')
    }).catch((error) => {
        console.log('Not Found', { error })
    })