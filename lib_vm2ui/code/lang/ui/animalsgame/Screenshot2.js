class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(bm,cbok){
var th=this
this.firstRsz=false
this.resizeCheck=true
this.ww=0
this.hh=0
this.cbok=cbok
this.bm=bm
this.ev=new lang.events.EventsObjectMaster
this.ev2=new lang.events.EventsObjectMaster
this.ev3=new lang.events.EventsObjectMaster
this.rectV=new lang.geom.Rectangle
var st=runtime.stage
runtime.curScreenshotScene=th
var spr=new lang.display.Sprite
spr.alpha=0.5
spr.createPainter()

this.ev.on(spr,'mousedown',(e)=>{
spr.startDrag()
th.ev3.on(st,'mouseup',(e)=>{
th.ev3.clear()
spr.stopDrag()
})
})
var mspr=new lang.display.Sprite
var helpSpr=new lang.display.Sprite
helpSpr.mouseEnabled=false
var txtSpr=new lang.display.Sprite
var uplFileSpr=new lang.display.Sprite
var helpW=480
var helpH=150
var isUplFile=false
var limitMB=5
if(System.platform.type=='pc')isUplFile=true

if(isUplFile)helpH+=50

addChild(mspr)

var arr=['Выделите область и нажмите "ENTER"','Если область не выбрана - полное окно','Для захвата всего экрана нажмите "TAB"','Если нужно выйти - нажмите "ESCAPE"']

if(bm){
    
var r1=new lang.display.Sprite
r1.alpha=0.8
r1.createPainter()
r1.painter.border(2,0xCCCCCC)
r1.painter.rect(0,0,helpW,helpH,'#000000')
helpSpr.addChild(r1,txtSpr)

helpSpr.x=(bm.naturalWidth-helpW)/2
helpSpr.y=100

var yy=8

var cbTxt=(txt,clr,fontSz)=>{
var tf=new lang.text.TextField
tf.fontName='Arial'
tf.bold=true
tf.fontSize=fontSz
tf.color=clr
//tf.filters=Config.filterBlue1
tf.text=txt
tf.x=(helpW-tf.width)/2
tf.y=yy
yy+=28
if(fontSz!=18)yy-=8
txtSpr.addChild(tf)
}

for (var i = 0; i < arr.length; i++) {
var txt=arr[i]
cbTxt(txt,0xFFFFFF,18)
}

var h3=helpH

if(isUplFile){
cbTxt('или выберите изображение с пк (не больше '+limitMB+' мб)',0x00FFFF,16)
cbTxt('или перенесите сюда изображение',0x00FFFF,16)
h3-=20
}

txtSpr.y=(h3-yy)/2
mspr.addChild(bm,spr,helpSpr,uplFileSpr)

if(isUplFile){

var rfile=(fi)=>{
if(fi){
var len=fi.length()
var sz3=1024*1024*limitMB
if(len<=sz3){
var bb=fi.readBytes()
if(bb){
var bm2=new lang.display.Bitmap
bm2.src=bb
var ww=bm2.naturalWidth
var hh=bm2.naturalHeight
if(ww>0 && hh>0){
bm2.blendMode='none'
var bmd=new lang.display.BitmapData(ww,hh,true,0)
bmd.draw(bm2)
bm2.blendMode='blend'
th.createScreenImg(bmd)
}else{
alert('Это не изображение.')
}
//var imgInfo=BitmapDecoder.read(bb,BitmapDecoder.PIXELS)

//var vv=BitmapDecoder.writeByteArray(ba,bmd,{width:imgW,height:imgH,quality:70,format:format})
/*var imgInfo=BitmapDecoder.read(bb,BitmapDecoder.PIXELS)
if(imgInfo && imgInfo.pixels){
var re=new lang.geom.Rectangle(0,0,imgInfo.width,imgInfo.height)
if(re.width>0 && re.height>0){
var bmd=new lang.display.BitmapData(re.width,re.height,true,0)
bmd.setPixels(imgInfo.pixels,re)
th.createScreenImg(bmd)
}
}*/
/*var bm2=new lang.display.Bitmap
bm2.src=bb
if(bm2.naturalWidth>0)th.createScreenImg(bm2)*/
}
}
}
}

var tf=new lang.text.TextField
tf.fontName='Arial'
tf.bold=true
tf.fontSize=18
tf.color=0xFFFF00
tf.text='выбрать файл'
tf.x=helpSpr.x+(helpW-tf.width)/2
tf.y=helpSpr.y+(helpH-(tf.height+8))
tf.buttonMode=true
tf.on('click',()=>{
System.openFileDialog((fi)=>{
if(fi)rfile(fi)
})
})
uplFileSpr.addChild(tf)

this.ev.on(th.stage,'drop',(e)=>{
var files=e.files
if(files && files.length>0)rfile(files[0])
})

}

/*var bmm=new lang.display.Bitmap
bmm.src=bm
addChild(bmm)*/
//alert(bm.naturalWidth)


var keyui=lang.ui.Keyboard
this.ev.on(st,'keyup',(e)=>{
if(e.keyCode==keyui.TAB){
if(st.displayState=='fullscreen'){
th.createScreen(true)
}else{
th.createFull()
}
}else if(e.keyCode==keyui.SPACE){
th.createScreen(true)
}else if(e.keyCode==keyui.ESCAPE){
th.removeScene()
}else if(e.keyCode==keyui.ENTER){
th.rectV.x=spr.x
th.rectV.y=spr.y
if(th.rectV.width>0 && th.rectV.height>0){
th.createScreen(false,th.rectV) 
}else{
th.createScreen(true)
//th.removeScene()
}
}
})

th.ev.on(bm,'mousedown',(e)=>{

var poss=th.getLocalMousePos(th,e.mouseX,e.mouseY)
var dragPos={}
var minVal=5

dragPos.x=poss.x
dragPos.y=poss.y

th.ev2.on(st,'mousemove',(e)=>{
var pos=th.getLocalMousePos(th,e.mouseX,e.mouseY)

var _x = Math.min(pos.x,dragPos.x)
var _y = Math.min(pos.y,dragPos.y)
var w = Math.abs(pos.x-dragPos.x)
var h = Math.abs(pos.y-dragPos.y)
w=Math.floor(w)
h=Math.floor(h)
_x=Math.floor(_x)
_y=Math.floor(_y)
if(w<minVal)w=minVal
if(h<minVal)h=minVal

if(helpSpr && helpSpr.parent){
helpSpr.parent.removeChild(helpSpr)
helpSpr=null
}

if(uplFileSpr && uplFileSpr.parent){
uplFileSpr.parent.removeChild(uplFileSpr)
uplFileSpr=null
}

/*if(helpSpr && helpSpr.parent){
helpSpr.parent.removeChild(helpSpr)
helpSpr=null
}*/

spr.painter.clear()
spr.painter.rect(0,0,w,h,'#000000')
spr.x=_x
spr.y=_y
th.rectV.x=_x
th.rectV.y=_y
th.rectV.width=w
th.rectV.height=h
})

th.ev2.on(st,'mouseup',()=>{th.ev2.clear()})
})

th.ev.on(st,'resize',(e)=>{
var sz=MainUI.getStageSize()
var w=sz.width
var h=sz.height
th.resize(w,h)
})

}

}

