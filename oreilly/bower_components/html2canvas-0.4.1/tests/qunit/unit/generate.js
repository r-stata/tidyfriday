$(function(){var o={},r={},c={};o["Generate.parseGradient"]=["backgroundImage"],r["Generate.parseGradient"]=$("#backgroundGradients div").length,c["Generate.parseGradient"]=[{type:"linear",x0:0,y0:35,x1:50,y1:35,colorStops:[{color:"rgb(255, 0, 0)",stop:0},{color:"rgb(255, 255, 0)",stop:.5},{color:"rgb(0, 255, 0)",stop:1}]},{type:"linear",x0:0,y0:35,x1:50,y1:35,colorStops:[{color:"rgb(206, 219, 233)",stop:0},{color:"rgb(170, 197, 222)",stop:.17},{color:"rgb(97, 153, 199)",stop:.5},{color:"rgb(58, 132, 195)",stop:.51},{color:"rgb(65, 154, 214)",stop:.59},{color:"rgb(75, 184, 240)",stop:.71},{color:"rgb(58, 139, 194)",stop:.84},{color:"rgb(38, 85, 139)",stop:1}]},{type:"linear",x0:25,y0:0,x1:25,y1:70,colorStops:[{color:"rgb(240, 183, 161)",stop:0},{color:"rgb(140, 51, 16)",stop:.5},{color:"rgb(117, 34, 1)",stop:.51},{color:"rgb(191, 110, 78)",stop:1}]},{type:"ellipse",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:12.5,ry:13.3,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]},{type:"circle",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:18.25212316416915,ry:18.25212316416915,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]},{type:"ellipse",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:37.5,ry:56.7,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]},{type:"circle",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:67.97896733549283,ry:67.97896733549283,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]},{type:"ellipse",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:12.5,ry:13.3,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]},{type:"circle",x0:0,y0:0,x1:50,y1:70,cx:37.5,cy:13.3,rx:67.97896733549283,ry:67.97896733549283,colorStops:[{color:"rgb(171, 171, 171)",stop:0},{color:"rgb(0, 0, 255)",stop:.33},{color:"rgb(153, 31, 31)",stop:1}]}],test("Generate.parseGradient",o["Generate.parseGradient"].length*r["Generate.parseGradient"],function(){$("#backgroundGradients div").each(function(e,a){$.each(o["Generate.parseGradient"],function(r,o){var t,o=_html2canvas.Util.getCSS(a,o);/^(-webkit|-o|-moz|-ms|linear)-/.test(o)?(t=_html2canvas.Generate.parseGradient(o,{width:50,height:70}),QUnit.deepEqual(t,c["Generate.parseGradient"][e],"Parsed gradient with CSS: "+o)):QUnit.ok(!0,"No CSS Background Gradient support")})})}),o["Generate.Gradient"]=["backgroundImage"],r["Generate.Gradient"]=$("#backgroundGradients div").length,test("Generate.Gradient",o["Generate.Gradient"].length*r["Generate.Gradient"],function(){$("#backgroundGradients div").each(function(r,l){$.each(o["Generate.Gradient"],function(r,o){var t,e,a=0,o=_html2canvas.Util.getCSS(l,o);if(/^(-webkit|-o|-moz|-ms|linear)-/.test(o)){t=_html2canvas.Generate.Gradient(o,{width:50,height:50}),(e=document.createElement("canvas")).width=50,e.height=50,(e=e.getContext("2d")).drawImage(t,0,0);for(var c,n=(c=e.getImageData(0,0,50,50).data).length,s=0;s<n;s+=4)a+=(c[s]+c[s+1]+c[s+2])/3;a/=n/4,QUnit.notEqual(a,255,"Background Gradient drawn with CSS: "+o)}else QUnit.ok(!0,"No CSS Background Gradient support")})})})});