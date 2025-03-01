class Painter{
Painter(){
/*this.list=[]
this.translateObj={x:0,y:0}
this.moveToPos=null
this.lineToPos=null
this.rotateV=0
this.alpha=1
this._target=null
this.borderFill={thickness:0,color:0,alpha:1}
this.lineStyleFill={thickness:0,color:null}
this.fillStyle={color:null,alpha:1}*/
}

/*setTarget(spr){
if(spr is lang.display.Sprite){
this._target=spr
}
}*/
native setTarget(o){}
native drawObject(o){}	
native clear(){}
native border(_thickness,_color,_alpha){}
native circle(x,y,radius,color){}
native rect(x,y,w,h,color){}
native rectRound(){}
native translate(x,y){}
native pos(x,y){}
native rotate(v){}
native image(x,y,bmdObj,img){}

/*native clear2(v){
}*/

/*scale(x,y){
var o={type:'scale',x:x,y:y}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}*/

/*_clearFill(){
this.fillStyle={color:null,alpha:1}
this.lineStyleFill={thickness:0,color:null}
this.borderFill={thickness:0,color:null,alpha:1}
}

clear(){
this.list=[]
this.translateObj={x:0,y:0}
this._clearFill()
this.rotateV=0
this.alpha=1
if(this._target!=null)this._target.graphicsList=[]
//trace('cleeeear',this.clear2);
this.clear2(this._target)
}*/


/*_drawRectRound(x,y,w,h,color,round){
var r=this.rotateV
var aa=this.alpha
var translateO=this.translateObj
var borderV={}
var thicknessV=this.borderFill.thickness
borderV.thickness=this.borderFill.thickness
borderV.color=this.borderFill.color
borderV.alpha=this.borderFill.alpha
var o={type:'rect',border:borderV,rounded:round,x:x,y:y,w:w,h:h,color:color,r:r,matrix:translateO,alpha:aa}
o.fillStyle=this.fillStyle
this.list.push(o)
this.drawObject(o)
if(this._target!=null)this._target.graphicsList.push(o)
this.borderFill.thickness=0
this.borderFill.color=0
}*/

/*border(_thickness,_color,_alpha){
this.borderFill.thickness=_thickness
this.borderFill.color=_color
if(_alpha==null)_alpha=1
this.borderFill.alpha=_alpha
}*/

/*circle(x,y,radius,color){
this.rectRound(x,y,radius,radius,color,radius*2)
//this._drawRectRound(x,y,radius,radius,color,radius*2)
}*/

createLinearGradient(x0,y0,x1,y1,colors,ratios){
var o={type:'linearGradient',p:[x0,y0,x1,y1],colors:colors,ratios:ratios}
this.fillStyle=o
return o
}

beginGradientFill(type,colors,ratios,x0,y0,x1,y1){
var o={type:'gradient',type:type,p:[x0,y0,x1,y1],colors:colors,ratios:ratios}
this.fillStyle=o
return o
}

lineStyle(_thickness,_color){
this.lineStyleFill.thickness=_thickness
this.lineStyleFill.color=_color
}
moveTo(x,y){
this.moveToPos={x:x,y:y}
var o={type:'moveTo',x:x,y:y}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}
lineTo(x,y){
this.lineToPos={x:x,y:y}
var o={type:'lineTo',x:x,y:y}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}
curveTo(controlX,controlY,anchorX,anchorY){
var arr=[controlX,controlY,anchorX,anchorY]
var o={type:'curveTo',arr:arr}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}
beginFill(color,alpha){
this.fillStyle={color:color,alpha:alpha}
var o={type:'beginFill',arr:[color,alpha]}
//this.fillStyle.color=color
//this.fillStyle.alpha=alpha
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}
endFill(){
var o={type:'endFill',lineStyle:this.lineStyleFill,fillStyle:this.fillStyle}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
//this._clearFill()
}

/*rect(x,y,w,h,color){
//this._drawRectRound(x,y,w,h,color,0)
this.rectRound(x,y,w,h,color,0)
}*/

/*rectRound(x,y,w,h,color,r){
this._drawRectRound(x,y,w,h,color,r)
}*/
/*rectRoundComplex(x,y,w,h,color,tl,tr,bl,br){
var r=this.rotateV
var aa=this.alpha
var ar1=[tl,tr,bl,br]
var translateO=this.translateObj
var borderV={}
var thicknessV=this.borderFill.thickness
borderV.thickness=this.borderFill.thickness
borderV.color=this.borderFill.color
borderV.alpha=this.borderFill.alpha
var o={type:'rectComplex',border:borderV,x:x,y:y,w:w,h:h,color:color,r:r,matrix:translateO,alpha:aa,ar1:ar1}
this.list.push(o)
this.drawObject(o)
if(this._target!=null)this._target.graphicsList.push(o)
this.borderFill.thickness=0
this.borderFill.color=0
this.borderFill.alpha=1
}*/
/*rectImage(x,y,w,h,img){
var r=this.rotateV
var translateO=this.translateObj
var aa=this.alpha
var o={type:'rectImage',x:x,y:y,w:w,h:h,img:img,r:r,matrix:translateO,alpha:aa}
if(this._target!=null)this._target.graphicsList.push(o)
}*/

/*image(x,y,bmdObj,img){

var r=this.rotateV
var aa=this.alpha
var translateO=this.translateObj
var borderV={}
var thicknessV=this.borderFill.thickness
borderV.thickness=this.borderFill.thickness
borderV.color=this.borderFill.color
borderV.alpha=this.borderFill.alpha
var o={type:'image',border:borderV,x:x,y:y,bmdObj:bmdObj,img:img,color:0,r:r,matrix:translateO,alpha:aa}
this.list.push(o)
this.drawObject(o)
if(this._target!=null)this._target.graphicsList.push(o)
}*/
/*
drawPainterStr(o){
var s=''
if(o!=null){
for (var i = 0; i < o.list.size; i++) {
var el=o.list[i]
var tt=''
if(el.r>0)tt+='transform:rotate('+el.r+'deg);transform-origin: 0 0;'
if(el.alpha!=1.0)tt+='opacity:'+el.alpha+';'


var x=el.matrix.x+el.x
var y=el.matrix.y+el.y
var w=el.w
var h=el.h
if(el.type=='rect'){
var round=el.rounded;
var isCircle=false
if(round>0){
if(w==h){
if(round==w*2){
isCircle=true	
}
}
}

if(isCircle==true){
w=round
h=round
x-=(round/2)
y-=(round/2)
tt+='border-radius:'+round+'px;'
}

if(el.color is String){
s+='<div style="position:absolute;left:'+x+'px;top:'+y+'px;background:'+el.color+';width:'+w+'px;height:'+h+'px;'+tt+'"></div>' 	
}else if(el.color is lang.display.Bitmap){
s+='<div style="position:absolute;left:'+x+'px;top:'+y+'px;background:url('+el.color.src+');width:'+w+'px;height:'+h+'px;'+tt+'"></div>' 	
}
}else if(el.type=='rectImage'){
if(el.img is lang.display.Bitmap){
s+='<div style="position:absolute;left:'+x+'px;top:'+y+'px;background:url('+el.img.src+');width:'+w+'px;height:'+h+'px;'+tt+'"></div>'    
}
}else if(el.type=='image'){
if(el.img is lang.display.Bitmap){
s+='<img style="position:absolute;left:'+x+'px;top:'+y+'px;'+tt+'" src="'+el.img.src+'">'    
}
}
}
}
return s
}*/

/*translate(x,y){
var o={type:'translate',x:x,y:y}
this.list.push(o)
if(this._target!=null)this._target.graphicsList.push(o)
}

pos(x,y){
this.translateObj={x:x,y:y}
}

rotate(v){
this.rotateV=v
}*/

draw(spr){

}

//draw(spr){
/*if(spr!=null){
var str=drawPainterStr(this)
var strr=spr.html+str
spr.html=strr
}*/
//}

}