class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
var th=this
/*var s1='Карта 6'
var r=/(карта |карта)([0-9]+)/gi
var a=r.exec(s1)
var s3='ТеСт'
alert('res',a,s3.toLowerCase())
return*/
if(System.platform.type!='web'){
th.isNes=false
th.appTitle='Игры с денди'
if('Nes' in lang.game)th.isNes=true

VM.setGlobal('$app',this)
System.setAppTitle(th.appTitle)
th.packageName='ru.vm2.nesapps'
th.domainV='https://ag6.ru'
th.pathURL='files1/nes'
th.fullPathApp='appsInstall/'+th.packageName
th.cfgSavePath=th.fullPathApp+'/cfg.json'
th.savedataPath=th.fullPathApp+'/savedata'
th.isSupSave=false
th.nesVolume=100
th.cfgObjData={}
th.tmSave=null
th.joyKeysOrig={}
th.curJoyKeys=null
th.curJoyKeysOrig=null
th.headerH=40
th.footerH=24
th.dispType=0
th.isFsEnable=false
//th.romsFolder=th.fullPathApp+'/roms'
th.curSaveSprInfo=null
th.savedataBin=null
th.vm2CacheBin=null

var urlObj=th.loaderInfo.parameters

this.assetsObjURL={}
var fileReader=new lang.utils.VM2FileReader
fileReader.readBytes(this.loaderInfo.bytes)
var assetsObj=fileReader.readAssetsFolder()
if(assetsObj!=null){
for(var n in assetsObj){
var spl1=n.split('.')
var nm4=spl1.pop()
var nmNoExt=spl1.join('.')
if(nm4=='mp3'){
var url=URL.createURL(assetsObj[n],'audio/mpeg')
this.soundsObjURL[nmNoExt]=url
}else{

var url=URL.createURL(assetsObj[n],'image/'+nm4)
this.assetsObjURL[nmNoExt]=url
}

}
}

th.popup=new PopUpMaster
th.scenesMaster=new ScenesMaster
//th.scenesMaster.y=th.headerH
var fi3=new lang.io.File(th.fullPathApp)
var ex1=fi3.isDirectory()
if(ex1==false)fi3.mkdir()

if('CacheBinary' in lang.utils){
th.vm2CacheBin=new lang.utils.CacheBinary(th.fullPathApp+'/data')
VM.setGlobal('cacheData',th.vm2CacheBin)
}

Roms.init()
th.popup.init()
th.bg=new lang.display.Sprite
th.bg.createPainter()
th.cnv=new lang.display.Canvas
addChild(th.cnv)
stage.framerate=60
var nes=null
if(th.isNes){
nes=new lang.game.Nes
nes.audioSync=1
}
else{
nes=new lang.display.Sprite
}
th.nes=nes
th.nesWidth=nes.width
th.nesHeight=nes.height

if(nes && nes.saveState){
var fi5=new lang.io.File(th.savedataPath)
var isDir=fi5.isDirectory()
if(!isDir)fi5.mkdir()
th.isSupSave=true
//th.savedataBin=new lang.utils.CacheBinary(th.fullPathApp+'/savedata')
}

th.cnv.addChild(th.bg,th.nes,th.scenesMaster,th.popup)
/*if(System.platform.type=='android'){
stage.framerate=30
nes.speed=2
}*/
//nes.speed=2
nes.volume=th.nesVolume

stage.on('resize',()=>{th.autoResize()})
th.autoResize()
//nes.volume=50

var keyui=lang.ui.Keyboard
var joyNesData={LEFT:nes.LEFT, RIGHT:nes.RIGHT ,UP:nes.UP, DOWN:nes.DOWN, A:nes.A, B:nes.B, START:nes.START, SELECT:nes.SELECT}

var keyObj={LEFT:keyui.LEFT, RIGHT:keyui.RIGHT, UP:keyui.UP, DOWN:keyui.DOWN, A:keyui.A, B:keyui.S, START:keyui.ENTER, SELECT:keyui.SPACE,SAVE:keyui.B,RESTORE:keyui.R}

for(var n in keyObj)th.joyKeysOrig[n]=keyObj[n]

th.loadCfg()

if(th.cfgObjData){
if(th.cfgObjData.joy)keyObj=th.cfgObjData.joy
if('dispType' in th.cfgObjData)th.dispType=th.cfgObjData.dispType as int
}

th.setKeysJoy(keyObj)

var curRoomEl=null
var ev1=new lang.events.EventsObjectMaster

var runRom=(el,ba3,isLoadFast)=>{
var lastCurRom=curRoomEl
if(th.isNes){
ev1.clear()
th.scenesMaster.clear()
curRoomEl=el
if(el){
//var p=$app.romsFolder+'/'+el.rom
var nm2=el.name
var isExt=false
var ba=null

if(ba3!=null){
ba=ba3
isExt=true
}else{
/*var fi=new lang.io.File(p)
isExt=fi.isFile()

var fi2=new lang.io.File($app.romsFolder)
var isExt3=fi2.isFile()
if(isExt3==false)fi2.mkdir()
if(isExt)ba=fi.readBytes()*/

if($app.vm2CacheBin){
ba=$app.vm2CacheBin.get(el.rom)
if(ba){
isExt=true
}
}

}
//isExt=false
if(isExt){
if(ba){
    
if(lastCurRom!=el || isLoadFast){
nes.loadBytes(ba)
}
    
nes.pause=false
var lastX=nes.x
nes.x=lastX+1
nes.x=lastX
if(nm2!=null){
System.setAppTitle(nm2)
}

ev1.on(th.stage,'keydown',(e)=>{
var kk=e.keyCode
if(kk in th.curJoyKeys){
var vv=th.curJoyKeys[kk]
if(vv in joyNesData){
var k2=joyNesData[vv]
nes.keyHandler(k2,true)
}
}
})

var lastState=null

ev1.on(th.stage,'keyup',(e)=>{
var kk=e.keyCode
if(kk==keyui.U){
th.openPopupSettings()
}
var kk=e.keyCode
var skey=null
if(kk in th.curJoyKeys){
var vv=th.curJoyKeys[kk]
skey=vv
if(vv in joyNesData){
var k2=joyNesData[vv]
nes.keyHandler(k2,false)
}
}

if(nes.saveState){
if(curRoomEl){
//var nm2='savedata_'+curRoomEl.rom
var nm5=curRoomEl.rom.replace('.nes','')
var nm2=nm5+'.save'
if(skey=='SAVE'){
var saveBA=nes.saveState()
if(saveBA){
var fi=new lang.io.File(th.savedataPath+'/'+nm2)
var r2=fi.write(saveBA)
if(r2){
th.openSaveMsgTxt('сохранение создано')
}
//$app.savedataBin.delete(nm2)
//$app.savedataBin.add(nm2,saveBA)
}
//lastState=saveBA
/*if(saveBA){
var fi=new lang.io.File('state45654')
fi.write(saveBA)
}*/
}else if(skey=='RESTORE'){
//var bb2=$app.savedataBin.get(nm2)
var fi=new lang.io.File(th.savedataPath+'/'+nm2)
var bb2=fi.readBytes()
if(bb2){
nes.loadState(bb2)
th.openSaveMsgTxt('сохранение загружено')
}
/*if(lastState){
nes.loadState(lastState)
}*/
}

}
}

//alert(kk)
if(e.keyCode==keyui.ESCAPE){
//alert(th.scenesMaster.curScene)
//var ind=th.cnv.getChildIndex(spr1)
System.setAppTitle(th.appTitle)
if(th.isFsEnable){
th.isFsEnable=false
}else{
if(th.scenesMaster.curScene is AppsScene){
nes.pause=false
var title2=th.appTitle
if(curRoomEl && curRoomEl.name)title2=curRoomEl.name
System.setAppTitle(title2)
th.scenesMaster.clear()
}else{
th.scenesMaster.navApps(runRom)
//nes.destroy()
}
}
}
})

System.gc()

}
}else{
th.scenesMaster.navPreloadScene('Загрузка игры...')

URL.binaryGet(el.url,(bb)=>{
if(bb.size>0){
/*fi.write(bb)
var isExt2=fi.isFile()
if(isExt2)runRom(el)*/

if($app.vm2CacheBin){
$app.vm2CacheBin.add(el.rom,bb)
runRom(el,bb,true)
}

}
},()=>{
th.scenesMaster.navApps(runRom)   
})
}
}
}else{
alert('Эта версия не поддерживает запуск игр с денди, обновите игровой центр.')
System.exec('open https://ag6.ru/vm2')
}
}
th.scenesMaster.navApps(runRom)

//th.popup.open('settinsJoyKeys')

//th.openSaveMsgTxt('сохранение создано')

if(urlObj && urlObj.file){
var fi4=urlObj.file
if(fi4.isFile()){
var ba5=fi4.readBytes()
if(ba5){
var name5=fi4.name
/*var spl=name5.split('.')
if(spl && spl.length>1){
spl.pop()
name5=spl.join('.')
}*/
if(name5 && name5.length>50)name5=name5.substr(0,50)
runRom({rom:name5,name:name5},ba5)
}
}
}

}
}

