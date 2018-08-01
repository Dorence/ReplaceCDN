"use strict";

console.log("e21.js on");
console.log(location.href);

function loginX()
{
	document.getElementById('UserType').value=2;
	document.getElementById('UserName').value='hsy303';
	document.getElementById('UserPwd').value='030201';
	console.log('print done!');
}

var boxList=[
	["guanggao02"]
];

console.log(boxList);

function clearBox()
{
	console.log("clear on");
	var x;
	for(var i=0;i<boxList.length;i++)
	{
		if(boxList[i][0])
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
setTimeout("clearBox()",900);
setInterval("clearBox()",8000);

