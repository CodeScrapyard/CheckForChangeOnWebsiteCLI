#!/usr/bin/env node

let request = require('request');
let cheerio = require('cheerio');
let debug = false;
let buffer = [];
let urls = [
  {
    url: 'https://www.your-site.com/your-path',
    selector: '#your-selector'
  },
];


checker();
setInterval(()=>{
  checker();
}, 60 * 1000);

function checker() {
  urls.forEach(url=>{
    check(url.url,url.selector);
  });
}

function check(url,selector) {
  request(url, function (error, response, body) {
    let $ = cheerio.load(body);
    let html = $(selector).html();

    if (buffer[url]) {
      // Url was buffered before
      if (buffer[url] === html) {
        console.log('No change!', url);
      } else {
        buffer[url] = html;
        console.log('\x1b[36m%s\x1b[0m','Change on', url);
      }

    } else {
      // buffer url
      buffer[url]=html;
      console.log("------ Init", url);
      if (debug) console.log(html);
    }
  });
}
