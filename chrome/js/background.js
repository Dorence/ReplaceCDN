"use strict";
var chrome = chrome, P = chrome.runtime.getURL;
var get = {};
var cnt = 0;

chrome.browserAction.setBadgeText({ text: "" });

//PART 1
//github static CDN replace
+function () {
	var fileTree = {};
	chrome.runtime.getPackageDirectoryEntry(e => {
		e.getDirectory("assets/githubCDN", { create: false },
			function (entry) { getSubEntries(fileTree, entry); console.log(fileTree); });
	});
	function getSubEntries(Parent, Entry) {
		var dirReader = Entry.createReader();
		dirReader.readEntries(e => {
			for (var i in e) {
				if (e[i].isDirectory) {
					Parent[e[i].name] = {};
					getSubEntries(Parent[e[i].name], e[i]);
				}
				else if (e[i].isFile) { Parent[e[i].name] = true; }
			}
		});
	}
	function checkFileExist(url) {
		//console.log("check start:"+url);
		url = url.split("/");
		for (var i = 0, t = fileTree; i < url.length; i++) {
			if (t[url[i]]) {
				if (i === url.length - 1) { return true; }
				else { t = t[url[i]]; }
			}
			else { return false; }
		}
	}
	chrome.webRequest.onBeforeRequest.addListener(function (request) {
		var u = request.url;
		var x0 = u.indexOf("://");
		u = u.substr(x0 + 3);
		x0 = u.indexOf("/");
		if (x0 >= 0) {
			u = u.substr(x0 + 1);
			if (checkFileExist(u)) {
				u = P("assets/githubCDN/" + u);
				console.log("githubCDN found:" + u);
				return { redirectUrl: u };
			}
			else { console.log("githubCDN not FOUND"); }
		}
		else { console.log("githubCDN not FOUND"); }
		return {};
	}, { urls: ["*://assets-cdn.github.com/*"] }, ["blocking"]);
}();

//PART 2

function L(loc = 1, r) { const q = ["", "assets/", "assets/fonts/"]; return P(q[loc] + r); }

const A = {
	B: { c3: "bootstrap-3.3.7.min.css", j3: "bootstrap-3.3.7.min.js" },
	J: { 1: "jquery-1.12.4.min.js", 2: "jquery-2.2.4.min.js", 3: "jquery-3.5.1.min.js", m: "jquery-1.4.4.min.js" }
}

