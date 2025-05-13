const fs = require('fs');
const process = require('process')
const axios = require('axios')

const filePath = process.argv[2]

function realFile(filePath){
    fs.readFile(filePath,'utf8', async function(err,data){
    if (err) {
      console.error(`Error reading ${filePath}: ${err}`);
      process.exit(1);
    }
    const urls = data.split('\n').filter(line => line.trim() !== '')  ///  splitting the urls into seperate
    // elements in an array and trimming the empty spaces.
//  [ 'http://rithmschool.com',
//   'http://postgresql.com',
//   'http://foozlemcblargh.com',
//   'https://nodejs.org/api/console.html'
// ]
        for(let url of urls ){
            await fetchAndSave(url.trim())
        }
    })

} 


async function fetchAndSave(url){
    try{
    const res = await axios.get(url);
    const hostname = new URL(url).hostname

    fs.writeFile(hostname,res.data,'utf8',function(err){
        if(err){
            console.error(`Couldnt write to ${hostname}: ${err}`)
        } else{
            console.log(`Wrote to ${hostname}`)
        }
    })
} catch(err){
    console.error(`Axios failed could not download ${url}`)
}


}

realFile(filePath);