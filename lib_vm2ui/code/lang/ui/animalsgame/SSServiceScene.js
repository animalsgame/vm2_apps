class SSServiceMain extends lang.display.Sprite{

constructor(){
var th=this
th.scaleFactor=1
th.resizeCB=null
th.lastW=0
th.lastH=0

this.assetsObjURL={}
//this.domainUrl='animals-game.ru'
this.domainUrl='ag6.ru'
this.mainEvents=new lang.events.EventsObjectMaster
this.scenesMaster=th.ScenesMaster()

this.cnv=new lang.display.Sprite
addChild(this.cnv)

var headerSpr=th.mainHeader()
this.header=headerSpr
this.tt=''
this.bg=th.rect(1,1,'#EEEEEE')

this.cnt=new lang.display.Sprite
this.cnt.y=this.header.headerH

this.spr=new lang.display.Sprite
this.cnv.addChild(this.spr)

this.cnt.addChild(this.scenesMaster)

this.spr.addChild(this.bg,this.cnt,this.header)
th.rsz(th)
this.mainEvents.on(stage,'resize',()=>{th.rsz(th)})
}

ScenesMaster(){
var th=this
var spr=new lang.display.Sprite
spr.curScene=null

spr.clear=()=>{
while(spr.numChildren>0){
var el=spr.getChildAt(0)
el.parent.removeChild(el)
if('removeScene' in el)el.removeScene()
}
spr.curScene=null
}

spr.navSSServiceScene=(id,t)=>{
clear()
var c=new lang.ui.animalsgame.SSServiceScene(th)
spr.curScene=c
spr.addChild(c)
c.loadScreenID(id,t)
}

spr.resize=(w,h)=>{
for (var i = 0; i < spr.numChildren; i++) {
var el=spr.getChildAt(i)
el.stageW=w
el.stageH=h
if('resize' in el)el.resize(w,h)
}
}

return spr
}

mainHeader(){
var th=this
var spr=new lang.display.Sprite

spr.bg=th.rect(1,1,'#3083A7')
spr.footerSpr=new lang.display.Sprite
spr.headerH=50
spr.footerH=25

var bm=new lang.display.Bitmap
bm.src='https://'+th.domainUrl+'/images/logo-vm2.png'
bm.x=9
bm.y=2

var bg2=th.rect(1,1,'#455a64')
var txt2=th.text('Игровой центр',{color:0xFFFFFF,fontSize:16,bold:true})
txt2.y=4
spr.footerSpr.addChild(bg2,txt2)

spr.addChild(spr.bg,bm,spr.footerSpr)

spr.resize=(w,h)=>{
this.bg.resize(w,this.headerH)
this.footerSpr.y=h-this.footerH
txt2.x=(w-txt2.width)/2
bg2.resize(w,this.footerH)
}

return spr
}

screenLeftPanel(){
var th=this
var spr=new lang.display.Sprite
spr.cnt=new lang.display.Sprite
spr.bg=th.rect(1,1,'#FFFFFF')
spr.w=150
spr.h=0

spr.addChild(spr.bg,spr.cnt)

spr.resize=(w,h)=>{
spr.h=h
spr.bg.resize(spr.w,spr.h)
}
return spr
}

PreloaderScene1(){
var th=this
var spr=new lang.display.Sprite
spr.cnt=new lang.display.Sprite
spr.addChild(spr.cnt)

spr.tf=th.text('',{color:0x3083A7,fontSize:18})
spr.cnt.addChild(spr.tf)

spr.hideAnim=()=>{}

spr.setText=(s)=>{
spr.tf.text=s
spr.tf.x=(64-spr.tf.width)/2
}

spr.resize=(w,h)=>{
spr.cnt.x=(w-64)/2
spr.cnt.y=(h-94)/2
spr.tf.x=(64-spr.tf.width)/2
spr.tf.y=40
}
return spr
}

button1(w,h,name,cb){
var th=this
var spr=new lang.display.Sprite
var r2=th.rect(w,h,'#000000')
r2.alpha=0
r2.buttonMode=true
var clr1='#F0F0F0'
var r=th.rect(w,h,clr1,{border:1,color:0xCCCCCC})
var txt=th.text(name,{color:0,fontSize:16})
txt.mouseEnabled=false
txt.x=(w-txt.width)/2
txt.y=(h-txt.height)/2
spr.addChild(r,txt,r2)
r2.on('rollover',()=>{
r.fillValue='#E0E6ED'
r.resize(w,h)
})
r2.on('rollout',()=>{
r.fillValue=clr1
r.resize(w,h)
})
if(cb){
r2.on('click',cb)
}
return spr
}

mainApi(m,params,cb){
var th=this
params.c=m
URL.post('https://'+th.domainUrl+'/mainApi.php',params,(ob)=>{
if('data' in ob){
cb(ob.data)
}
},()=>{
//cb(null)
})
}

text(txt,styles,cont){
var textDefStyles={fontSize:16,fontName:'Arial',color:0xFFFFFF}
var tf=new lang.text.TextField
var color=textDefStyles.color
var fontSize=textDefStyles.fontSize
var fontName=textDefStyles.fontName
var maxW=0
if(styles){
if('fontName' in styles)fontName=styles.fontName
if('fontSize' in styles)fontSize=styles.fontSize
if('color' in styles)color=styles.color
if('bold' in styles)tf.bold=styles.bold
if('maxWidth' in styles){
maxW=styles.maxWidth
tf.maxWidth=maxW
}
}
tf.fontName=fontName
tf.color=color
tf.fontSize=fontSize
tf.text=''+txt
//tf.dragItem=true

if(styles){
if('align' in styles){
if(styles.align=='center'){
if(maxW>0){
tf.align='center'
}else if('w' in styles){
if(styles.w>0){
tf.x=(styles.w-tf.width)/2
}
}
}
}
}

if(cont)cont.addChild(tf)
return tf
}

rsz(o){
if(o){
var stageSize=MainUI.getStageSize()
var w=stageSize.width
var h=stageSize.height
if('resize' in o){
if(o.resize is Function){
o.resize(w,h)
}
}
}
}

rect(w,h,fill,props){

var resizeRect=(w,h)=>{
var o=this
o.painter.clear()
if(w>0 && h>0){
if('propsObj' in o){
var pr=o.propsObj
if('border' in pr){
o.painter.border(pr.border,pr.color)
}
}
o.painter.rect(0,0,w,h,o.fillValue)
}
}
    
var o=new lang.display.Sprite
if(fill!=null){
if(fill is Function)fill=fill()
}
o.fillValue=fill
o.resize=resizeRect
o.createPainter()
if(props){
o.propsObj=props
}
o.resize(w,h)
return o
}

remove(){
var th=this
th.resizeCB=null
th.scenesMaster.clear()
//if('curScreenshotScene' in th && th.curScreenshotScene)th.curScreenshotScene.remove()
//th.curScreenshotScene=null
if('mainEvents' in th && th.mainEvents)th.mainEvents.clear()
if(th.parent)th.parent.removeChild(th)
}

resize(w,h){
var th=this
var isRsz=false
if(w!=th.lastW)isRsz=true
if(h!=th.lastH)isRsz=true
th.lastW=w
th.lastH=h

if(isRsz){
if(th.resizeCB)th.resizeCB(w,h)
}
th.header.resize(w,h)
th.bg.resize(w,h)
th.scenesMaster.resize(w-th.cnt.x,h-th.cnt.y-th.header.footerH)
//if('curScreenshotScene' in th && th.curScreenshotScene)th.curScreenshotScene.resize(w,h)
}

}

