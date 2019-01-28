const yaml = require('node-yaml');

const scalarTypes = [
  'Ref',
  'GetAtt',
  'Sub',
  'GetAZs',
  'Base64'
].map(type => new yaml.Type(`!${type}`, {
  kind: 'scalar',
  construct: function (data) {
    const isRef = type === 'Ref';
    return {
      [isRef ? type : `Fn::${type}`]: data,
    };
  },
}));

const sequenceTypes = [
  'Cidr',
  'Sub',
  'GetAtt',
  'FindInMap',
  'Select',
  'ImportValue',
  'Join',
  'Split',
  'And',
  'Equals',
  'If',
  'Not',
  'Or'
].map(type => new yaml.Type(`!${type}`, {
  kind: 'sequence',
  construct: function (data) {
    return {
      [`Fn::${type}`]: data,
    };
  }
}));

const mappingTypes = [
  'Transform'
].map(type => new yaml.Type(`!${type}`, {
  kind: 'mapping',
  construct: function (data) {
    return {
      [`Fn::${type}`]: data,
    };
  }
}));

module.exports = yaml.createSchema(scalarTypes.concat(sequenceTypes).concat(mappingTypes));