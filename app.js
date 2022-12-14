const http = require("http");
const { title } = require('process');

const server = http.createServer();

const users = [{
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
  {
    id :3,
    name : "new user 1"
  },
  {
    id : 4,
    name : "new user 2"
  }];
const posts = [  {  id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 2,
  },
  {
    id:3,
    imgeUrl : "내용 1",
    content: "sampleContent3"
  },
  {
    id:4,
    imgeUrl : "내용 2",
    content : "sampleContent4"
  }];

function datas(arr1, arr2){
  const newData = [];
  for(let i=0; i<arr1.length; i++){
    let data = {
      userID : arr1[i].id,
      userName : arr1[i].name,
      postingId : arr2[i].id,
      postingContent : arr2[i].content
    }
    if (posts[i].title){
       data.postingTitle = arr2[i].title}
    else if (posts[i].imgeUrl){
       data.postingImageUrl = arr2[i].imgeUrl}

    newData.push(data)
    } return newData;  }

const httpRequestListener = function (request, response){
    const {url, method} = request
        if(method === "POST") {
            if(url === "/users/signup"){
                let body = "";

                request.on("data",(data)=> {
                    body += data;
                });
                request.on("end",()=>{
                    const user = JSON.parse(body);
                    users.push({
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        password: user.password,
                    });
                response.end(JSON.stringify({message : 'userCreated'}));
                })
            } else if(method === "POST"){
                if(url === "/posts"){
                  let body = "";

                request.on("data",(data)=> {
                    body += data;
                });
                request.on("end",()=>{
                    const post = JSON.parse(body);
                    posts.push({
                        id : post.id,
                        title : post.title,
                        content : post.content,
                        userId : post.userId,
                    });
  
                })} response.end(JSON.stringify({message : 'postCreated'}));
                } 
                } else if(method === "GET"){
                  if(url === "/posts/look"){
                      response.writeHead(200, {'content-Type': 'application/json'});
                      response.end(JSON.stringify({data : datas(users, posts)}));
                    }
                  }
            } 





server.on("request", httpRequestListener);

const IP = '127.0.0.1';
const PORT = 8000;
    
server.listen(PORT, IP, function(){
            console.log(`Listening to request on ip ${IP} & port ${PORT}`)
})
