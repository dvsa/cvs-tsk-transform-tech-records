export default {
    logger: {
      logLevel: process.env.LOG_LEVEL || 'info',
    },
    dynamoDb : {
      target: process.env.target_table || ''
    }
};
  