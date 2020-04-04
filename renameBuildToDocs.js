var fs = require('fs');
var rimraf = require('rimraf');

rimraf('./docs', () => {
    fs.renameSync('./build', './docs')
});