createScreenImg(bmd){
var th=this
th.removeScene()
var bm=new lang.display.Bitmap
bm.bmdData=bmd
bm.isGCV=true
bm.src=bmd
if(th.cbok)th.cbok(bm)
}

createFull(){
var th=this
th.removeScene()
var cb2=th.cbok

Timer.init(50,()=>{
this.stop()
var bmd=VM.callNative('getScreenDesktop')
if(bmd){

var bm=new lang.display.Bitmap
bm.bmdData=bmd
bm.src=bmd
if(th.cbok)th.cbok(bm)
}
})

}

createScreen(isFull,rect){
var allW=this.bm.naturalWidth
var allH=this.bm.naturalHeight
var origW=allW
var origH=allH
var bm2=this.bm
var bmd=null
if(rect){
allW=rect.width
allH=rect.height
}

var cb2=this.cbok

this.removeScene()

if(rect){
if(rect.x<0){
allW=rect.width+rect.x
rect.x=0
}
if(rect.y<0){
allH=rect.height+rect.y
rect.y=0
}
if(rect.x+rect.width>origW)allW=origW-rect.x
if(rect.y+rect.height>origH)allH=origH-rect.y
}

if(allW>0 && allH>0){

if(isFull==false){
if(rect){
this.bm.x=-rect.x
this.bm.y=-rect.y
bmd=new lang.display.BitmapData(allW,allH,true,0)
bmd.draw(this.bm)
this.bm.x=0
this.bm.y=0
bm2=new lang.display.Bitmap
bm2.src=bmd
bm2.imageSizeData={width:allW,height:allH}
}
}else{
bm2=this.bm
bmd=this.bm.bmdData
}

}
if(bm2){
bm2.bmdData=bmd
if(cb2!=null)cb2(bm2)
}
}

getLocalMousePos(disp,x,y){
var pos=disp.localToGlobal({x:0,y:0})
pos.x=x-pos.x
pos.y=y-pos.y
return pos
}

removeScene(){
var th=this
th.ev.clear()
th.ev2.clear()
th.ev3.clear()
runtime.curScreenshotScene=null
if(th.parent)th.parent.removeChild(th)
}

resize(w,h){
var th=this
var rsz=false
if(th.ww!=w)rsz=true
else if(th.hh!=h)rsz=true
/*if(th.firstRsz==false){
th.firstRsz=true
rsz=false
}*/
th.ww=w
th.hh=h
/*if(rsz && th.resizeCheck){
th.removeScene()
}*/
}

}