class %CURRENT_CLASSNAME% extends lang.display.Sprite{
%CURRENT_CLASSNAME%(m){
var th=this
if(m){
th.text=m.text
th.rsz=m.rsz
th.rect=m.rect
}
this.mainApp=m
this.isRmv=false
this.o=null
this.mcnt=new lang.display.Sprite
this.cnt=new lang.display.Sprite
this.ev=new lang.events.EventsObjectMaster
this.w=1
this.h=1
this.countSpr=null
this.zoomV=false
this.scaleFactor=1
this.bm=new lang.display.Bitmap
this.isLoadScreen=false
this.cnt.addChild(this.bm)
this.buttonsSpr=new lang.display.Sprite
this.pr=th.mainApp.PreloaderScene1()
this.leftPanel=th.mainApp.screenLeftPanel()
this.mcnt.x=this.leftPanel.w
this.mcnt.addChild(this.pr,this.cnt)
addChild(this.mcnt,this.leftPanel)
this.prBar=null

this.txtService=th.text('сервис: ?',{color:0x0000FF,fontSize:16})
this.txtW=th.text('ширина: ?',{color:0,fontSize:16})
this.txtH=th.text('высота: ?',{color:0,fontSize:16})
this.txtSize=th.text('размер: ?',{color:0,fontSize:16})
this.txtImgType=th.text('формат: ?',{color:0,fontSize:16})
var yy=0
var cnt3=this.leftPanel.cnt
cnt3.x=2
cnt3.y=2

cnt3.addChild(this.txtService,this.txtW,this.txtH,this.txtSize,this.txtImgType,this.buttonsSpr)
for (var i = 0; i < cnt3.numChildren; i++) {
var el=cnt3.getChildAt(i)
if(el){
el.y=yy
yy=yy+el.height+5
}
}

var butExit=th.createButton('Закрыть',()=>{
th.mainApp.remove()
})

}

createButton(name,cb){
var th=this
var butW=th.leftPanel.w-(th.leftPanel.cnt.x*2)
var butH=35
var but=th.mainApp.button1(butW,butH,name,cb)
th.buttonsSpr.addChildAt(but,0)

var xx=0
for (var i = 0; i < th.buttonsSpr.numChildren; i++) {
var el=th.buttonsSpr.getChildAt(i)
var hh=el.height
el.y=xx
xx=xx+hh+2
}

}

parseObj(o){
var th=this
th.o=o

th.bm.visible=false

if(o!=null){
var serviceT='ag6'
var txt1=null
var nativeURL=null
if('service' in o)serviceT=o.service
if('nativeURL' in o){
var url2=o.nativeURL
if(url2!=null){
var pp=url2.indexOf('http')
if(pp==0)nativeURL=url2
}
}

if(nativeURL){
var but2=th.createButton('Открыть ссылку',()=>{
System.openURL(nativeURL)
})
}


if('allCount' in o)txt1='Загружено скриншотов: '+o.allCount
//if(serviceT=='joxi')txt1='Скриншот joxi'
//if(serviceT=='ss')serviceT='ag6'
this.txtService.text='сервис: '+serviceT
if(txt1!=null){
var tf=th.text(txt1,{color:0xFFFFFF,fontSize:16,bold:true})
tf.x=(th.stageW-tf.width)/2
tf.y=18
th.countSpr=tf
th.mainApp.header.addChild(tf)
}
    
if('url' in o){
var url=o.url

if(url){
var spl=url.split('.')
if(spl.size>0){
var t5='?'
var ext=spl.pop()
if(ext=='png')t5=ext
else if(ext=='jpg')t5=ext
this.txtImgType.text='формат: '+t5
}
}

this.bm.on('load',()=>{
th.isLoadScreen=true
if(th.pr && th.pr.parent)th.pr.parent.removeChild(th.pr)
th.pr=null
th.loadImageOK()
th.rsz(th.mainApp)
this.visible=true
})

URL.binaryGet(url,(ba)=>{
if(th.isRmv==false){
if(ba){
var sizeKB=ba.size/1024 as int
th.txtSize.text='размер: '+sizeKB+' кб'
}
th.bm.src=ba
}
},()=>{

},(e)=>{
if(th.pr){
var perc=e.loaded/e.total*100 as int
th.pr.setText('Загрузка скриншота '+perc+'%')
}
})

//this.bm.src=url

/*Timer.initOne(10000,()=>{
System.gc()
})*/
}

th.rsz(th.mainApp)
}else{
if(th.pr!=null)th.removeChild(th.pr)
th.pr=null
}
}

loadImageOK(){
var th=this

var yy=0
var isMove=false
var imgW=th.bm.naturalWidth
var imgH=th.bm.naturalHeight
this.txtW.text='ширина: '+imgW
this.txtH.text='высота:  '+imgH

if(imgW>0 && imgH>0){
var but2=th.createButton('Сохранить',()=>{
var bm2=new lang.display.Bitmap
var x1=th.bm.x
var y1=th.bm.y
var scV=th.bm.scaleX
th.bm.x=0
th.bm.y=0
var bmd=new lang.display.BitmapData(imgW*scV,imgH*scV,0,true)
bmd.draw(th.bm)
th.bm.x=x1
th.bm.y=y1
bm2.src=bmd
bm2.bmdData=bmd

MainUI.open('openScreenshot',[bm2])

})
}

th.bm.on('click',()=>{
if(isMove==false){
var isZoom=th.isZoomImg()
if(isZoom==true){
if(th.zoomV==false){
th.zoomV=true
th.resize(th.w,th.h)

}else{
th.zoomV=false
th.resize(th.w,th.h)
}
}
}
})

th.bm.on('mousedown',(ee)=>{
if(th.zoomV==true){
isMove=false
var nw=th.bm.naturalWidth
var nh=th.bm.naturalHeight
//th.bm.startDrag()
var posLast={x:0,y:0}
var pos1={x:0,y:0}
pos1.x=ee.mouseX-th.bm.x
pos1.y=ee.mouseY-th.bm.y
var _bounds={x:0,y:0}
_bounds.width=(nw*th.bm.scaleX)-th.w
_bounds.height=(nh*th.bm.scaleY)-th.h

th.ev.on(th.stage,'mousemove',(e)=>{
var xx=e.mouseX-pos1.x
var yy=e.mouseY-pos1.y

var b=_bounds
if(b!=null){
if(-xx<b.x)xx=-b.x
if(-yy<b.y)yy=-b.y
if(-xx>b.width)xx=-b.width
if(-yy>b.height)yy=-b.height
}

if(nw>th.w){
if(posLast.x!=xx){
th.bm.x=xx
posLast.x=xx
isMove=true
}
}

if(nh>th.h){
if(posLast.y!=yy){
th.bm.y=yy
posLast.y=yy
isMove=true
}
}
})

th.ev.on(th.stage,'mouseup',()=>{
th.ev.clear()
//th.bm.stopDrag()
})

}
})


}

loadScreenID(id,t){
var th=this
th.pr.setText('Поиск скриншота')
th.rsz(th.mainApp)
if(t==null)t=''
/*if(t=='joxi'){
th.pr.setText('Загрузка скриншота')
th.parseObj({url:'http://joxi.ru/'+id+'.png'})    
}else{*/
/*Timer.init(1000,()=>{
this.stop()*/
th.mainApp.mainApi('service.getScreenByID',{id:id,t:t},(ob)=>{
if(ob!=null){
th.pr.setText('Загрузка скриншота')
th.rsz(th.mainApp)
th.parseObj(ob)
}else{
if(th.pr!=null){
th.pr.hideAnim()
th.pr.setText('Скриншот не найден')
th.rsz(th.mainApp)
}
}
},null)
//})
//}
}

getAspectRatioSize(w,h,maxWidth,maxHeight){
var ratio = Math.min(maxWidth / w, maxHeight / h)
if(ratio>1.0)ratio=1
var o={width:0,height:0,ratio:ratio}
o.width=w*ratio
o.height=h*ratio
return o
}

isZoomImg(){
var th=this
var nw=th.bm.naturalWidth
var nh=th.bm.naturalHeight
if(nw>0 && nh>0){
if(nw>th.w)return true
if(nh>th.h)return true
}
return false
}

removeScene(){
this.isRmv=false
this.ev.clear()
}

resize(w,h){
var th=this
th.leftPanel.resize(w,h)
w=th.stageW-th.leftPanel.w
this.w=w
this.h=h
if(this.pr!=null)this.pr.resize(w,h)
if(th.countSpr!=null){
th.countSpr.x=(th.stageW-th.countSpr.width)/2
}

if(this.isLoadScreen){
var nw=this.bm.naturalWidth
var nh=this.bm.naturalHeight
var sz={}
sz.width=nw
sz.height=nh
th.bm.scaleX=1
th.bm.scaleY=1
th.bm.x=0
th.bm.y=0

var w1=nw
var h1=nh

if(w1<w)th.bm.x=(w-w1)/2
if(h1<h)th.bm.y=(h-h1)/2

th.scaleFactor=1
var isScale=false
if(nw>w)isScale=true
else if(nh>h)isScale=true
if(th.zoomV==true)isScale=false
if(isScale==true){
var sz=th.getAspectRatioSize(nw,nh,w,h)
th.scaleFactor=sz.ratio
th.bm.scaleX=th.scaleFactor
th.bm.scaleY=th.scaleFactor
}

if(th.zoomV==false){
var w1=nw*th.scaleFactor
var h1=nh*th.scaleFactor
if(w1<w)th.bm.x=(w-w1)/2
if(h1<h)th.bm.y=(h-h1)/2
}
}

}

}