setKeysJoy(o){
var th=this
if(o){
var res={}
for(var n in o){
var vv=o[n]
res[vv]=n
}
th.curJoyKeys=res
th.curJoyKeysOrig=o
}
}

setKeysJoyDef(){
var th=this
var res={}
for(var n in th.joyKeysOrig)res[n]=th.joyKeysOrig[n]
th.setKeysJoy(res)
if('joy' in th.cfgObjData)delete th.cfgObjData.joy
th.saveCfg()
}

setNesVolume(v){
this.nesVolume=v
if(this.nes!=null)this.nes.volume=v
}

createLinearGrd(colors,ratios,w,h,rot){
if(rot<0)rot=0
var angle=rot/180*Math.PI
var cos=Math.cos(angle)
var sin=Math.sin(angle)
var grd=lang.display.Painter.createLinearGradient(0,0,cos*w,sin*h,colors,ratios)
return grd
}

createSlider(cb){
var th=this
var h=1
var sp=new lang.display.Sprite
var scrollW=16
var scrollH=8

var bg1=new lang.display.Sprite
bg1.createPainter()
bg1.alpha=0.5

var sz2=scrollW/2
var colors=['#54DEF0','#03899C']

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

bg1.on('mousedown',(e)=>{
//startY=scrollH/2
lastV=-1
cbMove(e)
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})

bg2.on('mousedown',(e)=>{
var pos=bg1.toLocal({x:e.mouseX,y:e.mouseY})
startY=pos.x-this.x
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})
sp.addChild(bg1,seekSpr)
sp.setValue=cbPos
sp.resize=resizeCB
return sp
}

