const request = require('request');
const fs = require('fs');
const readline = require('readline');
const args = process.argv.slice(2)

const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
})

let fileExist = true;

fs.stat(args[1], (err,stats) => {
  if (err) {
    fileExist = false;
    //console.log(fileExist)
    return
  }
  //console.log(stats.isFile());
});

request(args[0], (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (error) {
    console.log('Invalid URL, exited program');
    rl.close()
    } else {
    if (fileExist === true) {
      rl.question('File already exist do you want to overwrite the file? Y or N ', (answer) => {
        if(answer === 'Y') {
          fs.writeFile(args[1], body, err => {
            if (err) {
              console.error(err)
              return;
            }
          })
          console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`)
          rl.close()
        } else {
          console.log(`Skip and exited the app`)
          rl.close()
        }
      })
    } else if (fileExist === false) {
      fs.writeFile(args[1], body, err => {
        if (err) {
          console.log(`Invalid file path, does not exist`)
          rl.close()
        } else {
          console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`)
          rl.close()
        }
      })
    }
  }
});
