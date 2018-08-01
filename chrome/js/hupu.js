"use strict";
console.log("hupu.js on");
console.log(location.href);

var boxList=[["cBox-A voteIndex","hupu-shihuo-hot","hupushihuo"],
	["ad200-200","ad240-200","ad720-90","ad980-60","ad361-240-240"],
	["hp-ad250-250","sidebar-ad-A","sidebar-ad-B"],
	"ad"
];

console.log(boxList);
function isArray(o){return Object.prototype.toString.call(o)==='[object Array]';}

function clearBox()
{
	
	console.log("clear begin...");
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
						console.log("clean! "+boxList[i][k]);
					}
				}
			}
		}
		else
		{
			x=document.getElementById(boxList[i]);
			console.log(x);
			if(x){x.parentNode.removeChild(x);console.log("clean! "+boxList[i]);}
		}
	}
}

clearBox();
setTimeout("clearBox()",1500);
setTimeout("clearBox()",6000);
setInterval("clearBox()",8000);