openSaveMsgTxt(s){
var th=this
if(s){
if(th.curSaveSprInfo){
if(th.curSaveSprInfo.tm){
th.curSaveSprInfo.tm.stop()
th.curSaveSprInfo.tm=null
}
if(th.curSaveSprInfo.parent)th.curSaveSprInfo.parent.removeChild(th.curSaveSprInfo)
th.curSaveSprInfo=null
}

var marg=10
var sp=new lang.display.Sprite
sp.txtVal=s
sp.tm=Timer.init(2000,()=>{
this.stop()
if(th.curSaveSprInfo && th.curSaveSprInfo.parent)th.curSaveSprInfo.parent.removeChild(th.curSaveSprInfo)
if(th.curSaveSprInfo==sp)th.curSaveSprInfo=null
})

var tx=th.text(s,{fontSize:18})
tx.x=marg
tx.y=marg

var re=th.rect(tx.width+(marg*2),tx.height+(marg*2),'#000000')
re.alpha=0.8
sp.addChild(re,tx)

th.curSaveSprInfo=sp
th.autoResize()
th.cnv.addChild(sp)
}
}

rect(w,h,color){
var sp=new lang.display.Sprite
sp.createPainter()
sp.painter.rect(0,0,w,h,color)
return sp
}

text(v,props){
var th=this
var defFontSize=16
var defColor=0xFFFFFF
var isBold=true
var tx=new lang.text.TextField
if(props){
if('color' in props)defColor=props.color
if('fontSize' in props)defFontSize=props.fontSize
if('bold' in props)isBold=props.bold
}
tx.color=defColor
tx.fontSize=defFontSize
tx.bold=isBold
if(v)tx.text=v

if(props && props.align=='center'){
if('allW' in props && props.allW>0){
tx.x=(props.allW-tx.width)/2
if(tx.x<0)tx.x=0
}
}

return tx
}

openPopupSettings(){
this.popup.open('settings')
}

saveCfg(){
var th=this
if(th.tmSave==null){
th.tmSave=Timer.init(1000,()=>{
this.stop()
th.tmSave=null
var s=JSON.encode(th.cfgObjData)
var bb=new lang.utils.ByteArray
bb.writeUTFBytes(s)
bb.position=0

var fi=new lang.io.File(th.cfgSavePath)
fi.write(bb)
})
}
}

loadCfg(){
var th=this
var fi=new lang.io.File(th.cfgSavePath)
var bb=fi.readBytes()
if(bb && bb.length>0){
var s=bb.readUTFBytes(bb.length)
var ob=JSON.decode(s)
if(!ob)ob={}
th.cfgObjData=ob
}
}

autoResize(){
var th=this
var clrBG='#000000'
//var clrBG='#FFFFFF'
//if(th.stage.displayState!='fullscreen')clrBG='#000000'
var w=th.stage.stageWidth
var h=th.stage.stageHeight
th.bg.painter.clear()
th.bg.painter.rect(0,0,w,h,clrBG)
th.scenesMaster.resize(w,h)
th.popup.resize(w,h)

th.cnv.width=w
th.cnv.height=h

if(th.curSaveSprInfo){
th.curSaveSprInfo.y=h-th.curSaveSprInfo.height
}

if(th.nes){
if(dispType==1){
th.nes.x=0
th.nes.y=0
th.nes.scaleX=w/th.nesWidth
th.nes.scaleY=h/th.nesHeight
}else if(dispType==2){
nes.x=(w-th.nesWidth)/2
nes.y=(h-th.nesHeight)/2
th.nes.scaleX=1
th.nes.scaleY=1
}else{
var factor=Math.min(w/th.nesWidth,h/th.nesHeight)
nes.scaleX=factor
nes.scaleY=factor
/*th.nes.scaleX=w/th.nesWidth
th.nes.scaleY=h/th.nesHeight*/
nes.x=(w-(th.nesWidth*nes.scaleX))/2
nes.y=(h-(th.nesHeight*nes.scaleY))/2
}
}
}

}