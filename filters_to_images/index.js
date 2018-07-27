const filterous = require('filterous');
const fs = require('fs');
const shell = require('shelljs');
const startIdx = parseInt(process.argv[2])
const bufferSize = parseInt(process.argv[3])
console.log(startIdx + " : " + bufferSize); 

const testFolder = './unfiltered_images/';
// const testFolder = './images/dataset/';   // hp laptop data path
// const testFolder = './testing_images/';

const filters = [
  "clarendon", "gingham", "moon", "lark", "reyes",
  "juno", "slumber", "crema", "ludwig", "aden", "perpetua",
  "amaro", "mayfair", "rise", "hudson", "valencia", "xpro2",
  "sierra", "willow", "lofi", "inkwell", "hefe", "nashville",
  "stinson", "vesper", "earlybird", "brannan", "sutro", "toaster",
  "walden", "1977", "kelvin", "maven", "ginza", "skyline",
  "dogpatch", "brooklyn", "helena", "ashby", "charmes"
];

console.log('Starting');


const files = fs.readdirSync(testFolder);
// console.log(files.length) // Ans: 20105
for(let i = startIdx; i < files.length; i++){
  if(i >= startIdx + bufferSize) break;

  const file = files[i];
  // to have a random filter
  // const randFilter = filters[Math.floor(Math.random() * filters.length)];

  // manually choose a filter
  const randFilter = 'brooklyn';
  const filePath = testFolder + file;
  let datasetCategory = 'train'; // will have one of three values ( 'train', 'test', 'validate' )
  // this solution does not work with buffer
  if(i > startIdx + 1600){ datasetCategory = 'validate' }
  else if(i > startIdx + 2000){ datasetCategory = 'test' }
  // file will be writen to this place
  const writeFilePath = './filter_classification_dataset/' + randFilter + '/' + datasetCategory + '/';
  // if the folder does not exist, make it
  if (!fs.existsSync(writeFilePath)){
    shell.mkdir('-p', writeFilePath);
  }
  const buffer = fs.readFileSync(filePath)
  console.log(file);
  let f = filterous.importImage(buffer, { scale: 1, format: 'jpg' })
    .applyInstaFilter(randFilter)
    .save(writeFilePath + file);

}




// for every file
// fs.readdirSync(testFolder).forEach(file => {
//   // read the file and apply filter
//   const randFilter = filters[Math.floor(Math.random() * filters.length)];
//   const filePath = testFolder + file;
//   try {

//     const buffer = fs.readFileSync(filePath)
//     console.log(file);
//     let f = filterous.importImage(buffer, { scale: 1, format: 'jpg' })
//       .applyInstaFilter(randFilter)
//       .save('filtered_images/' + file);
//     // fs.readFile(filePath, (err, buffer) => {
//     // });
//   } catch (error) {
//     console.log(error)
//   }
// });







