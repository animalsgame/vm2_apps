class Main extends lang.display.Sprite{
constructor(){
var th=this
th.packageName=null
VM.setGlobal('$app',th)

if(window.AppBuildInfo){
// новинка vm2 компилятора, теперь можно брать id пакета, дату сборки, и название приложения
th.packageName=AppBuildInfo.packageID
System.setAppTitle(AppBuildInfo.appName)
}

if(System.platform.type!='pc'){
alert('Приложение работает только на пк.')
return
}

if(!Array.fill){
alert('Необходимо обновить игровой центр.')
return
}

Utils.copyMethodsGlobal(GlobalUtils)

var map=new MazeMap
var colors=[0,0xFFFFFF]
var bmd3=Utils.pixelsToBMD({width:2,height:2,pixels:[1,1,0,0],palette:['#3CC9C1','#1F8AB5']})

th.stageSize={w:0,h:0}
th.bg=bitmap(bmd3)

th.downH=50
th.cnv=new lang.display.Canvas
addChild(th.cnv)

var BLOCK_ORIG=10
var BLOCK_SIZE=1

th.bmd=new lang.display.BitmapData(map.w*BLOCK_SIZE,map.h*BLOCK_SIZE,0,true)

th.downPanelSpr=sprite()
th.inpSpr=sprite()
th.cntSpr=sprite()
th.bm=new lang.display.Bitmap
th.bm.smoothing=false
th.bm.src=bmd
th.bm.scaleX=BLOCK_ORIG
th.bm.scaleY=BLOCK_ORIG
th.cntSpr.addChild(th.bm)
th.cnv.addChild(th.bg,th.cntSpr,th.downPanelSpr)

Utils.checkUpdate()

var maxW=99

var saveMaze=()=>{
var scaleV=th.bm.scaleX as int
var imgW=th.bm.width*scaleV
var imgH=th.bm.height*scaleV
if(imgW>0 && imgH>0){
var bmd2=new lang.display.BitmapData(imgW,imgH,0,true)
map.render(bmd2,scaleV,colors)
var num=Math.randomInt()
num+=100
var nm='maze'+num+'.png'
var fi=new lang.io.File(nm)
fi.saveDialog(bmd2)
}
}

var reRender=()=>{
map.render(th.bmd,BLOCK_SIZE,colors)
}

var redraw=()=>{
var newW=map.w*BLOCK_SIZE
var newH=map.h*BLOCK_SIZE

if(th.bmd && th.bmd.width==newW && th.bmd.height==newH){

}else{
if(th.bmd){
th.bm.src=null
//th.bmd.destroy()
th.bmd=new lang.display.BitmapData(newW,newH,0,true)
th.bm.src=th.bmd
th.autoResize()
}
}
map.createDef()
map.setValue(0,1,0)
map.setValue(map.w-2,map.h-1,0)
map.gen(1,3)
reRender()
}


var tm1=null

var checkUpd=()=>{
if(tm1==null){
tm1=Timer.init(1000,()=>{
this.stop()
tm1=null
redraw()
})
}
}

var createInput=(txt,w,val,t)=>{
var sp=sprite()
var tx=text(txt)
var tiSpr=textinput(w)
tiSpr.x=tx.width+5
tx.y=3
sp.addChild(tx,tiSpr)
var ti1=tiSpr.ti
sp.ti=ti1
var maxL=2
if(t=='scale')maxL=3
ti1.maxLength=maxL
ti1.value=''+val
ti1.on('input',()=>{
var vv=this.value as int
if(t=='scale'){
var percV=vv/100*BLOCK_ORIG as int
if(percV<BLOCK_ORIG)percV=BLOCK_ORIG
if(percV>50)percV=50
th.bm.scaleX=percV
th.bm.scaleY=percV
th.autoResize()
}else{
if(vv<10)vv=10
if(vv>maxW)vv=maxW
var v2=vv+(1-(vv%2))
var val2=map.w
if(t=='h')val2=map.h
if(val2!=v2){
if(t=='w')map.w=v2
else if(t=='h')map.h=v2
checkUpd()
}
}
})
return sp
}

var createColorPicker=(txt,val,t)=>{
var sp=sprite()
var itemW=26
var tx=text(txt)
tx.y=3
var spr2=sprite()
spr2.createPainter()
spr2.painter.border(5,0)
spr2.painter.rect(0,0,itemW,itemW,val)
spr2.buttonMode=true
spr2.x=tx.width+5
spr2.on('click',()=>{
System.openColorPicker((clr)=>{
spr2.painter.clear()
spr2.painter.border(5,0)
spr2.painter.rect(0,0,itemW,itemW,clr)
colors[t]=clr
reRender()
})
})
sp.addChild(tx,spr2)
return sp
}

var createDownPanel=()=>{
var bg=rect(1,th.downH,'#FFFFFF')

th.downPanelSpr.bgSpr=bg
th.downPanelSpr.addChild(bg,th.inpSpr)

th.inpSpr.y=10
var tiScale=createInput('масштаб',30,100,'scale')
var tiW=createInput('ширина',30,map.w,'w')
var tiH=createInput('высота',30,map.h,'h')

var picker1=createColorPicker('стены',colors[0],0)
var picker2=createColorPicker('путь',colors[1],1)

var genButton=text('другой',{color:0x0000FF})
genButton.buttonMode=true
genButton.y=3
genButton.on('click',()=>{
redraw()
})

var saveButton=text('сохранить',{color:0x00CC00})
saveButton.buttonMode=true
saveButton.y=3
saveButton.on('click',()=>{
saveMaze()
})

th.inpSpr.addChild(tiScale,tiW,tiH,picker1,picker2,genButton,saveButton)
hgroup(th.inpSpr,14)
}

createDownPanel()

stage.on('resize',()=>{th.autoResize()})

redraw()
//stage.on('click',()=>{redraw()})

th.autoResize()

var lastPos={x:0,y:0}
var lastSizeImg={w:0,h:0}
var cbMove=(e)=>{
var pos=mousePos(th.cntSpr,e)

var xx=(pos.x+th.cntSpr.x)-lastPos.x
var yy=(pos.y+th.cntSpr.y)-lastPos.y

if(lastSizeImg.w>th.stageSize.w){
if(-xx<0)xx=0
if(-xx>lastSizeImg.w-th.stageSize.w)xx=-(lastSizeImg.w-th.stageSize.w)
th.cntSpr.x=xx
}

if(lastSizeImg.h>th.stageSize.h){
if(-yy<0)yy=0
if(-yy>lastSizeImg.h-th.stageSize.h){
yy=-(lastSizeImg.h-th.stageSize.h)
}
th.cntSpr.y=yy
}
}

var cbUP=()=>{
th.stage.off('mousemove',cbMove)
th.stage.off('mouseup',cbUP)
}

th.bm.on('mousedown',(e)=>{
var pos=mousePos(th.cntSpr,e)
var imgW=th.cntSpr.width
var imgH=th.cntSpr.height
lastSizeImg.w=imgW
lastSizeImg.h=imgH
var isMove=false
if(imgW>th.stageSize.w)isMove=true
if(imgH>th.stageSize.h)isMove=true
if(isMove){
lastPos=pos
th.stage.on('mousemove',cbMove)
th.stage.on('mouseup',cbUP)
}
})

}

autoResize(){
var th=this
var w=th.stage.stageWidth
var h=th.stage.stageHeight
th.stageSize.w=w
th.stageSize.h=h-th.downH
th.cnv.width=w
th.cnv.height=h
th.cntSpr.x=(w-(th.bm.width*th.bm.scaleX))/2
th.cntSpr.y=(h-(th.bm.height*th.bm.scaleY))/2
if(th.cntSpr.x<0)th.cntSpr.x=0
if(th.cntSpr.y<0)th.cntSpr.y=0
th.bg.scaleX=w/th.bg.width
th.bg.scaleY=h/th.bg.height
th.inpSpr.x=(w-th.inpSpr.width)/2
th.downPanelSpr.bgSpr.painter.clear()

var downBG=th.downPanelSpr.bgSpr
downBG.painter.rect(0,0,w,th.downH,downBG.painter.fillV)
downBG.painter.rect(0,0,w,2,'#000000')
th.downPanelSpr.y=h-th.downH
}

}