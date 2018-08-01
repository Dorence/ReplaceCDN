"use strict";
var chrome=chrome;
var s1=[[3,"成长档案袋"],[9,"学分管理系统"],[55,"综合素质评价(新)"]];
var s2=["luogu","gzkg.e21"];

$("#btt").on("click",function(){$("#pp").html("Reloading!");chrome.runtime.reload();});

chrome.runtime.sendMessage({type:"pop.js-start"}, function(response){
	console.log(response);
    $("#pp").append(response.text);
});

+function(){
	var i,t;
	for(i=0;i<s1.length;i++)
	{
		$("#ulD1").append(
			"<li><button class='btn btn-success' data-shitId='"+s1[i][0]+"'>"+s1[i][1]+"</button></li>"
		);
		t=$($("#ulD1").children("li").last()).children(".btn").last();
		console.log(t);
		$(t).on("click",function(){
			chrome.tabs.create({index:0,url:"http://gzkg.e21.cn/login/login1.php?id="+$(this).data("shitId")},function(T){console.log(T);});
		});
	}
	for(i=0;i<s2.length;i++)
	{
		$("#ulD2").append("<li><button class='btn btn-info'>"+s2[i]+"</button></li>");
		t=$($("#ulD2").children("li").last()).children("button.btn").last();
		console.log(t);
		$(t).on("click",function(){
			port = chrome.runtime.connect({name: "pop.js-port"});
			console.log(port);
			port.postMessage({cmd:"login"});
		});
	}
}();



/*
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log("pop.js get");
	console.log(message);
    if(message.type&&message.type==="login")
	{
		$("#pp").append("login");
		document.getElementById("btnA").disabled=!!message.flaglogin;
        sendResponse({text:'Get data:login'});
    }
});

var port = chrome.runtime.connect({name: "pop.js-port"});
console.log(port);
port.postMessage({joke:"pop敲门"});
port.onMessage.addListener(function(msg){
	console.log(msg);
	if(msg.question === "是谁？")
	port.postMessage({answer: "女士"});
	else if (msg.question === "哪位女士？")
	port.postMessage({answer: "Bovary 女士"});
	if(msg.type==="login")
	{
		$("#pp").html("Detect Login!");
		document.getElementById("btnA").disabled=false;
	}
});*/

var port;

$("#btnA").on("click",function(){
	port = chrome.runtime.connect({name: "pop.js-port"});
	console.log(port);
	port.postMessage({cmd:"login"});
});
