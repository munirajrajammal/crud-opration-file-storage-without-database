var http=require('http');
var fs=require('fs');

var server=http.createServer(function(req ,res){
    //console.log(req);
    var body="";
    res.setHeader('Access-Control-Allow-Origin','*');
    req.on('data',function(chunk){
        console.log(chunk);
        body+=chunk;
    })    
    req.on('end',function(){
        console.log(body);
        console.log('-------------------create start----------------------------');
        if(req.url=='/create'){
            fs.readFile('../test.json','utf8',function(err,chunk){
               let dataval=JSON.parse(body)
                dataval['id']=Date.now();
                temp=[];
                if(chunk)
                temp=JSON.parse(chunk);
                temp.push(dataval);
                fs.writeFile('../test.json',JSON.stringify(temp),function(err,data){
                    if(err)
                        console.log(err)
                    else{
                        console.log('saved successfull')
                        console.log('----------------------------------create end--------------------')
                    }
                    res.end('create');
                    })
            })
        }
         else if(req.url=='/update'){
            console.log('----------------------------------update start--------------------------')
            let dataval=JSON.parse(body)
            fs.readFile('../test.json','utf8',function(err,chunk){
                 let  temp=JSON.parse(chunk)
                 for(i=0;i<temp.length;i++){
                     if(temp[i].id==dataval.id){
                         temp[i].name=dataval['name']
                         temp[i].age=dataval['age']
                         temp[i].email=dataval['email']
                         break;
                     }
                 }

                 fs.writeFile('../test.json',JSON.stringify(temp),function(err,data){
                     if(err)
                         console.log(err)
                     else{
                         console.log('saved successfull')
                         console.log('---------------------------------update end--------------------------')
                     }
                     res.end('update complete');
                     })
             })
        }
         else if(req.url=='/delete'){
            console.log('----------------------------------------delete start---------------------------')
            let dataval=JSON.parse(body)
            fs.readFile('../test.json','utf8',function(err,chunk){
                let  temp=JSON.parse(chunk)
                let deleted=[];
                for(i=0;i<temp.length;i++){
                    if(temp[i].id==dataval.id){
                        console.log('inside', temp[i], dataval)
                        deleted=temp.splice(i,1);
                        break;
                    }
                }
            fs.writeFile('../test.json',JSON.stringify(temp),function(err,data){
                if(err)
                    console.log(err)
                else{
                    console.log('saved successfull')
                    console.log('--------------------------------------delete end------------------------------')
                }
                res.end(deleted.toString);
                })
            });
        } 
        else{
            console.log('------------------------read start---------------------------')
            fs.readFile('../test.json','utf8',function(err,chunk){
                console.log('chunk',chunk);
                res.end(chunk);
                console.log('--------------------------read end------------------------')
            })
        } 
    })
})
server.listen(4000);
console.log('server start');
