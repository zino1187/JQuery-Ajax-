/*-----------------------------------
현재 이 파일은 js 즉 자바스크립트이다.
하지만 지금까지 우리가 사용해왔던 자바스크
립트는 주로 HTML 문서를 동적으로 제어하기
위한 자바스크립트였지만, 이 Nodejs의 목적
은 서버를 구축하기 위한 용도이다....
-----------------------------------*/
//alert(); 왜 불가능?? window.alert() 이므로, 
// nodejs DOM이 지원되지 않으므로...

//http 모듈: 웹서버 구축을 가능하게 해주는 기본 탑재 모듈...
//nodejs 는 지금 이 시간에도 전세계 개발자 들에 의해 
//소스가 공유되고 , 계속 업그레이드 중이다..따라서 
//우리같은 개발자가 직접 무언가를 개발하는 일은 없고
//필요한 기술이 있으면 그냥 require 명시하여 사용하면 된다
//이러한 기술 단위를 모듈...
var http=require("http"); //기본서버

var server=http.createServer();//서버 생성!!

//원격지에 떨어진 클라이언트의 요청을 받아보자!!!
//on 은 ~~할때 즉, 이벤트를 감지하는 핸들러이며, 
//여기서는 클라이언트의 접속을 감지해본다!!
server.on("request", function(request, response){
	//console.log("클라이언트의 접속 감지함!!!");
	console.log("클라이언트가 전송한 파라미터",request.query);
	
	//서버는 클라이언트의 요청에 대해 언제나 응답을 처리해야 한다
	response.writeHead(200, {"Content-Type":"text/html"});
	response.end("ok"); //응답문자열 전송!!

	//클라이언트가 전송한 회원관련 데이터를 받아보자!!


});

//서버 가동
server.listen(9999, function(){
	console.log("웹서버가 9999포트에서 가동 중...");
});










