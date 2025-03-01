class Main extends lang.display.Sprite{
constructor(){
var th=this
th.packageName=null
VM.setGlobal('$app',th)

if(window.AppBuildInfo){
th.packageName=AppBuildInfo.packageID
System.setAppTitle(AppBuildInfo.appName)
}

var cl=GlobalUtils
for(var n in cl){
if(n!='<init>')window[n]=cl[n]
}

window.PARENT_NULL=true
window.NORMAL_TEXT_SIZE=true

VM.errorsHandler=()=>{} // чтобы скрыть надпись (для выхода из полноэкранного режима)

th.spr=sprite()
th.scaleFactor=1
th.allScale=1
th.pixelRatio=stage.devicePixelRatio
th.isVM2V11=false
if(System.getMonitorInfo)th.isVM2V11=true
th.vm2Acc=null
th.isStart=false
th.isVM2V2=false
th.isAutoFileRsz=false
th.curScreenSpr=null
th.stageSize={w:0,h:0}
th.stageScale={w:0,h:0}
th.header=new HeaderSpr
th.windowMaster=new WindowMaster
th.scenesMaster=new ScenesMaster
th.assetsReader=new AssetsReader
th.assetsReader.readLocal(th.loaderInfo.bytes)
th.cnv=new lang.display.Canvas
addChild(th.cnv)
VM.setGlobal('$app',th)

if(System.getMonitorInfo)th.isVM2V2=true
if(System.setWindowRestore)th.isAutoFileRsz=true
if(th.cnv.removeRClick)th.cnv.removeRClick()

/*Timer.initOne(3000,()=>{
var win=System.getWindow()
if(win && win.screenshot)win.screenshot()
})*/

//System.setWindowMax()

th.header.init()
th.scenesMaster.y=th.header.h

var bmd3=GlobalUtils.pixelsToBMD({width:2,height:2,pixels:[1,1,1,1],palette:['#EEEEEE','#FEFEFE']})
th.bg=new lang.display.Bitmap
th.bg.src=bmd3

th.spr.addChild(th.bg,th.scenesMaster,th.header)
th.cnv.addChild(th.spr)

th.cnv.addChild(th.windowMaster)
th.windowMaster.init()
th.windowMaster.resize(800,600)

th.scenesMaster.nav('Home')

var dragList=[]
var cbDrag=null

stage.on('mousedown',(e)=>{
var targ=e.target
if(targ){
if(targ.isDragItem){
if(targ.parent){
var p1=mousePos(targ.parent,e)
var targ2=targ
if(targ.dragItemElement)targ2=targ.dragItemElement
dragList.push({o:targ2,pos:p1,sx:targ.x,sy:targ.y})
if(!cbDrag){
cbDrag=(e)=>{
for (var i = 0; i < dragList.length; i++) {
var el=dragList[i]
if(el.o.parent){
var p2=mousePos(el.o.parent,e)
el.o.x=(p2.x)-(el.pos.x-el.sx)
el.o.y=(p2.y)-(el.pos.y-el.sy)
}
}
}
th.stage.on('mousemove',cbDrag)
}
}
}
}
})

th.stage.on('mouseup',(e)=>{
if(cbDrag){
th.stage.off('mousemove',cbDrag)
cbDrag=null
}
if(dragList.length>0)dragList=[]
})

th.stage.on('rclick',(e)=>{
var targ=e.target
if(targ && targ.rclick){
targ.rclick(e)
}else{
//th.cnv.openMenuCanvas(th.cnv,e)
}
})

/*th.windowMaster.open('colorpicker',(v)=>{
Config.headerBG=v
th.header.bg.painter.fillV=v
th.header.resize(th.stageScale.w,th.stageScale.h)
})

return*/

var isLinux=false
if(System.platform.os=='linux')isLinux=true

stage.on('focus',()=>{
if(th.isStart){
if(!th.curScreenSpr){
if(isLinux){
System.setWindowState('hide')
Timer.initOne(300,()=>{
var bmd2=VM.callNative('getScreenDesktop')
th.screenShotBmd(bmd2)
})
}else{
Timer.initOne(100,()=>{
th.screenShot()
})
}
}
}
})

th.checkUpdate()

stage.on('resize',()=>{th.autoResize()})
th.autoResize()

/*var panel=new EditorPanel
th.spr.addChild(panel)*/

/*Timer.initOne(200,()=>{
th.screenShot()
})*/

/*var pick=colorpicker('#000000',(v)=>{
//alert(v)
})
th.cnv.addChild(pick)*/
}

readyScreen(){
var th=this
if(th.curScreenSpr)th.curScreenSpr.removeScene()
th.curScreenSpr=null
th.stage.displayState='normal'
System.setWindowMin()
}

readyScreenNoMin(){
var th=this
if(th.curScreenSpr)th.curScreenSpr.removeScene()
th.curScreenSpr=null
th.stage.displayState='normal'
}

screenShotBmd(bmd2){
var th=this
var isWinState=false
if(System.setWindowState)isWinState=true

if(bmd2){
if(isWinState)System.setWindowState('hide')
else System.setWindowMin()

if(isWinState)System.setWindowState('show')
else System.setWindowMax()

var bm=new lang.display.Bitmap
bm.bmdData=bmd2
bm.src=bmd2
if(bm.width>0 && bm.height>0){
th.stage.displayState='fullscreen'
var q=new ScreenScene(bm)
th.curScreenSpr=q
th.autoResize()
th.spr.addChild(q)
}
}
}


screenShot(){
var th=this
//System.setWindowMin()
var isWinState=false
if(System.setWindowState)isWinState=true

if(isWinState)System.setWindowState('hide')
else System.setWindowMin()

var bmd2=VM.callNative('getScreenDesktop')
if(isWinState)System.setWindowState('show')
else System.setWindowMax()
//alert(bmd2.getPixel(0,0))

var bm=new lang.display.Bitmap
bm.bmdData=bmd2
bm.src=bmd2
if(bm.width>0 && bm.height>0){
//if(isWinState){

//}else{
th.stage.displayState='fullscreen'
//}

var q=new ScreenScene(bm)
th.curScreenSpr=q
th.autoResize()
th.spr.addChild(q)
}
}

checkUpdate(){
var q=null
if($app.packageName){
var gl=GLOBAL
if('MainUI' in gl){
if('checkUpdateApp' in MainUI){
q=MainUI.checkUpdateApp($app.packageName,(v)=>{
if(q.parent)q.parent.removeChild(q)
})
}
}
if(q){
q.check()
$app.cnv.addChild(q)
}
}
}

autoResize(){
var th=this
var w=th.stage.stageWidth
var h=th.stage.stageHeight
if(!th.isVM2V11){
th.scaleFactor=th.pixelRatio
}

var ratio=th.scaleFactor
th.allScale=ratio

if(th.isVM2V11){
th.allScale=th.pixelRatio
}

th.stageSize.w=w
th.stageSize.h=h
th.stageScale.w=w/ratio
th.stageScale.h=h/ratio
th.cnv.width=w
th.cnv.height=h
th.cnv.scaleX=ratio
th.cnv.scaleY=ratio
th.bg.scaleX=th.stageScale.w/th.bg.width
th.bg.scaleY=th.stageScale.h/th.bg.height
th.header.resize(th.stageScale.w,th.stageScale.h)
th.windowMaster.resize(th.stageScale.w,th.stageScale.h)
var cntW=th.stageScale.w
var cntH=th.stageScale.h-th.scenesMaster.y
th.scenesMaster.resize(cntW,cntH)

if(th.curScreenSpr)th.curScreenSpr.resize(cntW,cntH)

//th.bg.painter.clear()
//th.bg.painter.rect(0,0,w,h,th.bg.painter.fillV)
}

}