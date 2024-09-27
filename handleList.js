const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("zhengzhi.xlsx");
const memberSheet = workbook.Sheets["名单"];
let memberList = XLSX.utils.sheet_to_json(memberSheet);

const workbook2 = XLSX.readFile("waibao.xlsx");
const memberSheet2 = workbook2.Sheets["名单"];
memberList = memberList.concat(XLSX.utils.sheet_to_json(memberSheet2));
console.log(memberList);

// let data = fs.readFileSync("member_list.txt");
// data = data.toString();
// let memberList = data.split("\n");

// memberList = memberList.map((str) => {
//   let [appartment, companyNo, name] = str.split("|");
//   companyNo = companyNo.trim();
//   name = name.trim();
//   let member = {
//     companyNo,
//     name,
//   };
//   return member;
// });

// console.log(memberList);

fs.writeFile(
  path.resolve(__dirname, "./src/constants.js"),
  `export const memberList = ${JSON.stringify(memberList)}`,
  (err) => {
    if (err) {
      return console.error(err);
    }

    console.log("memberList写入成功");
  }
);
