const path = require('path');

const resolveWorkingPath = (filePath) => {
  if (filePath.startsWith('/')) {
    return argv.templateFile;
  } else {
    return path.join(process.cwd(), filePath);
  }
};

module.exports = resolveWorkingPath;