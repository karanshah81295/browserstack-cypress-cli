'use strict';
const fs = require('fs-extra'),
  path = require('path');

const logger = require("./logger").winstonLogger,
  Constants = require("../helpers/constants"),
  config = require("../helpers/config");

exports.write = function(f, message, args, cb) {
  message = message || 'Creating';
  fs.writeFile(f.path, f.file, function() {
    logger.info(message + " file: " + f.path);
    cb && cb(args)
  });
}

exports.fileExists = function (filePath, cb) {
  fs.access(filePath, fs.F_OK, (err) => {
    let exists = true;
    if (err) {
      exists = false;
    }
    cb && cb(exists);
  });
};

exports.deleteZip = () => {
  return fs.unlink(config.fileName, function (err) {
    if (err) {
      logger.info(Constants.userMessages.ZIP_DELETE_FAILED);
      return 1;
    } else {
      logger.info(Constants.userMessages.ZIP_DELETED);
      return 0;
    }
  });
}

exports.dirExists = function (filePath, cb) {
  let exists = false;
  if (fs.existsSync(path.dirname(filePath), cb)) {
    exists = true;
  }
  cb && cb(exists);
}
