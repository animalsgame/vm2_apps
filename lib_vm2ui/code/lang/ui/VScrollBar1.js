class VScrollBar1 extends lang.display.Sprite{
VScrollBar1(target){
var th=this
th.target=target
this.maxValue=0
this.minValue=0
this.startY1=target.y
this.scrollH=15
this._scrollColor='#6CAEC0'
this.ev=new lang.events.EventsObjectMaster
this.w1=0
this.h1=0
this.posDrag=0
this.bgScrollSize={x:0,w:0}
var bgScroll=new lang.display.Sprite
//bgScroll.alpha=0
//addChild(bgScroll)
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
var xx=e.mouseY-th.posDrag
th.value=xx
}

var sp1=10

var funcWheel=(e)=>{
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
 
}

th.func1=func1

this.ev.on(th.stage,'mousewheel',funcWheel)

spr2.on('mousedown',(e)=>{
th.posDrag=e.mouseY-spr2.y
th.stage.on('mousemove',func1)
var thh=th
th.stage.on('mouseup',(e)=>{
thh.stage.off('mouseup',arguments.callee)
thh.stage.off('mousemove',thh.func1)
})
})

spr.on('mousedown',(e)=>{
var pos3=spr2.getAbsolutePos()
var yy1=e.mouseY-pos3.y
if(yy1<0){
yy1=-yy1
//th.value=spr2.y-sp1
//alert('up',yy1)    
}else{
//th.value=spr2.y+sp1

//alert('down',th.scrollH,v4)
}


var pos2=e.mouseY-pos3.y+spr2.y
var qq=Math.floor((pos2/(th.scrollH-(th.h1/2)))*th.scrollH)
th.value=qq

//var v4=Math.floor((yy1/(th.scrollH+(th.h1/2)))*th.scrollH)
//th.value=v4

})


/*spr2.on('mousewheel',(e)=>{
var v1=spr2.y
if(e.deltaY>0){
var v3=v1+sp1
th.value=v3
}else{
th.value=v1-sp1
}
})
spr.on('mousewheel',(e)=>{
var v1=spr2.y
if(e.deltaY>0){
th.value=v1+sp1
}else th.value=v1-sp1
})
bgScroll.on('mousewheel',(e)=>{
var v1=spr2.y
if(e.deltaY>0){
th.value=v1+sp1
}else th.value=v1-sp1
})*/
}

resize(w,h){
this.w1=w
this.h1=0
this.scrollH=h
this.value=0
this.redraw()
}


remove(){
this.ev.clear()
}

redraw(){
this.pBG.clear()

var w2=this.target.width
if(this.bgScrollSize.w>0)w2=this.bgScrollSize.w
var x1=-(this.target.width-this.w1)
if(this.bgScrollSize.w>0){
x1=-this.bgScrollSize.w+this.bgScrollSize.x
}
if(this.target!=null)this.pBG.rect(x1,0,w2-this.w1,this.scrollH,'#000000')
this.p.clear()
this.p2.clear()
this.p.rect(0,0,this.w1,this.scrollH,'#000000')
var sc=1
if(this.maxValue>0)sc=(this.scrollH)/this.maxValue
var hh=this.scrollH*sc
if(hh<12)hh=12
var marg=0
this.visible=hh<this.scrollH
if(hh>this.scrollH)hh=this.scrollH
this.h1=hh as int
this.p2.rect(marg,marg,this.w1-(marg*2),hh-(marg*2),this._scrollColor)
}

setMaxValue(v){
this.maxValue=v
this.h1=0
this.value=0
this.redraw()
}

set value(v){
if(v<=0)v=0
var xx=0
var maxH=this.scrollH-this.h1
//var sc=(this.scrollH-this.h1)/this.maxValue
//if(v>=this.scrollH*sc)v=this.scrollH*sc
if(v>maxH)v=maxH
if(this.h1>0)xx=Math.floor(v/maxH*maxH)
this.spr2.y=xx
//var xx=Math.floor(v/this.scrollH*this.maxValue)
var xx2=Math.floor(v/this.scrollH*this.maxValue)
//var xx2=Math.floor(v/this.scrollH*this.maxValue)
//if(v+this.scrollH>=this.maxValue)v=this.maxValue-this.scrollH
//var xx=Math.floor(v/this.maxValue*this.scrollH)
//this.spr2.y=xx
this.target.y=this.startY1-xx2

}
}