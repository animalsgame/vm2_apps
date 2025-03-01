class VScrollBar extends lang.display.Sprite{

VScrollBar(target,_scrollH,cbinit){
var th=this
th.target=target
this.maxValue=0
this.minValue=0
this.scrollH=_scrollH
this._scrollColor='#CCCCCC'
this.w1=0
this.h1=0
this.posDrag=0
var spr=new lang.display.Sprite
addChild(spr)
var p=new lang.display.Painter
this.p=p
p.setTarget(spr)

var spr2=new lang.display.Sprite
addChild(spr2)
var p2=new lang.display.Painter
this.p2=p2
p2.setTarget(spr2)
this.spr2=spr2
resize(10,this.scrollH)

var func1=(e)=>{
var xx=e.mouseY-th.posDrag
if(xx<=0)xx=0
if(xx>=(th.scrollH-th.h1))xx=th.scrollH-th.h1
spr2.y=xx
var qq=Math.floor(xx/th.scrollH*th.maxValue)
if(target!=null){
target.y=-qq
}
}
th.func1=func1
       
spr2.on('mousedown',(e)=>{
th.posDrag=e.mouseY-spr2.y
th.stage.on('mousemove',func1)
var thh=th
th.stage.on('mouseup',(e)=>{
thh.stage.off('mouseup',arguments.callee)
thh.stage.off('mousemove',thh.func1)
})
})


spr2.on('mousewheel',(e)=>{
var v1=-target.y
if(e.deltaY>0){
th.value=v1+15
}else th.value=v1-15
})
spr.on('mousewheel',(e)=>{
var v1=-target.y
if(e.deltaY>0){
th.value=v1+15
}else th.value=v1-15
})
target.on('mousewheel',(e)=>{
var v1=-target.y
if(e.deltaY>0){
th.value=v1+15
}else th.value=v1-15
})

if(cbinit!=null)cbinit();
}

resize(w,h){
this.w1=w
this.scrollH=h
this.redraw();
}

redraw(){
this.p.clear()
this.p.rect(0,0,this.w1,this.scrollH,'#F1F1F1')
this.p2.clear()
var sc=this.scrollH/this.maxValue
var hh=this.scrollH*sc
var marg=2
this.visible=hh<this.scrollH
if(hh>this.scrollH)hh=this.scrollH
this.h1=hh
this.p2.rect(marg,marg,this.w1-(marg*2),hh-(marg*2),this._scrollColor)
}

set colorBar(v){
this._scrollColor=v
this.redraw();
}	

setMaxValue(v){
this.maxValue=v
this.redraw()
}

set value(v){
if(v<=this.minValue)v=this.minValue
if(v+this.scrollH>=this.maxValue)v=this.maxValue-this.scrollH
//trace(v+this.scrollH,this.maxValue)
var xx=Math.floor(v/this.maxValue*this.scrollH)
//trace(v,xx,this.maxValue,this.scrollH);
this.spr2.y=xx
this.target.y=-v
//this.lastValue=v
}

}