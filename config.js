
'use strict'

const uri = 'mongodb://app_batalha:121294@appbatalha-shard-00-00-vpocl.mongodb.net:27017,appbatalha-shard-00-01-vpocl.mongodb.net:27017,appbatalha-shard-00-02-vpocl.mongodb.net:27017/appBatalha?ssl=true&replicaSet=appBatalha-shard-0&authSource=admin'
const localUri = 'mongodb://127.0.0.1:27017/API_APP_BATALHA'

module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        // uri: 'mongodb://127.0.0.1:27017/API_APP_BATALHA',
        uri: uri,
    },
}