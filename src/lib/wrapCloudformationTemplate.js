
const wrapCloudformationTemplate = (inputTemplate, inputTemplatePath, params) => {
  // get all the input parameter names
  const allParameterNames = Object.keys(inputTemplate.Parameters);

  // compute the input parameters for the new template
  // with the hardcoded parameters removed
  const inputParameters = {};
  allParameterNames.forEach(name => {
    const isHardcodedParameter = !!params.find(p => p.name === name);
    if (!isHardcodedParameter) {
      inputParameters[name] = inputTemplate.Parameters[name];
    }
  });

  // compute the stack input parameters with the hardcoded values
  // inserted
  const stackParameters = {};
  allParameterNames.forEach(name => {
    const hardcodedParameter = params.find(p => p.name === name);
    if (hardcodedParameter) {
      stackParameters[name] = hardcodedParameter.value;
    } else {
      stackParameters[name] = { Ref: name };
    }
  });

  const allOutputNames = Object.keys(inputTemplate.Outputs || {});

  const templateOutputs = {};
  allOutputNames.forEach(name => {
    templateOutputs[name] = {
      Description: inputTemplate.Outputs[name].Description,
      Value: {
        'Fn::GetAtt': `ReferenceStack.Outputs.${name}`,
      },
    };
  });

  const outputTemplate = {
    AWSTemplateFormatVersion: '2010-09-09',
    Description: inputTemplate.Description,
    Parameters: inputParameters,
    Resources: {
      ReferenceStack: {
        Type: 'Type: AWS::CloudFormation::Stack',
        Properties: {
          TemplateURL: inputTemplatePath,
          Parameters: stackParameters,
        },
      },
    },
    Outputs: templateOutputs,
  };

  return outputTemplate;
};

module.exports = wrapCloudformationTemplate;