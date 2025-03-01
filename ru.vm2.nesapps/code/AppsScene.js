class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(cb){
var th=this
th.cb=cb
th.allW=0
th.borderV=10
th.w=800
th.h=0
th.lineItemW=5
th.lastLineItemW=0
th.curItemW=145
th.curItemH=128
th.itemH=135
th.isLoadItems=false
th.ev1=new lang.events.EventsObjectMaster
th.spr1=new lang.display.Sprite
th.spr1.x=5
th.spr1.y=5
th.bg=new lang.display.Sprite
th.bg.createPainter()
th.clrDef=0xFFFFFF
th.lastSprNav=null
th.posNav=0
th.sc=new VScrollBar1(th.spr1,0)
th.sc.y=2

var tf=new lang.text.TextField
tf.y=10
tf.fontName='Arial'
tf.fontSize=20
tf.color=0xFFFFFF
tf.bold=true

th.tfTitle=tf
var changeSound=null
var spr2=new lang.display.Sprite
spr2.x=5
spr2.y=10
/*var tf=new lang.text.TextField
tf.fontName='Arial'
tf.fontSize=20
tf.color=0xFFFFFF
tf.bold=true
tf.text='звук: '
spr2.addChild(tf)*/

/*var soImg=new lang.display.Bitmap
soImg.src=$app.assetsObjURL['audio1']
soImg.y=-6
soImg.scaleX=0.5
soImg.scaleY=0.5
soImg.buttonMode=true*/

var tf4=new lang.text.TextField
tf4.fontName='Arial'
tf4.fontSize=18
tf4.color=0xFFFF00
tf4.bold=true
tf4.text='настройки'
tf4.buttonMode=true
tf4.on('click',()=>{
$app.openPopupSettings()
})
spr2.addChild(tf4)
//spr2.addChild(soImg)

/*var clrSoundDef=0x0BE333
var clrSoundNo=0xFF00EE
var s2='есть'
if($app.nesVolume==0)s2='нет'
var tf2=new lang.text.TextField
tf2.fontName='Arial'
tf2.fontSize=20
tf2.color=clrSoundDef
if($app.nesVolume==0)tf2.color=clrSoundNo
tf2.bold=true
tf2.text=s2
tf2.x=(soImg.naturalWidth*soImg.scaleX)+5
//spr2.addChild(tf2)*/

addChild(th.bg,th.spr1,th.sc)

/*var maxVol=100
var lastVol=0
var volumeSlider=null

var changeVol=(v,noupd)=>{
lastVol=$app.nesVolume
if(!noupd)volumeSlider.setValue(v/maxVol)
$app.setNesVolume(v)
var tintImg=(v==0) ? 0xF7D4B7 : 0xFFFFFF
if(soImg.tint!=tintImg)soImg.tint=tintImg
}

volumeSlider=$app.createSlider((k)=>{
var vol=Math.floor(k*100)
if(vol<0)vol=0
if(vol>100)vol=100
changeVol(vol,true)
})

volumeSlider.x=tf2.x+15
volumeSlider.y=5
volumeSlider.resize(70)

changeVol($app.nesVolume)

spr2.addChild(volumeSlider)*/

this.sprHeader=new lang.display.Sprite
this.sprHeader.addChild(th.tfTitle,spr2)
$app.scenesMaster.headerSpr.addChild(this.sprHeader)

/*changeSound=()=>{
if($app.nesVolume==0){
tf2.color=clrSoundDef
tf2.text='есть'
$app.nesVolume=lastVol
changeVol($app.nesVolume)
}else{
tf2.color=clrSoundNo
tf2.text='нет'
changeVol(0)
}
//tf2.x=tf.width
}

tf.buttonMode=true
soImg.on('click',changeSound)
tf2.buttonMode=true
tf2.on('click',changeSound)*/

/*var tf3=new lang.text.TextField
tf3.fontName='Arial'
tf3.fontSize=20
tf3.color=0x00FFFF
tf3.bold=true
tf3.text='на весь экран'
tf3.buttonMode=true
tf3.on('click',()=>{
$app.isFsEnable=th.stage.displayState=='normal'
th.stage.displayState=(th.stage.displayState=='normal') ? 'fullscreen' : 'normal'
})
spr2.addChild(tf3)
th.fsBut=tf3*/

th.fsBut=new lang.display.Bitmap
th.fsBut.src=$app.assetsObjURL['FullscreenImg']
th.fsBut.y=-4
th.fsBut.scaleX=0.9
th.fsBut.scaleY=0.9
th.fsBut.buttonMode=true
th.fsBut.on('click',()=>{
$app.isFsEnable=th.stage.displayState=='normal'
th.stage.displayState=(th.stage.displayState=='normal') ? 'fullscreen' : 'normal'
})
th.fsBut.on('rollover',()=>{this.alpha=0.8})
th.fsBut.on('rollout',()=>{this.alpha=1})
spr2.addChild(th.fsBut)

th.drawInfo()
}

