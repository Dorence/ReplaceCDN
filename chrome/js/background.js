"use strict";
var chrome=chrome,P=chrome.runtime.getURL;
var get={};
var cnt=0;
var fileTree={};
var gitROOT="assets/githubCDN/";

chrome.browserAction.setBadgeText({text:""});
chrome.runtime.getPackageDirectoryEntry(function(e){e.getDirectory("assets/githubCDN",{create: false},function(subEntry){getSubEntries(fileTree,subEntry);console.log(fileTree);});});

function getSubEntries(Parent,Entry)
{
    var dirReader=Entry.createReader();
    dirReader.readEntries(function(e)
	{
        for(var i=0;i<e.length;i++)
		{
			if(e[i].isDirectory)
			{
				Parent[e[i].name]={};
                getSubEntries(Parent[e[i].name],e[i]);
            }
			else if(e[i].isFile){Parent[e[i].name]=true;}
        }
    });
}

function checkFileExist(url)
{
	//console.log("check start:"+url);
	url=url.split("/");
	for(var i=0,t=fileTree;i<url.length;i++)
	{
		if(t[ url[i] ])
		{
			if(i===url.length-1){return true;}
			else{t=t[ url[i] ];}
		}
		else{return false;}
	}
}

chrome.webRequest.onBeforeRequest.addListener(function(request)
{
	var u=request.url;
	var x0=u.indexOf("://");
	u=u.substr(x0+3);
	x0=u.indexOf("/");
	if(x0>=0)
	{
		u=u.substr(x0+1);
		if(checkFileExist(u))
		{
			u=P(gitROOT+u);
			console.log("githubCDN found:"+u);
			return {redirectUrl: u};
		}
		else{console.log("githubCDN not FOUND");}
	}
	else{console.log("githubCDN not FOUND");}
	return {};
},{urls: ["*://assets-cdn.github.com/*"]},["blocking"]);

function L(flag,r){var q=["","assets/","assets/github/","assets/github/png/","assets/fonts/"];return P(q[flag]+r);}

