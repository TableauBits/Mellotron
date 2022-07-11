console.log('start')
fs = require('fs')

PATH = 'src/assets/names.json'

// TODO: generate NAMES from a response of Kalimba (https://livecodestream.dev/post/5-ways-to-make-http-requests-in-javascript/)
NAMES = {
  "test1": "SCHNOZ",
  "test2": "pamplemousse"
} 

fs.writeFileSync(PATH, JSON.stringify(NAMES))
console.log('end')