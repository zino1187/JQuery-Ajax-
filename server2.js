/*
현재  node.js 서버는 너무 기본 기능만 갖추고 있으므로 업그레이드
하자!!
*/
var http=require("http"); //기본 서버 모듈..기능이 별로 없다

//express는 node 이미 포함되어 있지 않은 외부 모듈이므로, 
//다운로드 받아야 한다...
//nodejs 가 인기가 있는 이유는 외부 모듈들이 너무나 많이 무료로
//공유되고 있기 때문이며, 특히 모듈을 설치할때 , npm install 명령어
//를 사용하여 정말로 쉽게 다운로드 받을수 있다...
//주의) 모듈 설치는 웹서버 루트에서 진행한다...
var express=require("express"); //기본 서버 모듈의 기능을
										//상당히 보완해주는 모듈
var fs=require("fs");//내부모듈이므로 설치 불필요...
								//FileSystem 의 약자로 주로 파일과 관련된 작업
								//지원함.. 아주 중요..
//기본 서버에 업그레이드!!!
var app=express(); //express 객체 생성
var server= http.createServer(app); //업그레이드 서버!!

//IIS 와 같은 완제품 서버에서의 기능처럼, 클라이언트가 서버상의
//자원을 요청할때 그대로 보내주는 기능을 구현해 본다!!
//app.use("클라이언트가 요청시 사용할 url")
//누군가가 브라우저 주소창에 /index라고 치고 들어오면 아래의
//메서드가 동작을 시도하고, 그 요청을 처리함...
app.use("/index", function(request, response){
	console.log("클라이언트가 메인 페이지를 원합니다");
	//클라이언트에게 index.html 의 내용을 그대로 보내주자!!
	//이것이 바로 서버의 의무다!!
	//200은 성공을 의미하는 서버의 상태 코드를 말하고, 그리고 이 
	//숫자는 w3c에서 정한 표준코드... ex) 404 파일없음,500 서버오류
	//클라이언트에게 서버의 응답 메세지 데이터의 형식을 알려주는 MIME
	//타입을 의미하며, 만약 이미지 인경우 image/jpeg, audio/mp3
	response.writeHead(200, {"Content-Type":"text/html"});

	//서버에서 클라이언트에게 html 문서의 내용을 보내주기 위해서는 
	//해당 파일을 한줄씩 읽어들여 문자열로 구성하여 전송해줘야 한다...
	//하지만,,,인간의 손으로 하기엔 너무 벅차다...
	//해결책) nodejs 자체적으로 파일을 읽어들여 변수에 모아주는 모듈
	//이 지원된다...
	fs.readFile("./index.html", function(error, data){
		if(error){
			console.log(error , "읽기실패");
		}else{
			console.log(data.toString());
			response.end(data);
		}
	});

});

//member.html 요청을 처리하는 메서드 정의 
app.use("/member", function(request, response){
	fs.readFile("./member.html", function(error, data){
		if(error){
			console.log(error , "읽기실패");
		}else{
			console.log(data.toString());
			response.end(data);
		}
	});
});

/* 현재 우리 서버의 문제점 
	모든 html 마다 1:1 대응하는 메서드를 작성해야 한다..
	이 경우, 만일 html 문서의 수가 200개라면???
	app.use()  메서드도 200개 작성해야 한다..
	해결책) html, css, image와 같은 자원들을 정적 자원이라
	하며, 이러한 정적 자원의 경우엔 굳이 app.use()로 처리하지
	않아도 될 수 있는 기능을 보강해야 한다..마치 iis
*/

//express 모듈이 보유한 미들웨어라는 기능을 이용하면 이 문제
//를 해결할 수 있다...
//static() 메서드 안에다가 정적자원의 위치를 하드코딩 하지말자!!
//왜?? 이 node 서버가 리눅스,윈도우, mac 어디에서 실행될지 알수없기
//때문...해결책) node 스스로 하드디스크 경로 정보를 얻도록 하자!
//__dirname 은 nodejs 보유한 몇개 안되는 전역변수 중 하나이다..
//console.log("현재 js  파일이 실행중인 경로는 "  , __dirname);

app.use(express.static(__dirname));//html 등 정적자원이 있는 위치

//등록 요청 처리 
app.use("/regist", function(request, response){
	//express 모듈로 서버를 업그레이드하면, 데이터가 
	//json 형태로 전송되어질 수 있다..
	
	console.log("클라이언의 전송 데이터", request.query);

});


server.listen(7777, function(){
	console.log("웹서버가 7777 포트에서 가동 중...");
});






