const fs = require('fs');

const requestHandler=(req,res)=>{
    const url=req.url
    const method = req.method
    if (url===`/`) {
       let data= fs.readFileSync(`message.txt`)
       let body=[]
       body.push(data)
       let parsed=Buffer.concat(body).toString()
       console.log(parsed);
       console.log(data);
       
        res.write(`<html>`)
        res.write(`<head><title>enter Message</title></head>`)
       
        res.write(`<body>${parsed}<form method="post" action="/message"><input type="text" name="message"><button type="submit" >submit</button></form></body>`)
        return res.end()
    }
    
    else if (url===`/message`&&method==`POST`){
        let body=[]
        req.on(`data`,(chunk)=>{
            body.push(chunk)
        })
        req.on(`end`,()=>{
            let parsed=Buffer.concat(body).toString()
            let message=parsed.split(`=`)[1]
            console.log(message);
            fs.writeFileSync(`message.txt`,`${message}`)
            res.statusCode=302
            res.setHeader(`Location`,`/`)
          return  res.end()
        })
       
    }
}

module.exports=requestHandler