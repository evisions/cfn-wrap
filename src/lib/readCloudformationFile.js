const yaml = require('node-yaml');
const fs = require('fs');
const cloudformationSchema = require('./cloudformationSchema');

const readCloudformationFile = (templateFilePath, fileType) => {
  // parse the template file into an object
  if (templateFilePath.endsWith('.json') || fileType === 'json') {
    return JSON.parse(fs.readFileSync(templateFilePath, 'utf8'));
  }
  return yaml.readSync(templateFilePath, { schema: cloudformationSchema });
};

module.exports = readCloudformationFile;