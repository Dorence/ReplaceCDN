"use strict";
console.log("sina.js on");
console.log(location.href);

var boxList=[["sinaads","sinaads-done"],"sinaadtk_sandbox_id_0","sinaAD_type_blogbf"];
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
				console.log(x);
				for(var j=0;j<x.length;j++)
				{
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
			if(x){x.parentNode.removeChild(x);console.log("clean! "+boxList[i]);}
		}
	}
}

clearBox();
setTimeout("clearBox()",3000);
setInterval("clearBox()",5000);

