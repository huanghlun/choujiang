const fs = require("fs");
const path = require('path');

let data = fs.readFileSync('member_list.txt');
data = data.toString();
let memberList = data.split('\n');

memberList = memberList.map(str => {
  let [nil, appartment, companyNo, name] = str.split('|');
  companyNo = companyNo.trim();
  name = name.trim();
  let member = {
    companyNo,
    name
  }
  return member;
})

console.log(memberList)

fs.writeFile(path.resolve(__dirname, './src/constants.js'), `export const memberList = ${JSON.stringify(memberList)}`, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('memberList写入成功')
})