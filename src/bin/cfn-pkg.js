const path = require('path');
const argv = require('yargs').argv;
const fs = require('fs');
const yaml = require('node-yaml');
const resolveWorkingPath = require('../lib/resolveWorkingPath');
const parseParamArgs = require('../lib/parseParamArgs');
const readCloudformationFile = require('../lib/readCloudformationFile');
const wrapCloudformationTemplate = require('../lib/wrapCloudformationTemplate');

if (!argv.template) {
  console.log('--template is required');
  process.exit(1);
  return;
}

// look at input params to determine which should be hard-coded
const params = parseParamArgs(argv.param);

// get the absolute path to the template
const resolvedTemplatePath = resolveWorkingPath(argv.template);

const inputTemplate = readCloudformationFile(resolvedTemplatePath);

const outputTemplate = wrapCloudformationTemplate(inputTemplate, resolvedTemplatePath, params);

if (argv.output) {
  const outputFilePath = resolveWorkingPath(argv.output);
  if (argv.format === 'json' || outputFilePath.endsWith('.json')) {
    fs.writeFileSync(outputFilePath, JSON.stringify(outputTemplate, null, 2), 'utf8');
  } else {
    yaml.writeSync(outputFilePath, outputTemplate, 'utf8');
  }
} else {
  if (argv.format === 'json') {
    console.log(JSON.stringify(outputTemplate, null, 2));
  } else {
    console.log(yaml.dump(outputTemplate));
  }
}