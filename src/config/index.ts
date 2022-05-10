export default {
    logger: {
      logLevel: process.env.LOG_LEVEL || 'info',
    },
    dynamoDb : {
      target: process.env.TARGET_TABLE || ''
    }
};
  