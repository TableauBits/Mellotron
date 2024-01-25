import fs from 'fs'
import fetch from 'node-fetch'

const USER_INFO_URL = 'https://kalimba.fly.dev/user-info'
const FILE_PATH = 'src/assets/names.json'
 
console.log('start')
fetch(USER_INFO_URL).then(response => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Request to Kalimba failed with status ${response.statusText}.`)
  }
  return response.json()
}).then(data => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data))
  console.log('end')
}).catch(error => console.log(error))