var par=[
[/https?:\/\/gzkg\.e21\.cn\/js\/jquery\.js/,L(1,"jquery-1.4.4.min.js"),true],[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/1/i,L(1,"jquery-1.12.4.min.js"),true],
[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/2/i,L(1,"jquery-2.2.4.min.js"),true],
[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/3/i,L(1,"jquery-3.3.1.min.js"),true],
[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jqueryui\/1(([0-9]|\.)*)\/jquery-ui(\.min)?\.js/i,L(1,"jquery-ui-1.12.1.min.js"),true],
[/https?:\/\/common\.cnblogs\.com\/scripts\/jquery-1\.[0-9]+\.[0-9]+(\.min)?.js/,L(1,"jquery-1.12.4.min.js"),true],
[/https?:\/\/common\.cnblogs\.com\/scripts\/jquery-2\.[0-9]+\.[0-9]+(\.min)?.js/,L(1,"jquery-2.2.4.min.js"),true],
[/https?:\/\/csdnimg\.cn\/public\/common\/libs\/jquery\/jquery-1(([0-9]|\.)*)(\.min)?.js/,L(1,"jquery-1.12.4.min.js"),true],
[/https?:\/\/cdn\.bootcss\.com\/jquery\/1/,L(1,"jquery-1.12.4.min.js"),true],
[/https?:\/\/cdn\.bootcss\.com\/jquery\/2/,L(1,"jquery-2.2.4.min.js"),true],
[/https?:\/\/cdn\.bootcss\.com\/jquery\/3/,L(1,"jquery-3.3.1.min.js"),true],

[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\//i,'https://cdn.bootcss.com/jquery/'],
[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jqueryui\//i,'https://cdn.bootcss.com/jqueryui/'],
	
['googleapis.com','lug.ustc.edu.cn'],
['themes.googleusercontent.com','google-themes.lug.ustc.edu.cn'],

[/https?:\/\/[A-z]*.e21.cn\/html\/advertisement\/([0-9]|\/)+_[0-9]+(_s\.jpg|\.jpg|_s\.gif)/,L(1,"ad.png"),true],
[/https?:\/\/gzkg\.e21\.cn\/images\/(dlgg[0-9]*|kstd).gif/,L(1,"ad.png"),true],

[/https?:\/\/tpc\.googlesyndication\.com\/pagead\/imgad/,L(1,"ad.png"),true],
[/https?:\/\/tpc\.googlesyndication\.com\/daca_images\/simgad\//,L(1,"ad.png"),true],
[/https?:\/\/t1\.hoopchina\.com\.cn\/img\/1?[0-9]{11,}\.jpg/,L(1,"ad.png"),true],


[/https?:\/\/static\.googleadsserving\.cn\/pagead\/imgad/,L(1,"ad.png"),true],
["http://wa.gtimg.com/website/201804/jdnbpe_EF_20180413161116288.jpg",L(1,"ad.png"),true],
["http://wa.gtimg.com/website/201804/jdnbpe_EF_2018041316111141.jpg",L(1,"ad.png"),true],
["http://www.66ys.tv/d/960x90.gif",L(1,"ad.png"),true],
[/https?:\/\/gg\.qucaigg\.com:[0-9]{2,5}\/960-90-[0-9]*.gif/,L(1,"ad.png"),true],
[/https?:\/\/lg3\.jointreport-switch\.com\/html\/[0-9]*\/[^\s]*.(gif|jpg)/,L(1,"ad.png"),true],
	
[/https?:\/\/tpc\.googlesyndication\.com\/pagead\/js/,L(1,"null.js"),true],	
[/https?:\/\/ad\.wang502\.com\/ad?/,L(1,"null.js"),true],
[/https?:\/\/b3\.hoopchina\.com\.cn\/web\/ad\/skin\/js[^\s]*\.js/,L(1,"null.js"),true],
[/https?:\/\/promotion\.aliyun\.com\/promotion\/adv\/[^\s]*\.html?/,L(1,"null.js"),true],
["http://www.66ys.tv/d/2.js",L(1,"null.js"),true],
["http://www.66ys.tv/d/tc.js",L(1,"null.js"),true],
["https://www.googletagservices.com/tag/js/gpt.js",L(1,"null.js"),true],
["https://www.dy2018.com/js17/syf.js",L(1,"null.js"),true],
["https://img.xiacaidd.com/xiacai/ad/t18.js",L(1,"null.js"),true],
	
["http://screen.aili.com/bvzdas.js",L(1,"null.js"),true],
[/https?:\/\/s3\.pfp\.sina\.net\/ea\/ad\/[^\s]+\/([0-9]|[A-z])+\.(jpe?g|png)/,L(1,"ad.png"),true],
[/https?:\/\/s3\.pfp\.sina\.net\/sword\/[^\s]+\/([0-9]|[A-z])+\.(jpe?g|png)/,L(1,"ad.png"),true],

[/https?:\/\/safe-aisle\.jointreport-switch\.com\/(display|export)\.php?/,L(1,"null.html"),true],
[/https?:\/\/cpv-adv\.ggytc\.com:[0-9]*\/AD\/View\.aspx/,L(1,"null.html"),true],
[/https?:\/\/jsjs\.nthyn\.com\/vs?\.php\??/,L(1,"null.html"),true],
[/https?:\/\/googleads\.g\.doubleclick\.net\/pagead\/ads?/,L(1,"null.html"),true],
[/https?:\/\/t1\.hoopchina\.com\.cn\/topn-v2\.html[^\s]*/,L(1,"null.html"),true],
[/https?:\/\/blog\.sina\.com\.cn\/lm\/mini\/[0-9]+\.html/,L(1,"null.html"),true],
["http://d6.sina.com.cn/litong/zhitou/sinaads/src/spec/sinaads_ck.html",L(1,"null.html"),true],


["http://zh.cppreference.com/DejaVuSans.ttf",L(3,"DejaVuSans.ttf"),true],
["http://zh.cppreference.com/DejaVuSans-Bold.ttf",L(3,"DejaVuSans-Bold.ttf"),true],
["http://zh.cppreference.com/DejaVuSansMono.ttf",L(3,"DejaVuSansMono.ttf"),true],

[/https?:\/\/img-ads\.csdn\.net\/20[0-9]{2}\/20[0-9]{6}[0-9]+\.(gif|jpg|png)/,L(1,"ad.png"),true],
[/https?:\/\/s3m\.mediav\.com\/[^\s]*\.(gif|jpg|png)/,L(1,"ad.png"),true],
	
["www.google.com.hk","www.google.com"]
];

console.log(par);

chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
        var url = request.url;
		for(var i = 0;i < par.length;i++)
		{
			if(url.search(par[i][0])>=0)
			{
				//console.log(request);
				console.log(url);
				console.log(par[i][1]);
				chrome.browserAction.setBadgeText({text: String(++cnt)});
				if(par[i][2]){ return {redirectUrl: par[i][1]}; }
				else{ return {redirectUrl: url.replace(par[i][0],par[i][1])}; }
			}
		}
        return {};
    },
    {
        urls: [
	"*://*.e21.cn/*",
	"*://*.jointreport-switch.com/*",
	"*://ad.wang502.com/ad*",
	"*://ajax.googleapis.com/*",
	"*://b3.hoopchina.com.cn/web/ad/*",
	"*://*.sina.com.cn/*",
	"*://cdn.bootcss.com/*",
	"*://common.cnblogs.com/scripts/*",
	"*://csdnimg.cn/public/common/libs/*",
	"*://gg.qucaigg.com:*/*",
	"*://googleads.g.doubleclick.net/pagead/*",
	"*://img.xiacaidd.com/xiacai/ad/*",
	"*://img-ads.csdn.net/*",
	"*://jsjs.nthyn.com/*",
	"*://promotion.aliyun.com/promotion/adv/*",
	"*://s3.pfp.sina.net/*",
	"*://s3m.mediav.com/*",
	"*://screen.aili.com/*",
	"*://static.googleadsserving.cn/pagead/*",
	"*://t1.hoopchina.com.cn/*",
	"*://themes.googleusercontent.com/*",
	"*://tpc.googlesyndication.com/pagead/*",
	"*://tpc.googlesyndication.com/daca_images/simgad/*",
	"*://wa.gtimg.com/website/*",
	"*://www.66ys.tv/d/*",
	"*://www.dy2018.com/*",
	"*://www.google.com.hk/*",
	"*://www.googletagservices.com/*",
	"*://zh.cppreference.com/*"
        ]
    },
    ["blocking"]
);

var parPop=[
[/https?:\/\/(g|games|playgame)\.iqiyi\.com/,L(1,"null.html"),true],
[/https?:\/\/mall\.iqiyi\.com/,L(1,"null.html"),true]
];

console.log(parPop);

chrome.webRequest.onBeforeRequest.addListener(
    function(request){
        var url = request.url;
		for(var i=0;i<parPop.length;i++)
		{
			if(url.search(parPop[i][0])>=0)
			{
				console.log(url);
				console.log(parPop[i][1]);
				chrome.browserAction.setBadgeText({text: String(++cnt)});
				if(parPop[i][2]){ return {redirectUrl: parPop[i][1]}; }
				else{ return {redirectUrl: url.replace(parPop[i][0],parPop[i][1])}; }
			}
		}
        return {};
    },{urls:["*://*.iqiyi.com/*"]},["blocking"]
);

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(message);
    if(message.type&&message.type==="pop.js-start"){
        sendResponse({text:'Hello from bg.',flaglogin:get.login});
		if(get.login){
			console.log("prepare to send ping to e21.js");
			chrome.tabs.sendMessage(get.loginid,{type:"e21.js-ping"}, function(response){
				console.log(response);
			});
		}
    }
	else if(message.type&&message.type==="login"){
		get.login=true;
		chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT,function(win){
			console.log(win);
			console.log(get.loginid=win.id);
		});
		return {id:get.loginid};
    }
});

function getCurrWidId()
{
	var w;
	chrome.windows.get(-2,function(win){console.log(win);w=win.id;});
	return w;
}

chrome.runtime.onConnect.addListener(function(port){
	console.log("get port:"+port.name);
	console.log(port);
	if(port.name==="敲门")
	{
		port.onMessage.addListener(function(msg){
			console.log(msg);
			if (msg.joke === "敲门")
			{port.postMessage({question: "是谁？"});}
			else if (msg.answer === "女士")
			 { port.postMessage({question: "哪位女士？"});}
			else if (msg.answer === "Bovary 女士")
			 { port.postMessage({question: "我没听清楚。"});}
		});
	}
	else if(port.name==="pop.js-port")
	{
		port.onMessage.addListener(function(msg){
			console.log(msg);
			if(msg.cmd==="login")
			{
				chrome.tabs.executeScript(getCurrWidId(),{code:"loginX();"});
			}
		});
	}
});
