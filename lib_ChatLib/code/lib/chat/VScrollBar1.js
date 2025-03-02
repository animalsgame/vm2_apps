class %CURRENT_CLASSNAME% extends lang.display.Sprite{
%CURRENT_CLASSNAME%(target){
var th=this

var gl=GLOBAL
var isTween=false
if('lib' in gl){
if('Tween' in gl.lib){
isTween=true
}
}
this.valuee=0
this.enableScroll=true
this.contentScroll=-1
this.target=target
this.maxValue=0
this.minValue=0
this.startY1=target.y
this.minScrollH=35
this.scrollRatio=1
this.scrollH=this.minScrollH
this._scrollColor='#BABABA'
this.ev=new lang.events.EventsObjectMaster
this.ev2=new lang.events.EventsObjectMaster
this.w1=0
this.h1=0
this.posDrag=0
this.scaleTarget=1
this.isVis=true
this.bgScrollSize={x:0,w:0}
var bgScroll=new lang.display.Sprite
this.pBG=new lang.display.Painter
this.pBG.setTarget(bgScroll)

var spr=new lang.display.Sprite
addChild(spr)
var p=new lang.display.Painter
this.p=p
p.setTarget(spr)
var spr2=new lang.display.Sprite
addChild(spr2)
this.spr2=spr2
var p2=new lang.display.Painter
this.p2=p2
p2.setTarget(spr2)
this.spr2=spr2
resize(10,this.scrollH)
var func1=(e)=>{
var xx=(e.mouseY/th.scaleTarget)-th.posDrag
//alert(xx,e.mouseY)
//var qq=Math.floor((e.mouseY/xx)*th.maxValue)
if(th.enableScroll)th.value=xx

//th.value=xx
}
var sp1=10
/*var funcWheel=(e)=>{
var pos1=target.getAbsolutePos()
var x2=e.mouseX-pos1.x
var y2=e.mouseY-pos1.y+th.target.y
if(x2>0){
if(y2>0){
if(x2<th.target.width-th.w1){
//alert(th.target.width)
if(y2<th.scrollH+th.h1){
var v1=spr2.y
if(e.deltaY>0){
var v3=v1+sp1
th.value=v3
}else{
th.value=v1-sp1
}
//trace(x2,y2,bgScroll.width,bgScroll.height)
}
}
}
}
}*/

th.func1=func1

//th.ev.on(th.stage,'mousewheel',funcWheel)


var getScaleV=(spr)=>{
var par=spr
var v=1
while(par!=null){
v=v*par.scaleX
par=par.parent
}
return v
}

if(System.platform.type!='pc'){
//this.isVis=false
var cbList=[]
th.ev.on(th.stage,'mouseup',(e)=>{
for (var i = 0; i < cbList.size; i++) {
var cbb=cbList[i]
cbb()
}
cbList=[]
})

th.ev.on(th.stage,'mousedown',(e)=>{
var ratio=getScaleV(target)
th.scaleTarget=ratio
var mxx=e.mouseX/ratio
var myy=e.mouseY/ratio
var my=myy-(-spr2.y)
var tw=th.target.width
th.posDrag=my
var pos1=target.getAbsolutePos()
var pos2=spr.getAbsolutePos()
var rect=new lang.geom.Rectangle(pos1.x,pos2.y,tw,th.h1)
var r2=th.rectIntersect(rect,e.mouseX/ratio,e.mouseY/ratio)
//alert(r2,ratio,pos2.y,mxx,myy)
th.ev2.clear()
cbList.push(()=>{
th.ev2.clear()
})
if(r2==true){
th.ev2.on(th.stage,'mousemove',(e)=>{
var xx=(e.mouseY/ratio)-th.posDrag
if(isTween==true){
var obb={v:th.valuee}
var tween = new lib.Tween(obb)
tween.init({v:-xx}, 50,()=>{
th.value=obb.v
},()=>{})
tween.start()
}else{
th.value=-xx
}

})
}
})
}else{
spr2.on('mousedown',(e)=>{
var ratio=getScaleV(target)
th.scaleTarget=ratio
th.posDrag=(e.mouseY/ratio)-spr2.y
th.ev.on(th.stage,'mousemove',func1)
var thh=th
th.ev.on(th.stage,'mouseup',(e)=>{
th.ev.off(th.stage,'mouseup',arguments.callee)
th.ev.off(th.stage,'mousemove',th.func1)
})
})

spr.on('mousedown',(e)=>{
var ratio=getScaleV(target)
var pos3=spr2.getAbsolutePos()
var pos2=(e.mouseY/ratio)-pos3.y+spr2.y
//alert(pos2)
//var qq=Math.floor((pos2/(th.scrollH-(th.h1/2)))*th.h1)
//alert(75)
//var isMouseUP=false
th.enableScroll=true
var cbUP=(e)=>{
th.ev.off(th.stage,'mouseup',cbUP)
th.ev.off(th.stage,'mousemove',th.func1)
}
th.ev.on(th.stage,'mouseup',cbUP)
th.ev.on(th.stage,'mousemove',th.func1)

var xx=pos2-(th.scrollH/2)
if(isTween==true){
th.enableScroll=false
var obb={v:th.valuee}
var tween = new lib.Tween(obb)
tween.init({v:xx}, 100,()=>{
th.value=obb.v
},()=>{
th.posDrag=(e.mouseY/ratio)-spr2.y
th.enableScroll=true
})
tween.start()    
}else{
th.value=xx
}

})

}
}

static rectIntersect(r, posx, posy){
var minX = Math.min(r.x, r.x + r.width)
var maxX = Math.max(r.x, r.x + r.width)
var minY = Math.min(r.y, r.y + r.height)
var maxY = Math.max(r.y, r.y + r.height)
if(posx >= minX){
if(posx < maxX){
if(posy >= minY){
if(posy < maxY){
return true
}
}
}
}
return false
}

resize(w,h){
this.w1=w
this.h1=h
this.scrollH=h
this.redraw()
}

update(){
var th=this
if(th.target!=null){
var hh=th.h1+th.target.scrollHeight
if(th.contentScroll!=-1)hh=th.h1+th.contentScroll
th.maxValue=hh
var lastRatio=th.scrollRatio
th.scrollRatio=th.h1/th.maxValue
th.scrollH=th.h1*th.scrollRatio as int
if(th.scrollH<30)th.scrollH=30
if(th.scrollRatio>lastRatio){
th.value=th.maxValue
}
//alert(lastRatio,th.scrollRatio)
th.redraw()
}
}

remove(){
this.ev.clear()
this.ev2.clear()
}

redraw(){
var allScrollH=this.scrollH
this.p.clear()
this.p2.clear()
this.p.rect(0,0,this.w1,this.h1,'#000000')
var sc=this.scrollRatio
var hh=allScrollH
var marg=0
if(sc>=1.0){
this.visible=false
}else{
this.visible=true
}

if(this.isVis==false)this.visible=false

this.p2.rect(marg,marg,this.w1-(marg*2),hh-(marg*2),this._scrollColor)
}

set value(v){
this.valuee=v
if(v<=0)v=0
var allScrollH=this.scrollH
var allContentH=this.maxValue-this.h1
var maxH=this.h1-allScrollH
if(this.scrollRatio>=1.0){
this.spr2.y=0
this.target.scrollTop=0
}else{
var k1=v/maxH
if(k1>=1.0)k1=1
maxH=this.h1-allScrollH
var xx=Math.floor(k1*maxH)
var xx2=Math.floor(k1*allContentH)
this.spr2.y=xx
this.target.scrollTop=this.startY1+xx2
}
}
}