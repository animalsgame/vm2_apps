class %CURRENT_CLASSNAME%{

constructor(){
}

static checkUpdate(){
var q=null
var gl=GLOBAL
if('MainUI' in gl){
if('checkUpdateApp' in MainUI){
q=MainUI.checkUpdateApp($app.packageName,(v)=>{
if(q.parent)q.parent.removeChild(q)
})
}
}
if(q){
q.check()
$app.cnv.addChild(q)
}
}

copyMethodsGlobal(cl){
if(cl){
for(var n in cl){
if(n!='<init>')window[n]=cl[n]
}
}
}

hexToDec(color){
if(color && color is String){
if(color.length>0){
var ch=color.charAt(0)
if(ch=='#')color=color.cut(1)
var vv=parseInt(color,16)
return vv
}
}
return 0
}

pixelsToBMD(ob4){
if(ob4){
var bmd=new lang.display.BitmapData(ob4.width,ob4.height,0,true)
var sz2=ob4.width*ob4.height
var ww=ob4.width
if(sz2>0){
for (var i = 0; i < sz2; i++) {
var xx=i%ww
var yy=Math.floor(i/ww)
var pixelPos=(yy*ww)+xx
var pixelV=ob4.pixels[pixelPos]
var clr=hexToDec(ob4.palette[pixelV])
bmd.setPixel(xx,yy,clr)
}
return bmd
}
}
return null
}

}