drawInfo(){
var th=this
$app.nes.pause=true
var arr=Roms.romsList
var xx=0
var yy=0
var num=0
var lineNumX=0
var allLinesV=0
if(arr){
//arr.shuffle()
arr.eachTime(20,(el)=>{
var qq=th.createItem(el)
var allW=qq.allW+th.borderV+5
//if(xx+allW>th.w){
var n3=num%th.lineItemW
qq.x=xx
qq.y=yy
xx=xx+allW
if(num>0 && n3==th.lineItemW-1){
xx=0
yy=yy+th.curItemH
if(lineNumX==0)lineNumX=num+1
num=0
}else{
num+=1
}

th.spr1.addChild(qq)
th.sc.reload()

/*th.spr1.x=0
th.spr1.x=(th.allW-th.spr1.width)/2*/
},()=>{
if(lineNumX==0)lineNumX=num
var h2=Math.ceil(arr.length/lineNumX)
allLinesV=lineNumX*h2
th.isLoadItems=true
th.updNav()
})
/*for (var i = 0; i < arr.length; i++) {
var el=arr[i]
var qq=th.createItem(el)
qq.x=yy
yy=yy+qq.allH+5
th.spr1.addChild(qq)
}
th.updNav()*/


th.ev1.on(th.stage,'keydown',(e)=>{
var keyui=lang.ui.Keyboard
if(th.isLoadItems){
var allV=th.spr1.numChildren
if(e.keyCode==keyui.DOWN || e.keyCode==keyui.RIGHT){
th.posNav+=1
if(th.posNav>=allV)th.posNav=0
th.updNav()
}else if(e.keyCode==keyui.UP || e.keyCode==keyui.LEFT){
th.posNav-=1
if(th.posNav<0)th.posNav=th.spr1.numChildren-1
th.updNav()
}else if(e.keyCode==keyui.ENTER){
if(th.lastSprNav){
th.cb(th.lastSprNav.elObj)
}
}
}
})


/*th.ev1.on(th.stage,'keydown',(e)=>{
var keyui=lang.ui.Keyboard
if(th.isLoadItems){
if(lineNumX==0)lineNumX=1
var allV=th.spr1.numChildren
var q2=allLinesV-allV
var lineDown=lineNumX-q2
if(e.keyCode==keyui.DOWN){
//th.posNav+=1
th.posNav+=lineNumX
if(th.posNav>=allV){
//alert(lineNumX-q2,th.posNav%(lineNumX-q2))
//th.posNav=th.posNav-((lineNumX-1)-q2)
//var num2=th.posNav-allV
//alert(num2,(th.posNav%lineNumX)+1)
//alert(lineNumX-q2,th.posNav,allV)
//alert((th.posNav-1)%lineDown)
//alert(th.posNav,(th.posNav%lineNumX))
//alert(th.posNav,allLinesV)
var isEnd=false
if(th.posNav==allLinesV-1 || th.posNav==(allLinesV+lineNumX)-1)isEnd=true

if(isEnd){
th.posNav=0
}else{
th.posNav=(th.posNav%lineNumX)+1
}
}
th.updNav()
}else if(e.keyCode==keyui.UP){
//th.posNav-=1
th.posNav-=lineNumX
if(th.posNav<0){
var q2=allLinesV-allV
var num3=(-th.posNav%lineNumX)
var q3=lineNumX-q2
//var num2=lineNumX-(-th.posNav)
//var x2=(allV-lineNumX)+num2
if(num3<q2){
th.posNav=(allV-q3)-num3-1
}else{
var x2=(allV+q2)-num3
th.posNav=x2-1
}
}
th.updNav()
}else if(e.keyCode==keyui.RIGHT){
th.posNav+=1
if(th.posNav>=th.spr1.numChildren)th.posNav=0
th.updNav()
}else if(e.keyCode==keyui.LEFT){
th.posNav-=1
if(th.posNav<0)th.posNav=th.spr1.numChildren-1
th.updNav()
}else if(e.keyCode==keyui.ENTER){
if(th.lastSprNav){
th.cb(th.lastSprNav.elObj)
}
}
}
})*/

}
}

