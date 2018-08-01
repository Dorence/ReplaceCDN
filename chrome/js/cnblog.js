"use strict";
console.log("cnblog.js on");
console.log(location.href);

var boxList=[["ad_text_commentbox"],
	"ad_t2","cnblogs_a1","cnblogs_a2",
	"cnblogs_b1","cnblogs_b2","cnblogs_b3","cnblogs_b4",
	"cnblogs_c1","cnblogs_c2"
];

console.log(boxList);

function isArray(o){return Object.prototype.toString.call(o)==='[object Array]';}

function clearBox()
{
	console.log("clear on");
	var x;
	for(var i=0;i<boxList.length;i++)
	{
		if(isArray(boxList[i]))
		{
			for(var k=0;k<boxList[i].length;k++)
			{
				x=document.getElementsByClassName(boxList[i][k]);
				//console.log(x);
				for(var j=0;j<x.length;j++)
				{
					//console.log(x[j]);
					if(x[j])
					{
						x[j].parentNode.removeChild(x[j]);
						console.log("clean!");
					}
				}
			}
		}
		else
		{
			x=document.getElementById(boxList[i]);
			if(x){x.parentNode.removeChild(x);console.log("clean!");}
		}
	}
}

clearBox();
setTimeout("clearBox()",1500);
setInterval("clearBox()",8000);
