'use strict';
const fetch = require('node-fetch')
const cookie = require('cookie')
const cheerio = require('cheerio')
const url = 'http://pastie.org'
exports.CreatePaste = (content)=>{
  return new Promise(async (resolve, reject)=>{
      const fe = await fetch(`${url}/pastes/create`, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "upgrade-insecure-requests": "1",
          "cookie": "language=plaintext",
          "Referer": "http://pastie.org/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `language=plaintext&content=${encodeURIComponent(content)}`,
        "method": "POST"
      })
      const html = await fe.text()
      
      const $ = cheerio.load(html)
      const href = url + $('a').attr('href')
      resolve(href)
  })
}