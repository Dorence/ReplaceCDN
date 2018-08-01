"use strict";
console.log("csdn.js on");
console.log(location.href);

var boxList=[["recommend-ad-box","pulllog-box","csdn-tracking-statistics mb8 box-shadow"],"pic"
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
				for(var j=0;j<x.length;j++)
				{
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
