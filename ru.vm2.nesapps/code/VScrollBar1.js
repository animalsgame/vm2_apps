class VScrollBar1 extends lang.display.Sprite{
VScrollBar1(target,startH){
var th=this
th.target=target
this.origW=0
this.origH=0
this.isVis=true
this.noSetWidth=false
this.scrollPosChange=false
this.maxValue=0
this.minValue=0
this.posY2=0
this.scaleTarget=1
this.scrollRatio=1
if(startH==null)startH=0
this.targetStartH=startH
this.targetStartW=target.width
this.startY1=target.scrollTop
this.minScrollH=15
this.scrollH=this.minScrollH
this._scrollColor='#3083A7'
this.ev=new lang.events.EventsObjectMaster
this.ev2=new lang.events.EventsObjectMaster
this.w1=0
this.h1=0
this.posDrag=0
this.bgScrollSize={x:0,w:0}
var bgScroll=new lang.display.Sprite
this.pBG=new lang.display.Painter
this.pBG.setTarget(bgScroll)


var getScaleV=(spr)=>{
var par=spr
var v=1
while(par!=null){
v=v*par.scaleX
par=par.parent
}
return v
}


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
th.value=xx
}
this.func1=func1
var sp1=10

if(System.platform.type!='android'){

spr2.on('mousedown',(e)=>{
    
var ratio=getScaleV(target)
th.scaleTarget=ratio
var mxx=e.mouseX/ratio
var myy=e.mouseY/ratio
    
//if('stopImmediatePropagation' in e)e.stopImmediatePropagation()
var my=myy-spr2.y
//if('mouseY' in spr2)my=spr2.mouseY
th.posDrag=my//-spr2.y
//th.posDrag=e.mouseY-spr2.y
th.stage.on('mousemove',func1)
var thh=th
th.stage.on('mouseup',(e)=>{
thh.stage.off('mouseup',arguments.callee)
thh.stage.off('mousemove',thh.func1)
})
})

spr.on('mousedown',(e)=>{
//if('stopImmediatePropagation' in e)e.stopImmediatePropagation()
var thh=th
var ratio=getScaleV(target)
var pos3=spr2.getAbsolutePos()
var pos2=(e.mouseY/ratio)-pos3.y+spr2.y
//var qq=Math.floor((pos2/(th.scrollH-(th.h1/2)))*(th.scrollH-(th.h1/2)))
var qq=pos2-(th.scrollH/2)
th.value=qq

th.posDrag=(e.mouseY/ratio)-spr2.y

th.stage.on('mousemove',func1)
th.stage.on('mouseup',(e)=>{
thh.stage.off('mouseup',arguments.callee)
thh.stage.off('mousemove',thh.func1)
})
})

}else{
    
th.ev.on($app.stage,'mousedown',(e)=>{
    
var ratio=getScaleV(target)
th.scaleTarget=ratio
var mxx=e.mouseX/ratio
var myy=e.mouseY/ratio
var my=myy-(-spr2.y)
    
//if('stopImmediatePropagation' in e)e.stopImmediatePropagation()
th.posDrag=my
var pos1=target.getAbsolutePos()
var pos2=spr.getAbsolutePos()
var rect=new lang.geom.Rectangle(pos1.x,pos2.y,th.target.width,th.h1)
var r2=th.rectIntersect(rect,mxx,myy)
th.ev2.clear()

th.ev2.on($app.stage,'mouseup',(e)=>{
th.ev2.clear()
})

if(r2==true){
var w2=th.target.width
th.ev2.on($app.stage,'mousemove',(e)=>{
var xx=(e.mouseY/ratio)-th.posDrag
th.value=-xx
})
}
})

}
//alert(this.target.height,this.target.scrollContent)
//this.setMaxValue(this.target.height-this.target.y)
//this.setMaxValue(this.target.scrollContent)
this.reload()
}

reload(tt){
var cntWW=this.target.width
if(cntWW<this.targetStartW)cntWW=this.targetStartW
if(this.noSetWidth==false)this.target.width=cntWW-this.origW
var y3=0
//var y3=this.target.y
//if($app.isScrollPosY)y3=0
//alert(this.target.height,this.target.y)
var vv=(this.target.height-y3)//+this.posY2
this.setMaxValue(vv,tt)
//this.visible=vv>this.targetStartH
//alert(vv>this.targetStartH)
//if(this.target.height+allScrollH>=allScrollH)this.visible=true
if(tt==null)
this.resize(this.origW,this.origH)
this.redraw()
}

rectIntersect(r, posx, posy){
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
this.origW=w
this.origH=h
var w2=this.targetStartW-w
//if($app.isScrollPosY)w2=w2+this.target.x
//this.x=0
//this.y=0
if(this.scrollPosChange){
this.x=w2
this.y=this.target.y
}
this.w1=w
this.h1=h
this.scrollH=h
/*this.h1=0
this.scrollH=h-this.minScrollH
if(this.scrollH<=this.minScrollH)this.scrollH=this.minScrollH*/

//alert('aaaa',this.scrollH)
//this.value=0
this.redraw()
}

update(){
var th=this
if(th.target!=null){
var hh=th.h1+th.target.scrollHeight
//if(th.contentScroll!=-1)hh=th.h1+th.contentScroll
th.maxValue=hh
th.redraw()
}
}

remove(){
this.ev.clear()
this.ev2.clear()
}

upd2(){
var th=this

var lastRatio=th.scrollRatio
if(th.maxValue!=0)th.scrollRatio=(th.h1/th.maxValue)
//*0.72
else th.scrollRatio=1
//var ratioV=1
//alert(th.maxValue,th.scrollRatio)
//if(th.maxValue!=0)ratioV=(th.h1/th.maxValue)
th.scrollH=th.h1*th.scrollRatio as int
if(th.scrollH<30)th.scrollH=30
/*if(th.scrollRatio>lastRatio){
th.value=th.maxValue
}*/
var sc=this.scrollRatio
if(sc>=1.0){
this.visible=false
}else{
this.visible=true
}
if(this.isVis==false)this.visible=false
}

redraw(){
this.upd2()
var marg=0
var allScrollH=this.scrollH
this.p.clear()
this.p2.clear()
this.p.rect(0,0,this.w1,this.h1,'#000000')
this.p2.rect(marg,marg,this.w1-(marg*2),allScrollH-(marg*2),this._scrollColor)
}

setMaxValue(v,isReset){
if(v<0)v=0
this.scrollRatio=1
//this.visible=v>this.targetStartH
this.maxValue=v//-this.targetStartH//-(this.scrollH+this.minScrollH)
//alert(v,this.maxValue)
if(this.maxValue<0)this.maxValue=0
//this.h1=0
if(isReset==null)this.value=0
this.redraw()
}

set value(v){
    
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
this.upd2()
}
}