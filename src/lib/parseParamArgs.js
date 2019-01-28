
const convertParamsToArray = (params) => {
  if (Array.isArray(params)) {
    return params;
  }
  if (typeof params === 'string') {
    return [params];
  }
  return [];
}

const parseParamArgs = (params) => {
  return convertParamsToArray(params)
    .map(param => {
      const parts = param.split('=');
      return {
        name: parts[0],
        value: parts.slice(1).join('='),
      };
    });
};

module.exports = parseParamArgs;