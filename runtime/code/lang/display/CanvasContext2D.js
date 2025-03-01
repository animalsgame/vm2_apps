class CanvasImageData{
constructor(){}
}

class CanvasPattern{
constructor(o){}
native setTransform(o){}
}

class CanvasGradient{
constructor(o){}
native addColorStop(step,color){}
}

class %CURRENT_CLASSNAME%{
constructor(){}

native beginPath(){}
native closePath(){}
native clearRect(x,y,w,h){}
native lineTo(x,y){}
native moveTo(x,y){}
native rect(x,y,w,h){}
native drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh){}
native fillRect(x,y,w,h){}
native strokeRect(x,y,w,h){}
native roundRect(x,y,w,h,radii){}
native fill(){}
native stroke(){}
native save(){}
native restore(){}
native clip(){}
native translate(x,y){}
native getTransform(){}
native transform(a,b,c,d,tx,ty){}
native setTransform(a,b,c,d,tx,ty){}
native resetTransform(){}
native getLineDash(){}
native setLineDash(arr){}
native scale(x,y){}
native rotate(v){}
native quadraticCurveTo(cpx,cpy,x,y){}
native bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y){}
native arc(xc,yc,radius,angle1,angle2,anticlockwise){}
native arcTo(x0,y0,x1,y1,radius){}
native ellipse(x,y,radiusX,radiusY,rotation,startAngle,endAngle,counterclockwise){}
native createPattern(o,s){}
native createLinearGradient(x0,y0,x1,y1){}
native createRadialGradient(x0,y0,r0,x1,y1,r1){}
native createImageData(w,h){}
native putImageData(imageData,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight){}
native getImageData(sx,sy,sw,sh){}
native isPointInPath(x,y){}
native isPointInStroke(x,y){}
native measureText(text){}
native fillText(text,x,y){}
native strokeText(text,x,y){}

parseFontStr(v){
var o={fontName:'Arial',fontSize:10,fontWeight:'normal'}
if(v && v.length>0){
var spl=v.split(' ')
var sz=spl.length
if(spl && sz>1){
var arg1=spl[0]
var arg2=spl[1]
if(sz==3){
var arg3=spl[2]
if(arg1=='normal' || arg1=='bold')o.fontWeight=arg1
var pxx=arg2.replace('px','')
var fontSz=pxx as int
if(fontSz>0)o.fontSize=fontSz
o.fontName=arg3
}else if(sz==2){
var pxx=arg1.replace('px','')
var fontSz=pxx as int
if(fontSz>0)o.fontSize=fontSz
o.fontName=arg2
}
}
}
return o
}


}