var par = [
	[/https?:\/\/gzkg\.e21\.cn\/js\/jquery\.js/i, L(1, A.J.m), true],
	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/1/i, L(1, A.J[1]), true],
	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/2/i, L(1, A.J[2]), true],
	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/3/i, L(1, A.J[3]), true],
	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jqueryui\/1(([0-9]|\.)*)\/jquery-ui(\.min)?\.js/i, L(1, "jquery-ui-1.12.1.min.js"), true],
	[/https?:\/\/common\.cnblogs\.com\/scripts\/jquery-1\.[0-9]+\.[0-9]+(\.min)?.js/i, L(1, A.J[1]), true],
	[/https?:\/\/common\.cnblogs\.com\/scripts\/jquery-2\.[0-9]+\.[0-9]+(\.min)?.js/i, L(1, A.J[2]), true],
	[/https?:\/\/csdnimg\.cn\/public\/common\/libs\/jquery\/jquery-1(([0-9]|\.)*)(\.min)?.js/i, L(1, A.J[1]), true],
	[/https?:\/\/cdn\.bootcss\.com\/jquery\/1/i, L(1, A.J[1]), true],
	[/https?:\/\/cdn\.bootcss\.com\/jquery\/2/i, L(1, A.J[2]), true],
	[/https?:\/\/cdn\.bootcss\.com\/jquery\/3/i, L(1, A.J[3]), true],

	[/https?:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/3\S*\/css\/bootstrap\S*\.css/i, L(1, A.B.c3), true],
	[/https?:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/3\S*\/js\/bootstrap\S*\.js/i, L(1, A.B.j3), true],

	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\//i, 'https://cdn.bootcss.com/jquery/'],
	[/https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jqueryui\//i, 'https://cdn.bootcss.com/jqueryui/'],
	['googleapis.com', 'lug.ustc.edu.cn'],
	['themes.googleusercontent.com', 'google-themes.lug.ustc.edu.cn'],

	[/https?:\/\/[A-z]*.e21.cn\/html\/advertisement\/([0-9]|\/)+_[0-9]+(_s\.jpg|\.jpg|_s\.gif)/i, L(1, "ad.png"), true],
	[/https?:\/\/gzkg\.e21\.cn\/images\/(dlgg[0-9]*|kstd).gif/i, L(1, "ad.png"), true],
	[/https?:\/\/tpc\.googlesyndication\.com\/pagead\/imgad/i, L(1, "ad.png"), true],
	[/https?:\/\/tpc\.googlesyndication\.com\/daca_images\/simgad\//i, L(1, "ad.png"), true],
	[/https?:\/\/t1\.hoopchina\.com\.cn\/img\/1?[0-9]{11,}\.jpg/i, L(1, "ad.png"), true],
	[/https?:\/\/static\.googleadsserving\.cn\/pagead\/imgad/i, L(1, "ad.png"), true],
	["http://wa.gtimg.com/website/201804/jdnbpe_EF_20180413161116288.jpg", L(1, "ad.png"), true],
	["http://wa.gtimg.com/website/201804/jdnbpe_EF_2018041316111141.jpg", L(1, "ad.png"), true],
	["http://www.66ys.tv/d/960x90.gif", L(1, "ad.png"), true],
	[/https?:\/\/gg\.qucaigg\.com:[0-9]{2,5}\/960-90-[0-9]*.gif/i, L(1, "ad.png"), true],
	[/https?:\/\/lg3\.jointreport-switch\.com\/html\/[0-9]*\/[^\s]*.(gif|jpg)/i, L(1, "ad.png"), true],
	[/https?:\/\/s3\.pfp\.sina\.net\/ea\/ad\/[^\s]+\/([0-9]|[A-z])+\.(jpe?g|png)/i, L(1, "ad.png"), true],
	[/https?:\/\/s3\.pfp\.sina\.net\/sword\/[^\s]+\/([0-9]|[A-z])+\.(jpe?g|png)/i, L(1, "ad.png"), true],
	[/https?:\/\/img-ads\.csdn\.net\/20[0-9]{2}\/20[0-9]{6}[0-9]+\.(gif|jpg|png)/i, L(1, "ad.png"), true],
	[/https?:\/\/s3m\.mediav\.com\/[^\s]*\.(gif|jpg|png)/i, L(1, "ad.png"), true],

	[/https?:\/\/tpc\.googlesyndication\.com\/pagead\/js/i, L(1, "null.js"), true],
	[/https?:\/\/ad\.wang502\.com\/ad?/i, L(1, "null.js"), true],
	[/https?:\/\/b3\.hoopchina\.com\.cn\/web\/ad\/skin\/js[^\s]*\.js/, L(1, "null.js"), true],
	[/https?:\/\/promotion\.aliyun\.com\/promotion\/adv\/[^\s]*\.html?/, L(1, "null.js"), true],
	["http://www.66ys.tv/d/2.js", L(1, "null.js"), true],
	["http://www.66ys.tv/d/tc.js", L(1, "null.js"), true],
	["https://www.googletagservices.com/tag/js/gpt.js", L(1, "null.js"), true],
	["https://www.dy2018.com/js17/syf.js", L(1, "null.js"), true],
	["https://img.xiacaidd.com/xiacai/ad/t18.js", L(1, "null.js"), true],
	["http://screen.aili.com/bvzdas.js", L(1, "null.js"), true],

	[/https?:\/\/cpv-adv\.ggytc\.com:[0-9]*\/AD\/View\.aspx/, L(1, "null.html"), true],
	[/https?:\/\/jsjs\.nthyn\.com\/vs?\.php\??/, L(1, "null.html"), true],
	[/https?:\/\/googleads\.g\.doubleclick\.net\/pagead\/ads?/, L(1, "null.html"), true],
	[/https?:\/\/t1\.hoopchina\.com\.cn\/topn-v2\.html[^\s]*/, L(1, "null.html"), true],
	[/https?:\/\/blog\.sina\.com\.cn\/lm\/mini\/[0-9]+\.html/, L(1, "null.html"), true],

	["http://zh.cppreference.com/DejaVuSans.ttf", L(2, "DejaVuSans.ttf"), true],
	["http://zh.cppreference.com/DejaVuSans-Bold.ttf", L(2, "DejaVuSans-Bold.ttf"), true],
	["http://zh.cppreference.com/DejaVuSansMono.ttf", L(2, "DejaVuSansMono.ttf"), true]
];

console.log(par);

chrome.webRequest.onBeforeRequest.addListener(
	function (request) {
		var url = request.url;
		for (var i = 0; i < par.length; i++) {
			if (url.search(par[i][0]) >= 0) {
				//console.log(request);
				console.log(url, par[i][1]);
				chrome.browserAction.setBadgeText({ text: String(++cnt) });
				if (par[i][2]) { return { redirectUrl: par[i][1] }; }
				else { return { redirectUrl: url.replace(par[i][0], par[i][1]) }; }
			}
		}
		return {};
	},
	{
		urls: [
			"*://*.e21.cn/*",
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
			"*://lg3.jointreport-switch.com/html/*",
			"*://maxcdn.bootstrapcdn.com/*",
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
			"*://www.googletagservices.com/*",
			"*://zh.cppreference.com/*"
		]
	},
	["blocking"]
);

var parHTML = [
	/https?:\/\/(g|games|playgame)\.iqiyi\.com/,
	/https?:\/\/mall\.iqiyi\.com/,
	"http://d6.sina.com.cn/litong/zhitou/sinaads/src/spec/sinaads_ck.html",
	/https?:\/\/safe-aisle\.jointreport-switch\.com\/(display|export)\.php?/
];
console.log(parHTML);

chrome.webRequest.onBeforeRequest.addListener(
	function (request) {
		var url = request.url;
		for (var i = 0; i < parHTML.length; i++) {
			if (url.search(parHTML[i]) >= 0) {
				console.log(url);
				chrome.browserAction.setBadgeText({ text: String(++cnt) });
				return { redirectUrl: P("assets/null.html") };
			}
		}
		return {};
	}, {
	urls: [
		"*://*.iqiyi.com/*",
		"*://d6.sina.com.cn/*",
		"*://safe-aisle.jointreport-switch.com/*",
	]
}, ["blocking"]
);

function getCurrWidId() {
	var w;
	chrome.windows.get(-2, function (win) { w = win.id; });
	return w;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log(message);
	if (message.type && message.type === "pop.js-start") {
		sendResponse({ text: 'Hello from bg.', flaglogin: get.login });
		if (get.login) {
			console.log("prepare to send ping to e21.js");
			chrome.tabs.sendMessage(get.loginid, { type: "e21.js-ping" }, function (response) {
				console.log(response);
			});
		}
	}
	else if (message.type && message.type === "login") {
		get.login = true;
		get.loginid = getCurrWidId();
		return { id: get.loginid };
	}
});


chrome.runtime.onConnect.addListener(function (port) {
	console.log("get port:" + port.name);
	console.log(port);
	if (port.name === "敲门") {
		port.onMessage.addListener(function (msg) {
			console.log(msg);
			if (msg.joke === "敲门") { port.postMessage({ question: "是谁？" }); }
			else if (msg.answer === "女士") { port.postMessage({ question: "哪位女士？" }); }
			else if (msg.answer === "Bovary 女士") { port.postMessage({ question: "我没听清楚。" }); }
		});
	}
	else if (port.name === "pop.js-port") {
		port.onMessage.addListener(function (msg) {
			console.log(msg);
			if (msg.cmd === "login") {
				chrome.tabs.executeScript(getCurrWidId(), { code: "loginX();" });
			}
		});
	}
});
