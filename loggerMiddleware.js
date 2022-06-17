const logger = (request,response, next) => {
    console.log('Logger');
    next();
}

module.exports = logger;