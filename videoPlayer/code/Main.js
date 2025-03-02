class Main extends lang.display.Sprite{

constructor(){
var th=this
th.vid=null
th.minWidth=550
th.minHeight=100
th.audioObj=null
th.moduleVideoName='videolib'
th.colorsLine=['#54DEF0','#03899C']
th.vidSpr=new lang.display.Sprite
th.isInitPlayer=false
th.isPanelOver=false
th.codecFlags=0

var screenshotBut=null
var infoSpr=null
var urlObj=th.loaderInfo.parameters
var stageSize={width:0,height:0}
var minSize={width:500,height:100}
var vid=null
var sc=null
var volumeSpr=null
var startPause=true
var lastDur=0
var lastTmDur=0
var setPause=null
//stage.framerate=60

th.vAssets=new VectorAssets(th)
th.vAssets.init()

var isSupportVideo=()=>{
if(lang.display.VideoSprite){
var qq=new lang.display.VideoSprite
if(qq.isSupport)return true
}
return false
}

/*var sc=th.createSeekSlider((v)=>{

})
sc.x=50
sc.y=50
sc.resize(600)
sc.setScrollPos(1)
addChild(sc)

return*/

var bgW=2
var bgH=2
var panelH=60

var mainSpr=new lang.display.Sprite

addChild(mainSpr)

var bmBGUp=null
var bmBGDown=null
var upPanelH=0
var upPanel=new lang.display.Sprite
var downPanel=new lang.display.Sprite
var downPanelItems=new lang.display.Sprite
var butCenterSpr=new lang.display.Sprite
butCenterSpr.y=-7

var bgMainSpr=new lang.display.Sprite
bgMainSpr.createPainter()
bgMainSpr.painter.rect(0,0,bgW,bgH,'#000000')

var bmdBG=new lang.display.BitmapData(bgW,bgH,true,0)
bmdBG.draw(bgMainSpr)

var bgMain=new lang.display.Bitmap
bgMain.src=bmdBG

mainSpr.addChild(bgMain,th.vidSpr)

var isSup=isSupportVideo()

var clearInfoSpr=()=>{
if(infoSpr && infoSpr.parent)infoSpr.parent.removeChild(infoSpr)
infoSpr=null
}

var updSize=()=>{
var w=th.stage.stageWidth
var h=th.stage.stageHeight
if(w<minSize.width)w=minSize.width
if(h<minSize.height)h=minSize.height
stageSize.width=w
stageSize.height=h
var pixelRatio=th.stage.devicePixelRatio
//var allW=700//w-50
//var allH=500//h-50
var allW=w//*pixelRatio
var allH=h//*pixelRatio

if(infoSpr){
var w4=infoSpr.width
if('fullWidth' in infoSpr)w4=infoSpr.fullWidth
infoSpr.x=(allW-w4)/2
infoSpr.y=(allH-infoSpr.height)/2
}

if(sc){
if(vid){
vid.width=allW
vid.height=allH
var fullW=vid.videoWidth
var fullH=vid.videoHeight
th.vidSpr.x=(w-fullW)/2
th.vidSpr.y=(h-fullH)/2
if(th.vidSpr.x<0)th.vidSpr.x=0
if(th.vidSpr.y<0)th.vidSpr.y=0
}
sc.resize(w-(sc.x*2))
}
bgMain.scaleX=w/bgW
bgMain.scaleY=h/bgH
if(bmBGUp)bmBGUp.scaleX=w/bmBGUp.naturalWidth
if(bmBGDown){
bmBGDown.scaleX=w/bmBGDown.naturalWidth
bmBGDown.y=panelH
}
if(volumeSpr)volumeSpr.x=w-(volumeSpr.width+20)
butCenterSpr.x=(w-butCenterSpr.width)/2
downPanel.y=h-panelH
}

var url=null
var title=''
//urlObj.url=new lang.io.File('videos/video1.mp4')
//urlObj.url=new lang.io.File('musicvk/Натали - Посвящение друзьям.mp3')
//urlObj.url='https://ag6.ru/video546437347843.mp4'
/*if(urlObj && urlObj.file){
url=urlObj.file
title=url.path
}else */
if(urlObj && urlObj.url){
var urlV=urlObj.url
if(urlV is lang.io.File){
url=urlV
title=urlV.name
startPause=false
}else{
var isHttp=false
if(urlV.indexOf('http:')==0)isHttp=true
if(urlV.indexOf('https:')==0)isHttp=true
if(isHttp){
url=urlV
title=urlV
}else{
var fi=new lang.io.File(urlV)
if(fi.isFile()){
url=fi
title=urlV
}
}
}
}

/*if(!url){
var fi2=null
fi2=new lang.io.File('videos/video1.mp4')
//fi2=new lang.io.File('musicvk/Натали - Посвящение друзьям.mp3')
//fi2='https://ag6.ru/video546437347843.mp4'
if(fi2)title=fi2.path
url=fi2
}*/

var allDur=0
var allDurStr=th.strDuration(0)
var isFirstCnt=true
var isAudioFile=th.isAudioURL(url)

if(!isSup){
if(isAudioFile)isSup=true
}

var loadContentCB=()=>{
clearInfoSpr()
if(isSup){
//var fi=new lang.io.File('videos/video1.mp4')
vid=new lang.display.VideoSprite
th.vid=vid

th.vid.on('load',()=>{
th.codecFlags=this.codecFlags
allDur=this.duration
allDurStr=th.strDuration(allDur)
lastTmDur=-1
if(screenshotBut)screenshotBut.visible=true
updSize()
})

th.vid.on('error',()=>{
//alert('err',vid.src)
})

if(th.vid)th.vidSpr.addChild(th.vid)

if(url){
th.isInitPlayer=true
//url=new lang.io.File('videos/a.mp4')
if(isAudioFile){
System.setWindowSize(th.minWidth,th.minHeight)
th.codecFlags=1<<1
th.audioObj=new lang.media.Sound
th.audioObj.src=url
}else{
if(th.vid)th.vid.src=url
}
if(setPause)setPause(startPause)
}

var sup2=isSupportVideo()
if(sup2){
th.checkVersionVideoModule((tt,ob)=>{
if(tt=='update'){
var w4=250
var h4=40
var sp2=new lang.display.Sprite
var rr=new lang.display.Sprite
rr.createPainter()
rr.painter.border(1,0xCCCCCC)
rr.painter.rect(0,0,w4,h4,'#000000')
var tf1=th.text('Обновление модуля 0%')
tf1.x=(w4-tf1.width)/2
tf1.y=12
sp2.addChild(rr,tf1)
mainSpr.addChild(sp2)

var rmvSpr1=()=>{
if(sp2 && sp2.parent)sp2.parent.removeChild(sp2)
}

if(isFirstCnt){

th.dlVideoModule((obj,path)=>{
var ob3={name:th.moduleVideoName,time:obj.time}
var res2=System.exec('moduleInstall',ob3,path)

var fi=new lang.io.File(path)
fi.delete()

tf1.text='Нужен перезапуск.'
tf1.color=0xFFFF00
tf1.x=(w4-tf1.width)/2

setTimeout(()=>{
rmvSpr1()
},2000)

},(status,ob)=>{
if(status=='load'){
if(ob){
var perc=Math.floor(ob.loaded/ob.total*100)
tf1.text='Обновление модуля '+perc+'%'
tf1.x=(w4-tf1.width)/2
}
}
},()=>{
rmvSpr1()
})

}

isFirstCnt=false

}

})

return true
}
}
return false
}


if(lang.display.VideoSprite){

//if(!isAudioFile)
//isSup=false

if(isSup){
loadContentCB()
}else{
infoSpr=th.createInstallSpr(()=>{
//isSup=true
isSup=isSupportVideo()
loadContentCB()
})
updSize()
th.vidSpr.addChild(infoSpr)
}
}else{
infoSpr=th.textList(['Модуль "Видео" не поддерживается.','Обновите игровой центр.'],{fontSize:20,align:'center'})
updSize()
th.vidSpr.addChild(infoSpr)
}

/*Timer.initOne(2000,()=>{
vid.src=fi
vid.pause=true
})*/

downPanelItems.y=20

var fsBut=th.vAssets.getBitmap('icons/fs')
screenshotBut=th.vAssets.getBitmap('icons/photo1')
var butSound=th.vAssets.getBitmap('icons/sound')
var butSoundMute=th.vAssets.getBitmap('icons/soundMute')
var lastVolume=100

var changeVolume=(val,noupd)=>{
if(val<0)val=0
if(val>100)val=100
if(!noupd){
if(sliderVolume)sliderVolume.setScrollPos(val/100)
}
butSound.visible=val>0
butSoundMute.visible=!butSound.visible
if(th.audioObj)th.audioObj.volume=val
if(th.vid)th.vid.volume=val
}

fsBut.buttonMode=true
fsBut.on('click',()=>{
th.appFullscreen()
})

screenshotBut.visible=false
screenshotBut.buttonMode=true
screenshotBut.on('click',()=>{
th.videoScreenshot()
})

var volumeSpr=new lang.display.Sprite

sliderVolume=th.createSeekSlider((v)=>{
var vv=Math.floor(v*100)
changeVolume(vv,true)
if(th.vid)lastVolume=th.vid.volume
if(th.audioObj)lastVolume=th.audioObj.volume
})

sliderVolume.resize(80)
changeVolume(lastVolume)

var txtTitle=th.text(title,{color:0xFFFFFF,fontSize:16})
txtTitle.x=4
txtTitle.y=4

var txtTime=th.text('',{fontSize:14})
txtTime.x=10
txtTime.y=5

var butPlaySpr=new lang.display.Sprite

var butPlay=th.vAssets.getBitmap('icons/play')
var butPause=th.vAssets.getBitmap('icons/pause')

setPause=(v)=>{
if(th.isInitPlayer){
if(th.vid)th.vid.pause=v
if(th.audioObj){
th.audioObj.pause=v
if(v){
th.audioObj.currentTimeV=th.audioObj.currentTime
th.audioObj.stop()
}else{
var lastCur=('currentTimeV' in th.audioObj) ? th.audioObj.currentTimeV : th.audioObj.currentTime
th.audioObj.play()
th.audioObj.currentTime=lastCur
}
}
}else{
v=true
}
butPlay.visible=v
butPause.visible=!v
}

butPlay.buttonMode=true
butPlay.on('click',()=>{setPause(false)})

butPause.buttonMode=true
butPause.on('click',()=>{setPause(true)})

setPause(startPause)

butPlaySpr.addChild(butPlay,butPause)

downPanelItems.addChild(txtTime,volumeSpr,butCenterSpr)
butCenterSpr.addChild(butPlaySpr)
sliderVolume.x=35
sliderVolume.y=7

butSound.on('click',()=>{
if(th.isInitPlayer){
changeVolume(0)
}
})

butSoundMute.on('click',()=>{
if(th.isInitPlayer){
if(lastVolume==0)lastVolume=100
changeVolume(lastVolume)
}
})
volumeSpr.addChild(butSound,butSoundMute,sliderVolume)
screenshotBut.x=volumeSpr.width
fsBut.x=screenshotBut.x+screenshotBut.width+10
volumeSpr.addChild(screenshotBut,fsBut)

sc=th.createSeekSlider((v)=>{
var dur=0
var isPauseV=false
if(th.vid){
isPauseV=th.vid.pause
dur=th.vid.duration
}
if(th.audioObj){
isPauseV=th.audioObj.pause
dur=th.audioObj.duration
}

if(dur>0){
var timePos=dur*v
//txtTime.text=''+timePos
if(th.vid)th.vid.currentTime=timePos
if(th.audioObj)th.audioObj.currentTime=timePos
if(isPauseV)setPause(false)
}
})
sc.x=10

var grad=new lang.display.Sprite
grad.createPainter()
var grdW=20
var grdH=20
var grd=th.createLinearGrd(['#000000A0','#CCCCCC08'],[0.1,0.99],grdW,grdH,90)
grad.painter.rect(0,0,grdW,grdH,grd)

var bmd=new lang.display.BitmapData(grdW,grdH,true,0)
bmd.draw(grad)

var bmBGUp=new lang.display.Bitmap
bmBGUp.src=bmd
bmBGUp.scaleY=panelH/bmBGUp.naturalHeight

var grd=th.createLinearGrd(['#000000A0','#CCCCCC08'],[0.2,0.99],grdW,grdH,90)
grad.painter.clear()
grad.painter.rect(0,0,grdW,grdH,grd)

var bmd=new lang.display.BitmapData(grdW,grdH,true,0)
bmd.draw(grad)

var bmBGDown=new lang.display.Bitmap
bmBGDown.src=bmd
bmBGDown.scaleY=-(panelH/bmBGDown.naturalHeight)

upPanel.addChild(bmBGUp,txtTitle)
downPanel.addChild(bmBGDown,sc,downPanelItems)

mainSpr.addChild(upPanel,downPanel)

upPanelH=upPanel.height

var tmPanel=null

var panelVis=(v)=>{
/*var alp=(v) ? 1 : 0
upPanel.alpha=alp
downPanel.alpha=alp*/
upPanel.visible=v
downPanel.visible=v
th.isPanelOver=v

if(v){
if(!tmPanel && th.isInitPlayer){
tmPanel=Timer.init(3000,()=>{
var isAudioV=th.isAudioOne()
if(th.vid && th.vid.pause)isAudioV=true
if(!isAudioV){
if(!th.isPanelOver){
this.stop()
panelVis(false)
tmPanel=null
}
}
})
}
}else{
if(tmPanel){
tmPanel.stop()
tmPanel=null
}
}

}

panelVis(true)

stage.on('mousemove',(e)=>{
var pos=th.toLocal({x:e.mouseX,y:e.mouseY})
//var ratio=th.stage.devicePixelRatio
//pos.x=pos.x/ratio
//pos.y=pos.y/ratio
if(pos.y>=(downPanel.y-10) || pos.y<=upPanelH){
if(!th.isPanelOver){
panelVis(true)
}
}else{
th.isPanelOver=false
}
})

var fpsM=new lang.utils.FpsMaster
fpsM.framerate=th.stage.framerate
fpsM.setCallback(()=>{
var plObj=th.vid
if(th.audioObj)plObj=th.audioObj
var dur=0
var curTime=0
if(plObj){
dur=plObj.duration as int
curTime=plObj.currentTime
if(plObj.pause){
curTime=('currentTimeV' in plObj) ? plObj.currentTimeV : plObj.currentTime
}
}

var tmV=curTime as int

if(tmV!=lastTmDur){
lastTmDur=tmV
var s3=th.strDuration(tmV)
txtTime.text=''+s3+' / '+allDurStr
}

if(dur>0){
if(allDur==0){
allDur=dur
allDurStr=th.strDuration(allDur)
lastTmDur=-1
}

if(curTime!=lastDur){
lastDur=curTime
if(curTime>=dur){
curTime=0
plObj.currentTime=curTime
setPause(true)
}
//bm2.scaleX=((curTime/dur)*stageSize.width)/bm2.naturalWidth
sc.setScrollPos(curTime/dur)
}
}
})
fpsM.run()

/*var sp=5
stage.on('keyup',(e)=>{
if(e.keyCode==lang.ui.Keyboard.SPACE){
vid.pause=!vid.pause
}else if(e.keyCode==lang.ui.Keyboard.LEFT){
vid.currentTime-=sp
}else if(e.keyCode==lang.ui.Keyboard.RIGHT){
vid.currentTime+=sp
}else if(e.keyCode==lang.ui.Keyboard.UP){
vid.currentTime+=60
}else if(e.keyCode==lang.ui.Keyboard.DOWN){
vid.currentTime-=60
}
})*/
//}
//}
stage.on('resize',updSize)
updSize()
}

/*getTimeInfo(time){
var _seconds=time;
//var _days=Math.floor(_seconds / (60*60*24));
//_seconds-=_days*(60*60*24);
var _hours=Math.floor(_seconds / (60*60));
_seconds-=_hours*(60*60);
var _minuts=Math.floor(_seconds / 60);
_seconds-=_minuts*60;
return {hours:_hours,minuts:_minuts,seconds:_seconds};
}*/

isAudioURL(v){
var nm=null
if(v){
if(v is lang.io.File)nm=v.name
}

if(nm){
var spl=nm.split('.')
if(spl && spl.length>0){
var ext=spl.pop()
if(ext)ext=ext.toLowerCase()
if(ext=='mp3')return true
}
}
return false
}

strDuration(time){
var seconds=time
//var _days=Math.floor(_seconds / (60*60*24));
//_seconds-=_days*(60*60*24);
var hours=Math.floor(seconds / (60*60))
seconds-=hours*(60*60)
var minuts=Math.floor(seconds / 60)
seconds-=minuts*60
/*var info=getTimeInfo(time);
var hours=info.hours
var minuts=info.minuts
var seconds=info.seconds*/
var hstr = ''+hours
if (hours < 10) hstr = "0" + hstr
var mstr = ''+minuts;
if (minuts < 10) mstr = "0" + mstr
var sstr = ''+seconds
if (seconds < 10) sstr = "0" + sstr
var ss=''+mstr+':'+sstr
if(hours>0)ss=hours+':'+ss
return ss
}

appFullscreen(){
var th=this
th.stage.displayState=(th.stage.displayState=='normal') ? 'fullscreen' : 'normal'
}

videoScreenshot(){
var th=this
if(th.vid){
var w=th.vid.videoWidth
var h=th.vid.videoHeight
if(w>0 && h>0){
//var lastX=th.vid.x
//var lastY=th.vid.y
var bmd=new lang.display.BitmapData(w,h,true,0)
//th.vid.x=0
//th.vid.y=0
bmd.resolution=1/th.stage.devicePixelRatio
bmd.draw(th.vid)
//th.vid.x=lastX
//th.vid.y=lastY

var bm=new lang.display.Bitmap
bm.bmdData=bmd
bm.src=bmd
MainUI.open('openScreenshot',[bm])

}
}
}

createSeekSlider(cb){
var th=this
var h=1
var sp=new lang.display.Sprite
var scrollW=16
var scrollH=8

var bg1=new lang.display.Sprite
bg1.createPainter()
bg1.alpha=0.5

var sz2=scrollW/2
var colors=th.colorsLine

var bg2=new lang.display.Sprite
bg2.createPainter()
var grd2=th.createLinearGrd(colors,[0.1,0.99],scrollW,scrollW,90)
bg2.painter.border(1,0)
bg2.painter.circle(0,0,sz2,grd2)
var seekWW=1
var seekPanelH=6

var seekSpr=new lang.display.Sprite
var grd2=th.createLinearGrd(colors,[0.1,0.99],seekWW,seekPanelH,90)

var seekLine=new lang.display.Sprite
seekLine.createPainter()
seekLine.painter.rect(0,0,seekWW,seekPanelH,grd2)

var bmd=new lang.display.BitmapData(seekWW,seekPanelH,true,0)
bmd.draw(seekLine)

var bm2=new lang.display.Bitmap
bm2.src=bmd
bm2.mouseEnabled=false
bm2.x=2
bm2.y=2
bg2.y=5

seekSpr.addChild(bm2,bg2)

var resizeCB=(w)=>{
h=w
bg1.painter.clear()
bg1.painter.border(2,0xCCCCCC)
bg1.painter.rect(0,0,w,seekPanelH+4,'#000000')
}

resizeCB(h,scrollW)

bg2.buttonMode=true
var lastV=0
var startY=0
var ev=new lang.events.EventsObjectMaster

var cbPos=(k)=>{
if(k<0)k=0
if(k>1)k=1
bg2.x=k*(h-(sz2-2))
bm2.scaleX=(k*(h-(bm2.x*2)))/seekWW
}

var cbMove=(e)=>{
var pos2=bg1.toLocal({x:e.mouseX,y:e.mouseY})
var yy=pos2.x
var kk=(yy-startY)/(h-sz2)
if(kk<0)kk=0
if(kk>1)kk=1
cbPos(kk)
if(kk!=lastV){
if(cb)cb(kk)
lastV=kk
}
}

bg1.on('rollover',()=>{
th.isPanelOver=true
})

bg2.on('rollover',()=>{
th.isPanelOver=true
})

bg1.on('mousedown',(e)=>{
//startY=scrollH/2
if(th.isInitPlayer){
lastV=-1
cbMove(e)
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
th.isPanelOver=true
}
})

bg2.on('mousedown',(e)=>{
if(th.isInitPlayer){
var pos=bg1.toLocal({x:e.mouseX,y:e.mouseY})
startY=pos.x-this.x
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
th.isPanelOver=true
}
})

sp.addChild(bg1,seekSpr)

sp.setScrollPos=cbPos
sp.resize=resizeCB

return sp
}

createLinearGrd(colors,ratios,w,h,rot){
if(rot<0)rot=0
var angle=rot/180*Math.PI
var cos=Math.cos(angle)
var sin=Math.sin(angle)
var grd=lang.display.Painter.createLinearGradient(0,0,cos*w,sin*h,colors,ratios)
return grd
}

createInstallSpr(cb){
var th=this
var spr=new lang.display.Sprite
var sp=th.textList(['Модуль "Видео" ещё не установлен.'],{fontSize:20,align:'center'})

var butW=180
var butH=40

var butSpr=new lang.display.Sprite

var but=new lang.display.Sprite
but.buttonMode=true
but.createPainter()

var butTxt=th.text('Установить',{fontSize:22})
butTxt.x=(butW-butTxt.width)/2
butTxt.y=(butH-butTxt.height)/2
butTxt.mouseEnabled=false

var grd=th.createLinearGrd(th.colorsLine,[0.1,0.99],butW,butH,90)
but.painter.border(1,0xEEEEEE)
but.painter.rect(0,0,butW,butH,grd)

butSpr.x=(sp.width-butW)/2
butSpr.y=sp.height+5

var updTxtCenter=(txt,o)=>{
o.text=txt
o.x=(sp.width-o.width)/2
}

var installInfo=()=>{

var sp2=new lang.display.Sprite

var butTxt2=th.text('',{fontSize:22,color:0x00FFFF})
updTxtCenter('Соединение с сервером...',butTxt2)
sp2.addChild(butTxt2)

//sp2.x=(sp.width-sp2.width)/2
sp2.y=sp.height+5

spr.fullWidth=spr.width
spr.addChild(sp2)


th.dlVideoModule((obj,path)=>{

updTxtCenter('Идёт установка...',butTxt2)

setTimeout(()=>{
var ob3={name:th.moduleVideoName,time:obj.time}
var res2=System.exec('moduleInstall',ob3,path)
if(res2=='ok'){
updTxtCenter('Запуск модуля...',butTxt2)
setTimeout(cb,500)
}else if(res2=='wait'){
alert('Для обновления модуля нужен перезапуск игрового центра.')
System.exit()
}else{
updTxtCenter('Не удалось установить модуль.',butTxt2)
}

var fi=new lang.io.File(path)
fi.delete()

},500)

},(status,ob)=>{
if(status=='ready'){
updTxtCenter('Загрузка модуля 0%',butTxt2)
}else if(status=='load'){
if(ob){
var loadedV=Math.floor(ob.loaded/1024)
var totalV=Math.floor(ob.total/1024)
var perc=Math.floor(ob.loaded/ob.total*100)
updTxtCenter('Загрузка модуля ('+loadedV+' кб из '+totalV+' кб) '+perc+'%',butTxt2)
}
}
},()=>{
updTxtCenter('Не удалось загрузить модуль.',butTxt2)
})

/*var allBytes=10000
var loadedBytes=0

var plusPerc=()=>{
loadedBytes+=100
var perc=Math.floor(loadedBytes/allBytes*100)
updTxtCenter('Загрузка модуля ('+loadedBytes+' кб из '+allBytes+' кб) '+perc+'%',butTxt2)
perc+=1
}

setTimeout(()=>{
updTxtCenter('Загрузка модуля 0%',butTxt2)
butTxt2.color=0xFFFF00

var tm1=setInterval(()=>{
if(loadedBytes<allBytes){
plusPerc()
}else{
clearInterval(tm1)
//updTxtCenter('Загрузка завершена!',butTxt2)
//butTxt2.color=0x55FF4D
updTxtCenter('Идёт установка...',butTxt2)
setTimeout(()=>{
    
var ob3={name:'videolib',time:2}
var isInstallV=System.exec('checkModuleInstall',ob3)

if(!isInstallV){
var res2=System.exec('moduleInstall',ob3,'videolib.zip')
if(res2=='ok'){
updTxtCenter('Запуск модуля...',butTxt2)
//butTxt2.color=0x55FF4D

setTimeout(cb,500)

}else if(res2=='wait'){
alert('Для обновления модуля нужен перезапуск игрового центра.')
System.exit()
}else{
updTxtCenter('Не удалось установить модуль.',butTxt2)
}
}

},500)
}
},10)

},200)*/


}

but.on('click',()=>{
butSpr.visible=false
installInfo()
})

but.on('rollover',()=>{butSpr.alpha=0.8})
but.on('rollout',()=>{butSpr.alpha=1})

butSpr.addChild(but,butTxt)

spr.addChild(sp,butSpr)
return spr
}

checkCodecType(v){
var th=this
var vv=th.codecFlags
if(vv>0){
if(v=='audio'){
if((vv & 1<<1)>0)return true
}else if(v=='video'){
if((vv & 1<<2)>0)return true
}
}
return false
}

isAudioOne(){
var th=this
var a1=th.checkCodecType('audio')
var a2=th.checkCodecType('video')
if(a1 && !a2)return true
return false
}

vm2API(cmd,props,cbok,cberr){
var url='https://ag6.ru/VM2Api.php'
if(!props)props={}
props.c=cmd
URL.post(url,props,(o)=>{
if(o && o.data)o=o.data
if(cbok)cbok(o)
},()=>{
if(cberr)cberr()
})
}

checkVersionVideoModule(cb){
var th=this
th.vm2API('vm2.getLibDLLInfo',{name:th.moduleVideoName},(dt)=>{
var tm=0
if('time' in dt)tm=dt.time as int
var ob3={name:th.moduleVideoName,time:tm}
var res=System.exec('checkModuleInstall',ob3)
var st='no'
if(!res)st='update'
cb(st,dt)
},()=>{
cb('no')
})
}

dlVideoModule(cbok,updcb,cberr){
var th=this
th.vm2API('vm2.getLibDLLInfo',{name:th.moduleVideoName},(dt)=>{
if(dt){
if(updcb)updcb('ready')
var urlModule=dt.url
var savePath=dt.name+'_upd.zip'
URL.binaryGet(urlModule,(ba)=>{
if(ba && ba.length>0){
var fi=new lang.io.File(savePath)
fi.write(ba)
if(cbok)cbok(dt,savePath)
}
},()=>{
if(cberr)cberr()
},(e)=>{
if(updcb)updcb('load',e)
})

}else{
if(cberr)cberr()
}
},()=>{
if(cberr)cberr()
})
}


textList(arr,props){
var th=this
var spr=new lang.display.Sprite
var maxW=0
var yy=0
if(arr){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
var txt=th.text(el,props)
var ww=txt.width
if(maxW<ww)maxW=ww
txt.y=yy
yy=yy+txt.height
spr.addChild(txt)
}

if(props && props.align=='center'){
for (var i = 0; i < spr.numChildren; i++) {
var d=spr.getChildAt(i)
d.x=(maxW-d.width)/2
}
}

}
return spr
}

text(v,props){
var th=this
var defFontSize=16
var defColor=0xFFFFFF
var tx=new lang.text.TextField

if(props){
if('color' in props)defColor=props.color
if('fontSize' in props)defFontSize=props.fontSize
}

tx.color=defColor
tx.fontSize=defFontSize
tx.bold=true
if(v)tx.text=v
return tx
}

}