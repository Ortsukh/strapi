'use strict';

const crypto = require('crypto');

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = ({ useTypeScript }) => {
  // resolve ts or js version depending on project type
  const language = useTypeScript ? 'ts' : 'js';

  const tmpl = fs.readFileSync(path.join(__dirname, language, `admin-config.template`));
  const compile = _.template(tmpl);

  return compile({
    adminJwtToken: crypto.randomBytes(16).toString('hex'),
    useTypeScript,
  });
};
