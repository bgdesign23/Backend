const fs = require("fs");
const Handlebars = require("handlebars");

const readHTMLFile = function (path, replacements) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) reject(err);
      else {
        const template = Handlebars.compile(html);
        const htmlToSend = template(replacements);
        resolve(htmlToSend);
      }
    });
  });
};

module.exports = { readHTMLFile };