getPosNav(val){
var th=this
var lineW=th.lineItemW
var nums=th.spr1.numChildren
var xx=val%lineW
var yy=Math.floor(val/lineW)
//alert(Math.ceil(nums/lineW))
var v=(yy*lineW)+xx
return v
}

updNav(){
var th=this
if(th.lastSprNav){
th.lastSprNav.setNoActiveItem()
}
//th.lastSprNav.txtInfo.color=th.clrDef
th.lastSprNav=null
var num=th.getPosNav(th.posNav)
var d=th.spr1.getChildAt(num)
if(d){
d.setActiveItem()
th.lastSprNav=d
}
}

recalcPos(){
var th=this
var xx=0
var yy=0
var num=0
var lw=th.lineItemW
if(lw<1)lw=1
for (var i = 0; i < th.spr1.numChildren; i++) {
var d=th.spr1.getChildAt(i)

var xpos=i%lw
var ypos=Math.floor(i/lw)
d.x=th.curItemW*xpos
d.y=th.curItemH*ypos

/*var n3=num%lw
xx=xx+th.curItemW
if(num>0 && n3==lw-1){
xx=0
yy=yy+th.curItemH
if(lineNumX==0)lineNumX=num+1
num=0
}else{
num+=1
}*/

}
}

createItem(el){
var th=this
var nm=el.name
var borderV=th.borderV
var imgSize=140
var imgW=imgSize-borderV
var imgH=imgW-18
var rectW=imgW+borderV
var rectH=imgH+borderV
var isActive=false
var spr=new lang.display.Sprite
spr.allW=imgW
spr.allH=imgSize

var bg1=new lang.display.Sprite
bg1.createPainter()

spr.setActiveItem=()=>{
isActive=true
th.tfTitle.text=el.name
th.tfTitle.x=(th.allW-th.tfTitle.width)/2
//this.txtInfo.color=0xFF0000
this.redrawItem()
}

spr.setNoActiveItem=()=>{
isActive=false
//this.txtInfo.color=th.clrDef
this.redrawItem()
}

spr.redrawItem=()=>{
bg1.painter.clear()
var clrV=0
if(isActive){
clrV=0x00CC00
bg1.painter.border(borderV,clrV)
}else{
bg1.painter.border(borderV,clrV,0.5)
}
bg1.painter.rect(0,0,rectW,rectH,'#FFFFFF')
}

var bm=new lang.display.Bitmap
bm.x=borderV/2
bm.y=borderV/2
bm.visible=false
bm.on('load',()=>{
this.off('load',arguments.callee)
this.scaleX=imgW/this.naturalWidth
this.scaleY=imgH/this.naturalHeight
/*var factor=Math.min(imgW/this.naturalWidth,imgH/this.naturalHeight)
this.scaleX=factor
this.scaleY=factor*/
this.visible=true
})
bm.src=el.img
bm.on('click',()=>{
th.cb(el)
})
bm.on('rollover',()=>{
var ind=th.spr1.getChildIndex(spr)
if(ind>-1){
th.posNav=ind
th.updNav()
}
//alert(el.name)
})
bm.buttonMode=true
bm.elObj=el
/*var tf=new lang.text.TextField
//tf.x=imgSize+5
tf.fontName='Arial'
tf.fontSize=18
tf.color=th.clrDef
tf.text=nm
tf.bold=true
tf.y=(imgSize-tf.height)/2
tf.mouseEnabled=false
spr.txtInfo=tf*/
spr.setNoActiveItem()
spr.addChild(bg1,bm/*,tf*/)
spr.elObj=el
return spr
}

removeScene(){
this.ev1.clear()
if(this.sprHeader && this.sprHeader.parent)this.sprHeader.parent.removeChild(this.sprHeader)
this.sc.remove()
}

resize(w,h){
var th=this
//this.w=w

var lw=Math.floor((w-th.spr1.x)/th.curItemW)
th.lineItemW=lw

if(th.isLoadItems && th.lastLineItemW!=lw){
th.lastLineItemW=lw
th.recalcPos()
}
this.allW=w
this.h=h
this.tfTitle.x=(this.allW-this.tfTitle.width)/2
this.sc.resize(15,h-5)
this.sc.reload()
this.sc.x=w-15
this.bg.painter.clear()
this.bg.painter.rect(0,0,w,h,'#F9F9F9')
/*if(this.isLoadItems){
this.spr1.x=0
this.spr1.x=(w-this.spr1.width)/2
}*/
this.fsBut.x=w-(this.fsBut.naturalWidth+8)
//this.spr1.y=h-(this.itemH+8)
}

}