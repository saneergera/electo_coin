const solc = require('solc');
const fs = require('fs-extra');
const path = require('path');

const buildPath = path.resolve(__dirname,'build');
const contractPath = path.resolve(__dirname,'contracts','Campaign.sol');

fs.removeSync(buildPath);

const source = fs.readFileSync(contractPath, 'utf8' );


const output = solc.compile(source,1).contracts;



fs.ensureDirSync(buildPath);

for(let i in output)
{
  fs.outputJsonSync(

    path.resolve(buildPath,i+'.json').replace(':',''),
    output[i]

  );


}
