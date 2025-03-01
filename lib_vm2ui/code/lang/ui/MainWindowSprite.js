class ButtonSpr3 extends lang.display.Sprite{

constructor(text,w,h,color,color2,cb){
this.w=w
this.h=h
this.state1=0
this.color=color
this.color2=color2
this.bg=new lang.display.Sprite
this.bg.alpha=0
this.bg.createPainter()
this.bg.buttonMode=true
this.bg.painter.rect(0,0,w,h,'#000000')
this.itemObj=null
var th=this
var sp=new lang.display.Sprite
sp.createPainter()
this.sp=sp
//sp.buttonMode=true
addChild(sp)

var txt=new lang.text.TextField
txt.fontName='Arial'
txt.fontSize=18
txt.color=0xFFFFFF
txt.text=text
//txt.mouseEnabled=false
this.txt=txt
this.resize(w,h)

addChild(txt,this.bg)

var func2=(e)=>{
if(th.state1==1){
th.state1=0
th.changeState(0)
}
th.stage.off('mouseup',func2)
}

this.bg.on('mousedown',(e)=>{
if(th.state1==0){
th.state1=1
th.changeState(1)
}
th.stage.on('mouseup',func2)
})

this.bg.on('click',(e)=>{
var obb=th.itemObj
if(obb==null)obb=th
if(cb)cb(obb)    
})

this.changeState(0)
}

changeText(v){
var th=this
if(v){
th.txt.text=v
th.resize(th.w,th.h)
}
}

resize(w,h){
this.w=w
this.h=h
var ww1=0
this.txt.x=(w-this.txt.width+ww1)/2
this.txt.y=(h-this.txt.height)/2
this.state1=0
this.changeState(0)
}


changeState(v){
var clr=(v==0) ? this.color : this.color2
this.sp.painter.clear()
this.sp.painter.border(1,0,0.3)
this.sp.painter.rect(0,0,this.w,this.h,clr)
}

}


class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(thh){
var th=this
th.windowFolder='windowApp'
th.windowSpr=thh.windowSpr
th.curOverButton=null
th.assetsVector=new lang.ui.WindowVectorAssets(thh)
th.buttonsBar=[]
th.cfgScroll={border:2}
th.cfgFileData=null
th.cfgSaveTimer=null
th.pixelRatio=1
th.isSupScroll=false
th.defScrollObj={w:16,h:60}
th.stageLoaderCntWH={width:0,height:0}
th.timerRszLoader=null
th.zoomConfig={min:0.20,max:5,step:0.2}
th.zoomKoef=1
th.zoomInfoTxt=null
th.scaleFactor=1
th.assetsScale=1
th.contentScale=1
th.scrollContainer=new lang.display.Sprite
th.scrollSprV=null // вертикальная прокрутка
th.scrollSprH=null // горизонтальная прокрутка
th.panelButtonsW=0
th.panelH=0
th.butH=0
th.borderSize=0
th.isUpdLoader=true
th.loaderContentSize={width:0,height:0}
th.isBlackTheme=false
th.barColorBlack='#303030'
th.barColor='#F1F1F1'
//th.isLinux=false
th.isBorderWindow=true
th.windowPos=th.windowSpr.windowPos
if('devicePixelRatio' in th.stage)th.pixelRatio=th.stage.devicePixelRatio
//th.pixelRatio=1.5
th.scaleScroll=th.pixelRatio
/*if('os' in System.platform){
if(System.platform.os=='linux')th.isLinux=true
}*/

if(th.windowSpr){
if('borderWindow' in th.windowSpr)th.isBorderWindow=th.windowSpr.borderWindow
}

if(Array.from)th.isSupScroll=true
th.setScaleUpBar(th.pixelRatio)
}

setScaleContent(v){
var th=this
if(v<0.1)v=0.1

var zoomPerc=Math.round(v*100)
v=zoomPerc/100
var pixRatio=th.pixelRatio
var k2=v*pixRatio
th.contentScale=k2
th.stage.zoom=k2
if(th.lo){
//th.lo.devicePixelRatio=th.contentScale
th.lo.scaleX=th.contentScale
th.lo.scaleY=th.contentScale
}

if(th.scrollSprV)th.scrollSprV.setScaleScroll(th.contentScale)
if(th.scrollSprH)th.scrollSprH.setScaleScroll(th.contentScale)
//th.scrollContainer.scaleX=th.contentScale
//th.scrollContainer.scaleY=th.contentScale
/*if(th.contentSpr){
th.contentSpr.scaleX=th.contentScale
th.contentSpr.scaleY=th.contentScale
}*/

if(th.zoomInfoTxt){
var zoomPerc=Math.round(v*100)
th.zoomInfoTxt.text=''+zoomPerc+'%'
}

th.autoResize()
}

setScaleUpBar(v){
var th=this
th.scaleFactor=v
th.assetsScale=th.scaleFactor//Math.ceil(th.scaleFactor)
th.borderSize=Math.round(6*th.scaleFactor)
th.panelH=Math.round(30*th.scaleFactor)
th.panelH=th.panelH+th.borderSize

th.butH=Math.round(th.panelH/th.scaleFactor)
th.butH=th.butH+(th.borderSize)

if(th.upPanel){
th.upPanel.butRights.scaleX=th.scaleFactor
th.upPanel.butRights.scaleY=th.scaleFactor
}

}

getStageSizeObj(){
var th=this
var vv={}
vv.width=Math.round(th.loaderContentSize.width)
vv.height=Math.round(th.loaderContentSize.height)
//vv.width=Math.round(th.loaderContentSize.width*th.contentScale)
//vv.height=Math.round(th.loaderContentSize.height*th.contentScale)
return vv
}

updFileCfg(){
var th=this
if(th.cfgSaveTimer==null){
th.cfgSaveTimer=Timer.init(500,()=>{
this.stop()
th.cfgSaveTimer=null
th.saveFileCfg()
})
}
}

readFileCfg(){
var th=this
var ob=null
var fi=new lang.io.File(th.windowFolder+'/config.json')
var isExt=fi.isFile()
if(isExt){
var ba=fi.readBytes()
if(ba && ba.length>0){
var ss=ba.readUTFBytes(ba.length)
if(ss)ob=JSON.decode(ss)
}
}
if(!(ob is Object))ob=null
th.cfgFileData=ob
if(!th.cfgFileData){
th.cfgFileData={}
th.saveFileCfg()
}
return th.cfgFileData
}

saveFileCfg(){
var th=this
if(!th.cfgFileData)th.cfgFileData={}
var ss=JSON.encode(th.cfgFileData)
if(ss){
var ba=new lang.utils.ByteArray
ba.writeUTFBytes(ss)
ba.position=0
if(ba.length>0){
var fi=new lang.io.File(th.windowFolder+'/config.json')
fi.write(ba)
}
}
}

checkURLBrowser(v){
if(v && v.length>0){
var p=v.indexOf('http://')
if(p==-1)p=v.indexOf('https://')
if(p==0)return true
}
return false
}

getScaleScrollCntSize(){
var th=this
var cnvW=0
var cnvH=0
var dispSpr=null
var dispSpr2=null
if(th.isSupScroll){
if(th.lo){
if(th.lo && th.lo.loaderInfo){
dispSpr=th.lo.loaderInfo.content

if(dispSpr && dispSpr.m && dispSpr.m.scenesMasterUp && dispSpr.m.scenesMasterUp.curScene){
var curSc=dispSpr.m.scenesMasterUp.curScene
if(curSc && curSc.loader && curSc.loader.loaderInfo && curSc.loader.loaderInfo.content){
dispSpr=curSc.loader.loaderInfo.content
}
}else{
//dispSpr2=dispSpr
}

if(dispSpr && dispSpr.getViewportInfo){
var ob2=dispSpr.getViewportInfo()
if(ob2){
dispSpr2=ob2.content
cnvW=ob2.width
cnvH=ob2.height
}
}

}
//if(dispSpr && dispSpr.cnv){
if(dispSpr2){
//var cnvW=(dispSpr.cnv) ? dispSpr.cnv.width : dispSpr.width
//var cnvH=(dispSpr.cnv) ? dispSpr.cnv.height : dispSpr.height
if(cnvW==0)cnvW=dispSpr2.width
if(cnvH==0)cnvH=dispSpr2.height
var cntW=Math.round(th.loaderContentSize.width/th.contentScale)
var cntH=Math.round(th.loaderContentSize.height/th.contentScale)
var kW=cntW/cnvW
var kH=cntH/cnvH
//alert(cntW,cntH,kW,kH)
var scaleWidth=Math.max(0,cnvW-(cnvW*kW))
var scaleHeight=Math.max(0,cnvH-(cnvH*kH))
if(scaleWidth<1)kW=1
if(scaleHeight<1)kH=1

return {cntW:cntW,cntH:cntH,width:cnvW,height:cnvH,content:dispSpr2,scaleWidth:scaleWidth,scaleHeight:scaleHeight,scaleKoefWidth:kW,scaleKoefHeight:kH}
}
}
}
return null
}

init(){
var th=this

MainUI.stageSizeCB=()=>{
var vv=th.getStageSizeObj()
return vv
}

MainUI.contentSpr=th.contentSpr

var fi=new lang.io.File(th.windowFolder)
var isExt=fi.isDirectory()
if(!isExt)fi.mkdir()

th.readFileCfg()

th.isBlackTheme=th.checkBlackTheme()

if(th.isSupScroll){

th.scrollSprV=th.createScroll('v',(v)=>{
var szCnt=th.getScaleScrollCntSize()
var hh2=0
if(th.scrollSprH && th.scrollSprH.visible)hh2=((th.defScrollObj.w/th.contentScale)*th.scaleScroll)
if(szCnt){
//th.scrollSprV.setScrollKoefCnt(k2)
szCnt.content.y=-((szCnt.scaleHeight+hh2)*v)
}

/*
var dispSpr=null
if(th.lo && th.lo.loaderInfo)dispSpr=th.lo.loaderInfo.content
if(dispSpr && dispSpr.cnv){
var cntH=th.loaderContentSize.height/th.contentScale
var k2=cntH/dispSpr.cnv.height
//th.scrollSprV.setScrollKoefCnt(k2)
var cnvHeight=dispSpr.cnv.height-(dispSpr.cnv.height*k2)
dispSpr.y=-(cnvHeight*v)
}
if(th.lo)th.lo.y=-(scaleHeight*v)
//alert(sh,th.loaderContentSize.height)*/
})

th.scrollSprH=th.createScroll('h',(v)=>{
var szCnt=th.getScaleScrollCntSize()
if(szCnt){
var hh2=0
if(th.scrollSprV && th.scrollSprV.visible)hh2=((th.defScrollObj.w/th.contentScale)*th.scaleScroll)
szCnt.content.x=-((szCnt.scaleWidth+hh2)*v)
}
})

th.scrollContainer.addChild(th.scrollSprV,th.scrollSprH)

th.scrollSprV.setScrollKoefCnt(1)
th.scrollSprH.setScrollKoefCnt(1)
}

var tfTitle=new lang.text.TextField
tfTitle.color=0xFFFFFF
tfTitle.fontSize=16*th.scaleFactor
tfTitle.mouseEnabled=false
tfTitle.titleStr=''
tfTitle.bold=true
th.windowSpr.tfTitle=tfTitle


var createScroll2=(t,cb)=>{
var defScrollObj={w:16,h:60}
var cfgScroll={border:2}
//var styleBlack={bg:'#EEEEEE',clr:'#3a9ac4'}
var styleBlack={bg:'#EEEEEE',clr:'#424242'}
var curStyle=styleBlack
var scrollW=defScrollObj.w
var scrollH=defScrollObj.h
var scaleV=1
var contentScale=1
var scaleScroll=1
var scaleCntKoef=1
var allH=0
var isHorizontal=false
if(t=='v')isHorizontal=true

var sp=new lang.display.Sprite
var bg1=new lang.display.Sprite
var bg2=new lang.display.Sprite
bg1.createPainter()
bg2.createPainter()

//bg2.buttonMode=true
var lastV=0
var startY=0
var borderV=cfgScroll.border
var ev=new lang.events.EventsObjectMaster

var redraw=()=>{
bg1.painter.clear()
bg2.painter.clear()
bg1.painter.border(borderV,0)
if(isHorizontal){
bg1.painter.rect(0,0,allH,scrollW,curStyle.bg)
bg2.painter.rect(1,1,scrollH-1,scrollW-2,curStyle.clr)
}else{
bg1.painter.rect(0,0,scrollW,allH,curStyle.bg)
bg2.painter.rect(1,1,scrollW-2,scrollH-1,curStyle.clr)
}
}

var cbPos=(k)=>{
if(k<0)k=0
if(k>1)k=1
var posVal=k*((allH)-scrollH)
if(isHorizontal){
bg2.x=posVal
}else{
bg2.y=posVal
}
}

var cbMove=(e)=>{
var pos2=bg1.toLocal({x:e.mouseX/scaleV,y:e.mouseY/scaleV})
var yy=pos2.y
if(isHorizontal)yy=pos2.x
var kk=(yy-startY)/((allH)-scrollH)
if(kk<0)kk=0
if(kk>1)kk=1
cbPos(kk)
if(kk!=lastV){
if(cb)cb(kk)
lastV=kk
}
}

bg1.on('mousedown',(e)=>{
startY=scrollH/2
cbMove(e)
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})

bg2.on('mousedown',(e)=>{
var pos=bg1.toLocal({x:e.mouseX/scaleV,y:e.mouseY/scaleV})
startY=pos.y-this.y
if(isHorizontal)startY=pos.x-this.x
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})

sp.addChild(bg1,bg2)
sp.setScrollPos=cbPos
sp.setScrollKoefCnt=(kk)=>{
var newVal=0
if(scaleCntKoef<kk){
if(lastV!=newVal){
lastV=newVal
cbPos(newVal)
if(cb)cb(newVal)
}
}
scaleCntKoef=kk
sp.visible=kk<1.0
var scH=Math.round(allH*scaleCntKoef)
if(scH<defScrollObj.w)scH=defScrollObj.w
if(scrollH!=scH){
scrollH=scH
redraw()
}
}
sp.setScaleScroll=(kk)=>{
scaleV=contentScale
var k2=scaleScroll
scrollW=Math.round(defScrollObj.w*k2)
scrollH=Math.round(defScrollObj.h*k2)
redraw()
}

sp.resize=(h)=>{
if(h>0){
allH=h
redraw()
}
}
sp.scrollObj=defScrollObj
return sp
}

var stackErrors=[]
var curErrorSpr=null
var curNotifyMaxErrorsSpr=null
var maxErrorsNums=30

var openException=(pr,_txt,cb)=>{
var packageName=null
var tt=''
if(pr && pr.packageName)packageName=pr.packageName
if(pr && pr.type)tt=pr.type
var minSize={w:280,h:100}
var maxSize={w:500,h:260}
var txtSpr=new lang.display.Sprite
var w1=maxSize.w
var fontSize=18
var fullW=0
var yy2=0
var txt=''
if(packageName)txt=packageName+'\n'
txt+=_txt

var tf=new lang.text.TextField
tf.fontSize=fontSize

//System.setClipboard(str)

var aa3=tf.splitTextInfo(txt,{x:0,maxWidth:w1,wordWrap:true})
if(aa3){
for (var i = 0; i < aa3.length; i++) {
var el=aa3[i]
if(el.type=='text'){
var tw=el.width
if(fullW<tw)fullW=tw
var tf2=new lang.text.TextField
//tf2.color=0
tf2.color=0xFF0000
tf2.fontSize=fontSize
tf2.text=el.text
tf2.x=2+((w1-tw)/2)
tf2.y=yy2
txtSpr.addChild(tf2)
yy2=yy2+el.height+5
}
}
}

if(fullW<minSize.w){
txtSpr.x=(minSize.w-fullW)/2
fullW=minSize.w
}

//w1=fullW+4

var textW=tf.width+4
var h1=yy2

if(h1<minSize.h){
txtSpr.y=(minSize.h-h1)/2
}

if(tf.width>maxSize.w)tf.maxWidth=maxSize.w
if(textW>maxSize.w)textW=maxSize.w

//if(w1>maxSize.w)w1=maxSize.w
//if(w1<minSize.w)w1=minSize.w

if(h1>maxSize.h)h1=maxSize.h
if(h1<minSize.h)h1=minSize.h

var scrollV=createScroll2('h',(kk)=>{
txtSpr.y=-((yy2-maxSize.h)*kk)
})

scrollV.resize(maxSize.h)
scrollV.setScrollKoefCnt(maxSize.h/yy2)

//if(scrollV.visible){
scrollV.x=w1+6
w1=w1+scrollV.scrollObj.w+4
//}

w1+=4


//var clrBar=th.barColor
//if(th.isBlackTheme)clrBar=th.barColorBlack


var buttonsSpr=new lang.display.Sprite
var x3=0
var y3=0
var butH=40
var tm1=null
var isLockSendError=false

var sendErrorCB=(but1)=>{
var apiUrl='https://ag6.ru/VM2Api.php'
var errTxt='Не удалось отправить запрос [повторить]'
var ver=0
if(!isLockSendError){
isLockSendError=true
if('platformVersion' in System.platform)ver=System.platform.platformVersion
but1.changeText('Идёт отправка запроса...')

URL.post(apiUrl,{c:'vm2SendAppError',version:ver,text:_txt,appid:packageName},(res)=>{
if(res=='ok'){
but1.changeText('Информация об ошибке передана!')
Timer.initOne(1800,()=>{
if(pp)pp.remove()
})
}else if(res=='exists'){
but1.changeText('Эта ошибка уже есть в журнале ошибок.')
}else{
isLockSendError=false
but1.changeText('Не удалось передать информацию [повторить]')
}
},()=>{
isLockSendError=false
but1.changeText(errTxt)
})
}
}

var buttonsArr=[
{name:'Сообщить об ошибке',x:2,color:'#3EB642',colorOver:'#00CC00',w:w1-4,cb:(thh)=>{
sendErrorCB(thh)
}},
null,
{name:'Скопировать',x:2,color:'#348f82',colorOver:'#41b7a6',w:160,cb:(thh)=>{
if(tm1==null){
//var txt3=''+txt
//if(txt3){
//var spl=txt3.split('\n')
//txt3=spl.join('')
//}
System.setClipboard(txt)
thh.changeText('В буфере обмена')
tm1=Timer.initOne(2000,()=>{
tm1=null
thh.changeText('Скопировать')
})
}
}},
{name:'Сохранить в файл',x:0,color:'#51357e',colorOver:'#6b46a7',w:210,cb:()=>{
var dt=Date.getTimestamp()
var nm='vm2_error_'+dt+'.txt'
var fi=new lang.io.File(nm)
var ba=new lang.utils.ByteArray
ba.writeUTFBytes(txt)
ba.position=0
if(System.saveFileDialog){
System.saveFileDialog(nm,(fi)=>{
var res=false
if(fi)res=fi.write(ba)
})
}else{
var res=fi.saveDialog(ba)
}
}},
{name:'Закрыть',x:0,color:'#91386d',colorOver:'#bf438d',w:135,cb:(thh)=>{
pp.remove()
if(curErrorSpr==sp)curErrorSpr=null
}},
null
]

if(tt=='fullErrors'){
buttonsArr=[
{name:'Перезапустить игровой центр',x:2,color:'#3EB642',colorOver:'#00CC00',w:w1-4,cb:()=>{
System.exec('runVM2')
System.exit()
}},
null,
{name:'Закрыть все ошибки',x:150,color:'#91386d',colorOver:'#bf438d',w:235,cb:(thh)=>{
stackErrors=[]
if(curErrorSpr && curErrorSpr.pp)curErrorSpr.pp.remove()
if(curNotifyMaxErrorsSpr && curNotifyMaxErrorsSpr.pp)curNotifyMaxErrorsSpr.pp.remove()
curErrorSpr=null
curNotifyMaxErrorsSpr=null
}},
null
]
}

for (var i = 0; i < buttonsArr.length; i++) {
var el=buttonsArr[i]
if(el){
var x4=0
var clrMain=el.color
var clrOver=clrMain
if('x' in el)x4=el.x
if(el.colorOver)clrOver=el.colorOver
var b=new lang.ui.ButtonSpr3(el.name,el.w,butH,clrMain,clrOver,el.cb)
b.x=x3+x4
b.y=y3
x3+=b.width+8
buttonsSpr.addChild(b)
}else{
x3=0
y3+=butH+2
}
}
y3+=4
buttonsSpr.y=h1+8


var pp=new lang.ui.animalsgame.popup.PopUpDef1('Произошла ошибка ['+(stackErrors.length+1)+']',w1,h1+60+y3,th.barColorBlack)
if(cb)pp.closeCB=cb

var msk=new lang.display.Sprite
msk.createPainter()
msk.painter.rect(0,0,w1,h1)
txtSpr.mask=msk

var sp=new lang.display.Sprite
pp.addContent(sp)
sp.addChild(msk,txtSpr,buttonsSpr,scrollV)
sp.y=6
th.contentSpr.addChild(pp)
//th.addChild(pp)
sp.pp=pp
return sp
}

stage.on('systemEvent',(t,arg1,arg2)=>{
if(t=='vmError'){
if(System.platform.type=='pc'){
var s4=''
var packageName=null
var isMaxErrors=false
if(arg2.packageName)packageName=''+arg2.packageName
s4=arg2+'\n'+arg1
var err1={packageName:packageName,text:s4}
//th.windowSpr.setVMState(arg2,'stop')
th.windowSpr.setVMState(arg2,'run')
if(stackErrors.length<maxErrorsNums)stackErrors.push(err1)
if(stackErrors.length>=maxErrorsNums)isMaxErrors=true

if(curErrorSpr==null){
var openErrHandler=()=>{
curErrorSpr=null
if(stackErrors.length>0){
var errObj=stackErrors.pop()
curErrorSpr=openException({packageName:errObj.packageName},errObj.text,openErrHandler)
}else{
th.windowSpr.setVMState(arg2,'run')
}
}
openErrHandler(err1)
}

if(isMaxErrors){
if(curNotifyMaxErrorsSpr==null){
th.windowSpr.setVMState(arg2,'stop')
curNotifyMaxErrorsSpr=openException({type:'fullErrors'},'Слишком много ошибок ['+stackErrors.length+']\nРекомендуется перезапустить игровой центр.',()=>{
curNotifyMaxErrorsSpr=null
th.windowSpr.setVMState(arg2,'run')
})
}
}

}else{
th.windowSpr.setVMState(arg2,'stop')
alert(arg1,arg2)
th.windowSpr.setVMState(arg2,'run')
}
}else if(t=='execOpen'){
var urlV=arg1
if(urlV && urlV.length>0){
var isURLV=th.checkURLBrowser(urlV)
if(isURLV){

var sFind='https://ag6.ru/ss'
var p1=urlV.indexOf(sFind)
if(p1>-1){
var s3=urlV.substr(p1+(sFind.length+1))
th.openScreenSS(s3)
}else{
System.openURL(urlV)
}
}
}
}else if(t=='onFullscreen'){
th.recalcPosM()
}else if(t=='offFullscreen'){
th.recalcPosM()
}else if(t=='windowMaximize'){
var isMax=th.windowSpr.isMaximize()
th.windowSpr.setMaximize(!isMax)
}else if(t=='windowMinimize'){

}else if(t=='windowResize'){
if(arg1>0 && arg2>0){
var screenSize=System.getMonitorInfo()
arg1=arg1+(th.borderSize*2)
arg2=arg2+(th.borderSize)+th.panelH
var newX=(screenSize.width-arg1)/2
var newY=(screenSize.height-arg2)/2
if(newX<0)newX=0
if(newY<0)newY=0

var isMax=th.windowSpr.isMaximize()
//if(isMax && th.stage.displayState!='normal')isMax=false
if(!isMax){
th.windowSpr.windowResize(arg1,arg2)
th.windowSpr.setWindowPos(newX,newY,true)
}else{
th.windowSpr.windowSize.width=arg1
th.windowSpr.windowSize.height=arg2
if(th.windowSpr && th.windowSpr.lastWindowInfo){
th.windowSpr.lastWindowInfo.width=th.windowSpr.windowSize.width
th.windowSpr.lastWindowInfo.height=th.windowSpr.windowSize.height
}
}
}
}else if(t=='changeWindowTitle'){
th.setTitle(arg1)
}
})

th.upPanel=th.createUpPanel()
th.borderSpr=th.createBorderSpr()

addChild(th.borderSpr,th.upPanel)
th.contentSpr.addChild(th.scrollContainer)
th.stage.on('resize',()=>{
th.autoResize()
})


if(th.cfgFileData && 'zoomKoef' in th.cfgFileData){
th.zoomKoef=th.cfgFileData.zoomKoef as Number
if(th.zoomKoef<th.zoomConfig.min)th.zoomKoef=th.zoomConfig.min
if(th.zoomKoef>th.zoomConfig.max)th.zoomKoef=th.zoomConfig.max
}
th.setScaleContent(th.zoomKoef)
/*stage.on('focus',()=>{

})

stage.on('blur',()=>{

})*/

System.setWindowSize=(w,h)=>{
th.windowSpr.windowResize(w,h+th.panelH)
}

th.setTitle('Игровой центр')

th.stage.x=th.borderSize
th.stage.y=th.panelH+th.borderSize

th.upPanel.y=-th.panelH
th.borderSpr.x=-th.borderSize
th.borderSpr.y=th.upPanel.y-(th.borderSize*2)

th.autoResize()

/*imer.initOne(2000,()=>{
th.openScreenSS('test')
})*/

}

createScroll(t,cb){
var th=this
var sp=new lang.display.Sprite
var scrollW=th.defScrollObj.w
var scrollH=th.defScrollObj.h
var scaleV=1
var scaleCntKoef=1
var allH=0
var isHorizontal=false
if(t=='h')isHorizontal=true

var styleBlack={bg:'#EEEEEE',clr:'#424242'}
var styleDay={bg:'#F1F1F1',clr:'#C1C1C1'}
var curStyle=styleBlack

var bgColor='#EEEEEE'
var scrollColor='#424242'
var bg1=new lang.display.Sprite
var bg2=new lang.display.Sprite
bg1.createPainter()
bg2.createPainter()

//bg2.buttonMode=true
var lastV=0
var startY=0
var borderV=th.cfgScroll.border
var ev=new lang.events.EventsObjectMaster

var redraw=()=>{
bg1.painter.clear()
bg2.painter.clear()
bg1.painter.border(borderV,0)
if(isHorizontal){
bg1.painter.rect(0,0,allH,scrollW,curStyle.bg)
bg2.painter.rect(1,1,scrollH-1,scrollW-2,curStyle.clr)
}else{
bg1.painter.rect(0,0,scrollW,allH,curStyle.bg)
bg2.painter.rect(1,1,scrollW-2,scrollH-1,curStyle.clr)
}
}

var cbPos=(k)=>{
if(k<0)k=0
if(k>1)k=1
var posVal=k*((allH)-scrollH)
if(isHorizontal){
bg2.x=posVal
}else{
bg2.y=posVal
}
}

var cbMove=(e)=>{
var pos2=bg1.toLocal({x:e.mouseX/scaleV,y:e.mouseY/scaleV})
var yy=pos2.y
if(isHorizontal)yy=pos2.x
var kk=(yy-startY)/((allH)-scrollH)
if(kk<0)kk=0
if(kk>1)kk=1
cbPos(kk)
if(kk!=lastV){
if(cb)cb(kk)
lastV=kk
}
}

bg1.on('mousedown',(e)=>{
startY=scrollH/2
cbMove(e)
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})

bg2.on('mousedown',(e)=>{
var pos=bg1.toLocal({x:e.mouseX/scaleV,y:e.mouseY/scaleV})
startY=pos.y-this.y
if(isHorizontal)startY=pos.x-this.x
ev.on(th.stage,'mousemove',cbMove)
ev.on(th.stage,'mouseup',(e)=>{ev.clear()})
})

sp.addChild(bg1,bg2)
sp.setScrollPos=cbPos
sp.setScrollKoefCnt=(kk)=>{
var newVal=0
if(scaleCntKoef<kk){
if(lastV!=newVal){
lastV=newVal
cbPos(newVal)
if(cb)cb(newVal)
}
}
scaleCntKoef=kk
sp.visible=kk<1.0
var scH=Math.round(allH*scaleCntKoef)
if(scH<th.defScrollObj.w)scH=th.defScrollObj.w
if(scrollH!=scH){
scrollH=scH
redraw()
}
}
sp.setScaleScroll=(kk)=>{
scaleV=th.contentScale
var k2=th.scaleScroll
scrollW=Math.round(th.defScrollObj.w*k2)
scrollH=Math.round(th.defScrollObj.h*k2)
//sp.scaleX=scaleV
//sp.scaleY=scaleV
redraw()
}
sp.setStyleTheme=(t)=>{
var isBlack=false
if(t=='night')isBlack=true
curStyle=(isBlack) ? styleBlack : styleDay
redraw()
}

sp.resize=(h)=>{
if(h>0){
allH=h
redraw()
}
}

return sp
}

setTitle(v){
var th=this
var tintColor=0
if(th.isBlackTheme)tintColor=0xFFFFFF
//th.windowSpr.tfTitle.bold=th.isBlackTheme
th.windowSpr.tfTitle.tint=tintColor
th.windowSpr.tfTitle.text=v
th.windowSpr.tfTitle.titleStr=v
th.updPosTitle()
}

overOutAnim(o,cb){
if(o && cb){
o.on('rollover',()=>{
if(cb)cb(o,'over')
})
o.on('rollout',()=>{
if(cb)cb(o,'out')
})
cb(o,'out')
}
}

createBMD(w,h,o){
var th=this
if(w>0 && h>0){
if(o){
var resolution=th.assetsScale
o.scaleX=resolution
o.scaleY=resolution
var bmd=new lang.display.BitmapData(w,h,0,true)
bmd.resolution=resolution
bmd.draw(o)
return bmd
}
}
}

createButton1(shapeW,bm,colors,cb){
var th=this
var butW=36
bm.mouseEnabled=false
bm.x=(bm.point.x/bm.resolution)+((butW-bm.width)/2)
bm.y=(bm.point.y/bm.resolution)+((th.butH-th.borderSize-bm.height)/2)

var sp=new lang.display.Sprite
sp.bmIcon=bm
sp.bgSpr=new lang.display.Sprite
sp.bgSpr.createPainter()
sp.addChild(sp.bgSpr,bm)

var cb1=(spr,t)=>{
var clrOv=colors.random()
var clrBar=th.barColor
var clrBarDec=0xFFFFFF
var clrBarOutDec=0x9A9A9A
if(th.isBlackTheme){
clrBar=th.barColorBlack
clrBarOutDec=0xFFFFFF
}
var clr=(t=='over') ? clrOv : clrBar
bm.tint=(t=='over') ? clrBarDec : clrBarOutDec
spr.painter.clear()
spr.painter.rect(0,0,butW,th.butH-th.borderSize,clr)
spr.alpha=(t=='over') ? 1 : 0
if(t=='over')th.curOverButton=spr.parent
else if(th.curOverButton==spr.parent){
th.curOverButton=null
}
}

th.overOutAnim(sp.bgSpr,cb1)
sp.overCB=cb1
sp.bgSpr.on('click',()=>{
//cb1(this,'out')
if(cb)cb()
})
th.buttonsBar.push(sp)
return sp
}

getLoaderSize(){
var th=this
return th.loaderContentSize
}

createZoomPanel(butW){
var th=this
var shapeW=16
var sp=new lang.display.Sprite
var zoomMinus=th.assetsVector.getBitmap('icons/zoomMinus')
var zoomPlus=th.assetsVector.getBitmap('icons/zoomPlus')
var colorOverArr2=['#3665B3']

var step=th.zoomConfig.step

var setZoomCB=(v)=>{
th.zoomKoef=v
if(th.zoomKoef<th.zoomConfig.min)th.zoomKoef=th.zoomConfig.min
if(th.zoomKoef>th.zoomConfig.max)th.zoomKoef=th.zoomConfig.max
if(!th.cfgFileData)th.cfgFileData={}
th.cfgFileData.zoomKoef=th.zoomKoef
th.updFileCfg()
th.setScaleContent(th.zoomKoef)
}


var tfPerc=new lang.text.TextField
tfPerc.color=0xFFFFFF
tfPerc.fontSize=16*th.scaleFactor
tfPerc.mouseEnabled=false
tfPerc.bold=true
tfPerc.text='100%'

th.zoomInfoTxt=tfPerc
var butMinus=th.createButton1(shapeW,zoomMinus,colorOverArr2,()=>{
th.zoomKoef-=step
setZoomCB(th.zoomKoef)
})

var butPlus=th.createButton1(shapeW,zoomPlus,colorOverArr2,()=>{
th.zoomKoef+=step
setZoomCB(th.zoomKoef)
})

tfPerc.x=butW+2
tfPerc.y=(th.butH-th.borderSize-tfPerc.height)/2
butPlus.x=tfPerc.x+tfPerc.width+5
sp.addChild(butMinus,tfPerc,butPlus)
return sp
}

hexToDec(color){
if(color && color is String){
if(color.length>0){
var ch=color.charAt(0)
if(ch=='#')color=color.cut(1)
var vv=parseInt(color,16)
return vv
}
}
return 0
}

decToHex(color){
if(color==null)color=0
var vv=''+color.toString(16)
var num=vv.length
var qw=''
if(num<6){
for (var i=0; i < 6-num; i++)qw+='0'
}
var q=qw+''+vv
return '#'+q
}

createUpPanel(){
var th=this
var sp=new lang.display.Sprite
var bg=new lang.display.Sprite
bg.createPainter()
sp.bgSpr=bg
/*var barClr=th.barColor
if(th.isBlackTheme)barClr=th.barColorBlack

barClr=th.hexToDec(barClr)

var bmd=new lang.display.BitmapData(1,1,true,0)
bmd.setPixel(0,0,barClr)

bg=new lang.display.Bitmap
bg.src=new lang.io.File('5440354.jpg')
//bg.src=bmd
sp.bgSpr=bg*/
//bg.painter.rect(0,0,1,1,barClr)

sp.addChild(bg,th.windowSpr.tfTitle)

sp.butRights=new lang.display.Sprite
sp.butRights.scaleX=th.scaleFactor
sp.butRights.scaleY=th.scaleFactor
sp.addChild(sp.butRights)

var butW=36
var butH=th.butH
var xx=0
var shapeW=16
var clrOver='#E81123'

var zoomSpr=th.createZoomPanel(butW)
sp.butRights.addChild(zoomSpr)

var bmFS=th.assetsVector.getBitmap('icons/fs')
var bm2=th.assetsVector.getBitmap('icons/maximize')
var bmMin=th.assetsVector.getBitmap('icons/minimize')
var bmClose=th.assetsVector.getBitmap('icons/close')
var bmSun=th.assetsVector.getBitmap('icons/sun1')
var bmMoon=th.assetsVector.getBitmap('icons/moon1')
var bmScreenBut=th.assetsVector.getBitmap('icons/photo1')
var bmSettingsBut=th.assetsVector.getBitmap('icons/settings1')

var bmStyle1=new lang.display.Bitmap
bmStyle1.resolution=th.assetsScale
bmStyle1.src=bmMoon

/*var bmMin=new lang.display.Bitmap
bmMin.resolution=th.assetsScale
bmMin.src=th.createBMD(shapeW+minimizeLineSize,shapeW+minimizeLineSize,minimizeShape)*/

var colors2=['#3665B3','#D0006E','#00CC00','#04819E','#FF7100']
var colorOverArr=[clrOver]
var colorOverArr2=['#3665B3']

var changeThemeCB=(isBlack,updVM)=>{
th.isBlackTheme=isBlack

var lastBackTheme=false
if(th.cfgFileData && th.cfgFileData.isBlackTheme)lastBackTheme=th.cfgFileData.isBlackTheme

if(lastBackTheme!=isBlack){
if(!th.cfgFileData)th.cfgFileData={}
th.cfgFileData.isBlackTheme=isBlack
th.updFileCfg()
}

//th.setTitle(th.windowSpr.tfTitle.titleStr)
var tintColor=(th.isBlackTheme) ? 0xFFFFFF : 0
th.windowSpr.tfTitle.tint=tintColor

bmStyle1.src=(th.isBlackTheme) ? bmSun : bmMoon

for (var i = 0; i < th.buttonsBar.length; i++) {
var el=th.buttonsBar[i]
if(el.overCB){
//el.overCB(el.bgSpr,'out')
var stateV='out'
if(th.curOverButton==el)stateV='over'
el.overCB(el.bgSpr,stateV)
}
}

if(th.zoomInfoTxt)th.zoomInfoTxt.tint=tintColor
//var tintColor2=(th.isBlackTheme) ? 0xFFFFFF : 0x9A9A9A
//zoomSpr.setTintAll(tintColor2)

var styleType='day'
if(th.isBlackTheme)styleType='night'

if(th.scrollSprH)th.scrollSprH.setStyleTheme(styleType)
if(th.scrollSprV)th.scrollSprV.setStyleTheme(styleType)

if(updVM){
if(th.lo)th.lo.dispatchEvent({type:'updTheme'})
//if(th.lo)th.lo.dispatchEvent({type:'changeStyle',v:styleType})
th.isUpdLoader=false
th.autoResize()
th.isUpdLoader=true
}
}

var butSettings=th.createButton1(shapeW,bmSettingsBut,colorOverArr2,()=>{
MainUI.open('globalSettings')
})

var butPhoto1=th.createButton1(shapeW,bmScreenBut,colorOverArr2,()=>{
th.createAppScreenshot()
})

var butSun=th.createButton1(shapeW,bmStyle1,colorOverArr2,()=>{
th.isBlackTheme=!th.isBlackTheme
changeThemeCB(th.isBlackTheme,true)
})

changeThemeCB(th.isBlackTheme,false)

var butFS=th.createButton1(shapeW,bmFS,colorOverArr2,()=>{
th.stage.displayState=(th.stage.displayState=='normal') ? 'fullscreen' : 'normal'
})

var butMin=th.createButton1(shapeW,bmMin,colors2,()=>{
th.windowSpr.setWindowMinimize()
})

var butMax=th.createButton1(shapeW,bm2,colors2,()=>{
var isMax=th.windowSpr.isMaximize()
th.windowSpr.setMaximize(!isMax)
})

bmMin.y=(bm2.y+bm2.height)-6

var butClose=th.createButton1(shapeW,bmClose,colorOverArr,()=>{
th.windowSpr.close()
})

if(!th.isBorderWindow){
sp.butRights.addChild(butSettings,butPhoto1,butSun,butFS)
}else{
sp.butRights.addChild(butSettings,butPhoto1,butSun,butFS,butMin,butMax,butClose)
}
//zoomSpr.x=50

for (var i = 0; i < sp.butRights.numChildren; i++) {
var d=sp.butRights.getChildAt(i)
if(d){
d.x=xx
xx=xx+d.width
if(d==zoomSpr)xx+=6
}
}

th.panelButtonsW=sp.butRights.width

var ev=new lang.events.EventsObjectMaster
var startPos={x:0,y:0}
var lastClickTime=0

if(th.isBorderWindow){

bg.on('mousedown',(e)=>{
var tm1=Date.now()
if((tm1-lastClickTime)<=500){
var isMax=th.windowSpr.isMaximize()
//if(!isMax){
th.windowSpr.setMaximize(!isMax)
return
//}
}
lastClickTime=tm1
var posGlob=th.windowSpr.getMousePosGlobal()
var isInitDrag=false
th.updateWindowPosQ()

startPos.x=posGlob.x-th.windowPos.x
startPos.y=posGlob.y-th.windowPos.y

var isDragModeN=false
if(th.windowSpr.startWindowDrag)isDragModeN=true

//alert(startPos.x)
ev.on(th.stage,'mousemove',(e)=>{

var pos2=th.windowSpr.getMousePosGlobal()
var newX=pos2.x-startPos.x
var newY=pos2.y-startPos.y

var isMax=th.windowSpr.isMaximize()
if(isMax){
//th.windowSpr.setMaximize(false)
th.windowSpr.exitMaximize()
startPos.x=posGlob.x-th.windowPos.x
startPos.y=posGlob.y-th.windowPos.y
return
}

if(!isDragModeN){
th.windowSpr.setWindowPos(newX,newY,true)
}

})

if(isDragModeN){
if(!isInitDrag){
isInitDrag=true
th.windowSpr.startWindowDrag()
//alert(posGlob.y)
}
}

ev.on(th.stage,'mouseup',()=>{
isInitDrag=false
ev.clear()
th.updateWindowPosQ()
if(th.lo)th.lo.focus()
})

})
}
return sp
}

updateWindowPosQ(){
var th=this
if(th.windowSpr && th.windowSpr.getWindowPos){
var posWin=th.windowSpr.getWindowPos()
if(posWin){
th.windowSpr.windowPos.x=posWin.x
th.windowSpr.windowPos.y=posWin.y
}
}
}

createBorderSpr(){
var th=this
var sp=new lang.display.Sprite

var sprB=new lang.display.Sprite
var bColor='#000000'
var szB=Math.round(1*th.scaleFactor)
sprB.mouseEnabled=false
sprB.alpha=0.2
sprB.createPainter()

var lSpr=new lang.display.Sprite
lSpr.createPainter()

var rSpr=new lang.display.Sprite
rSpr.createPainter()

var upSpr=new lang.display.Sprite
upSpr.createPainter()

var downSpr=new lang.display.Sprite
downSpr.createPainter()

sp.addChild(lSpr,rSpr,upSpr,downSpr,sprB)

sp.resize=(w,h)=>{
var sz=th.borderSize

var barClr=th.barColor
if(th.isBlackTheme)barClr=th.barColorBlack
//barClr='#00FFFF'
sprB.painter.clear()
lSpr.painter.clear()
rSpr.painter.clear()
upSpr.painter.clear()
downSpr.painter.clear()

lSpr.painter.rect(0,0,sz,h,barClr)
rSpr.painter.rect(0,0,sz,h,barClr)
upSpr.painter.rect(0,0,w,sz,barClr)
downSpr.painter.rect(0,0,w,sz,barClr)

var h2=sz+szB

sprB.painter.rect(0,h2,szB,h,bColor) // left
sprB.painter.rect(w-szB,h2,szB,h-(h2*2),bColor) // right
sprB.painter.rect(0,sz,w,szB,bColor) // up
sprB.painter.rect(szB,h-sz-(szB),w,szB,bColor) // down


rSpr.x=w-sz
downSpr.y=h-(sz*2)
upSpr.y=sz
}


var ev=new lang.events.EventsObjectMaster
var startPos={x:0,y:0}

var cbInitSpr=(sp,t)=>{
sp.on('mousedown',(e)=>{
    
th.updateWindowPosQ()

var isMax=th.windowSpr.isMaximize()
if(!isMax){
    
//var posGlob=th.stage.toLocal({x:e.mouseX,y:e.mouseY})
var posGlob=th.windowSpr.getMousePosGlobal()
startPos.x=posGlob.x
startPos.y=posGlob.y

ev.on(th.stage,'mousemove',(e)=>{
//var pos2=th.stage.toLocal({x:e.mouseX,y:e.mouseY})
var pos2=th.windowSpr.getMousePosGlobal()
//var newX=pos2.x-startPos.x+th.windowSpr.windowSize.width
var newX=th.windowSpr.windowSize.width
var newY=th.windowSpr.windowSize.height
if(t=='left'){
newX=newX+(startPos.x-pos2.x)
th.windowSpr.setWindowPos(pos2.x,th.windowSpr.windowPos.y,true)
startPos.x=pos2.x
//newX=newX+(startPos.x-pos2.x)
//th.windowSpr.setWindowPos((pos2.x-startPos.x)+th.windowSpr.windowPos.x,th.windowSpr.windowPos.y,true)
}else if(t=='right'){
newX=pos2.x-startPos.x+newX
startPos.x=pos2.x
}else if(t=='up'){
newY=newY+(startPos.y-pos2.y)
th.windowSpr.setWindowPos(th.windowSpr.windowPos.x,pos2.y,true)
startPos.y=pos2.y
//newY=newY+(startPos.y-pos2.y)
//th.windowSpr.setWindowPos(th.windowSpr.windowPos.x,(pos2.y-startPos.y)+th.windowSpr.windowPos.y,true)
}else if(t=='down'){
newY=pos2.y-startPos.y+newY
startPos.y=pos2.y
}

if(newX<th.panelButtonsW+(th.borderSize*2))newX=th.panelButtonsW+(th.borderSize*2)
if(newY<th.panelH+th.borderSize)newY=th.panelH+th.borderSize

th.windowSpr.windowResize(newX,newY)
})
ev.on(th.stage,'mouseup',()=>{
ev.clear()
})
}
})
}

if(th.isBorderWindow){
cbInitSpr(lSpr,'left')
cbInitSpr(rSpr,'right')
cbInitSpr(upSpr,'up')
cbInitSpr(downSpr,'down')
}
return sp
}

createAppScreenshot(){
var th=this
var szz=MainUI.getStageSize()
//var szz=th.getLoaderSize()
if(szz.width>0 && szz.height>0 && th.lo){
var bmd=new lang.display.BitmapData(szz.width,szz.height,0,true)
bmd.draw(th.lo)
th.createSceneScreenshot(bmd)
}
}

createSceneScreenshot(bmd){
var th=this
if(th.curScreenshotScene){
th.curScreenshotScene.removeScene()
th.curScreenshotScene=null
}
var bm=new lang.display.Bitmap
bm.bmdData=bmd
bm.src=bmd
var q=new lang.ui.animalsgame.Screenshot2(bm,(bm3)=>{
MainUI.open('openScreenshot',[bm3])
})

//var sz=MainUI.getStageSize()
th.curScreenshotScene=q
th.contentSpr.addChild(q)
}

openScreenSS(url){
var th=this
var q=new lang.ui.animalsgame.SSServiceMain
q.scenesMaster.navSSServiceScene(url)
th.contentSpr.addChild(q)
}

updPosTitle(){
var th=this
var sw=th.stage.stageWidth
var titleW=th.windowSpr.tfTitle.width
var posTitleX=(sw-titleW)/2
th.windowSpr.tfTitle.visible=true
if(posTitleX+titleW>=th.upPanel.butRights.x){
posTitleX=((sw-th.upPanel.butRights.width)-titleW)/2
if(posTitleX+titleW>=th.upPanel.butRights.x){
th.windowSpr.tfTitle.visible=false
}
}
//th.windowSpr.tfTitle.visible=posTitleX>=0
th.windowSpr.tfTitle.x=posTitleX
th.windowSpr.tfTitle.y=(th.panelH-(th.windowSpr.tfTitle.height*th.windowSpr.tfTitle.scaleY))/2
}

isFullscreenV(){
var th=this
var isFS=false
var st=th.stage
if(th.stage.displayState=='fullscreen')isFS=true
return isFS
}

recalcPosM(){
var th=this
var isFS=th.isFullscreenV()
var st=th.stage

if(isFS){
st.x=0
st.y=0
}else{
st.x=th.borderSize
st.y=th.panelH+th.borderSize
}
th.upPanel.visible=!isFS
th.borderSpr.visible=!isFS

}


updScrollsCB(){
var th=this

var contentWidth=th.stageLoaderCntWH.width
var contentHeight=th.stageLoaderCntWH.height
var scaleKoefW=1
var scaleKoefH=1
var isScrollV=false
var isScrollH=false
var szCnt=th.getScaleScrollCntSize()
if(szCnt){
    
var kW=szCnt.cntW/szCnt.width
var kH=szCnt.cntH/szCnt.height
if(kW>=1)kW=1
else{
kH=(szCnt.cntH-th.defScrollObj.w)/szCnt.height
}
if(kH>=1)kH=1
else{
kW=(szCnt.cntW-th.defScrollObj.w)/szCnt.width
}

if(kW>1)kW=1
if(kH>1)kH=1

scaleKoefW=kW
scaleKoefH=kH
isScrollV=scaleKoefH<1.0
isScrollH=scaleKoefW<1.0
}

var scV=th.scaleScroll
if(th.scrollSprH)th.scrollSprH.setScrollKoefCnt(scaleKoefW)
if(th.scrollSprV)th.scrollSprV.setScrollKoefCnt(scaleKoefH)

//var vertScrollSize=isScrollV ? th.defScrollObj.w : 0
var horScrollSize=isScrollH ? th.defScrollObj.w : 0

var w2=th.defScrollObj.w*scV

if(th.scrollSprV){
th.scrollSprV.resize(contentHeight-(horScrollSize*scV))
th.scrollSprV.x=Math.round(contentWidth-w2)
}

if(th.scrollSprH){
th.scrollSprH.resize(contentWidth/*-(vertScrollSize*scV)*/)
th.scrollSprH.y=Math.round(contentHeight-w2)
}

}

checkRszTimer(){
var th=this
var n2=false

//if(th.scrollSprH)th.scrollSprH.setScrollKoefCnt(1)
//if(th.scrollSprV)th.scrollSprV.setScrollKoefCnt(1)

var szCnt1=th.getScaleScrollCntSize()
if(szCnt1 && th.timerRszLoader==null){
th.timerRszLoader=Timer.init(150,()=>{

var szCnt=th.getScaleScrollCntSize()
if(szCnt){
var w1=szCnt.width
var h1=szCnt.height
th.updScrollsCB()
if(w1==szCnt1.width && h1==szCnt1.height){
this.stop()
th.timerRszLoader=null
th.updSizeLoaderCB()
}
szCnt1.width=w1
szCnt1.height=h1
}

})
}

}


checkRszTimer2(){
var th=this
th.updSizeLoaderCB()
th.updScrollsCB()
var szCnt1=th.getScaleScrollCntSize()
if(szCnt1 && th.timerRszLoader==null){
th.timerRszLoader=Timer.init(150,()=>{
this.stop()
th.timerRszLoader=null
th.updSizeLoaderCB()
th.updScrollsCB()
})
}
}

updSizeLoaderCB(){
var th=this
if(th.lo && th.isUpdLoader){
var contentWidth=th.stageLoaderCntWH.width
var contentHeight=th.stageLoaderCntWH.height

/*var vertScrollSize=0
var horScrollSize=0
if(th.scrollSprV && th.scrollSprV.visible)vertScrollSize=th.scrollSprV.width
if(th.scrollSprH && th.scrollSprH.visible)horScrollSize=th.scrollSprH.height
*/
th.loaderContentSize.width=contentWidth//-vertScrollSize
th.loaderContentSize.height=contentHeight//-horScrollSize

//if(th.lo.width!=th.loaderContentSize.width || th.lo.height!=th.loaderContentSize.height){
th.lo.width=th.loaderContentSize.width
th.lo.height=th.loaderContentSize.height
th.lo.dispatchEvent({type:'resize',width:th.loaderContentSize.width,height:th.loaderContentSize.height})
//}
}
}

autoResize(){
var th=this
var sw=th.stage.stageWidth
var sh=th.stage.stageHeight

var borderSz=0
var isFS=th.isFullscreenV()
//if(th.stage.displayState=='normal'){
if(!isFS){
borderSz=th.borderSize
sh=sh-th.panelH
}

var gll=GLOBAL
var isUpd2=false
if(gll.BitmapDecoder && gll.BitmapDecoder.writeByteArray)isUpd2=true

var scaleKoefW=1
var scaleKoefH=1
var contentWidth=(sw-(borderSz*2))
var contentHeight=(sh-(borderSz*2))

th.stageLoaderCntWH.width=contentWidth
th.stageLoaderCntWH.height=contentHeight

th.loaderContentSize.width=contentWidth
th.loaderContentSize.height=contentHeight

//th.updScrollsCB()

//tf3.text=''+sw+', '+sh
var barClr=th.barColor
if(th.isBlackTheme)barClr=th.barColorBlack
th.borderSpr.resize(sw,sh-th.borderSpr.y)
//th.upPanel.bgSpr.scaleX=(sw-(th.borderSize*2))/th.upPanel.bgSpr.width
//th.upPanel.bgSpr.scaleY=th.panelH/th.upPanel.bgSpr.height
th.upPanel.bgSpr.painter.clear()
th.upPanel.bgSpr.painter.rect(0,0,sw-(th.borderSize*2),th.panelH,barClr)

/*if(th.upPanel.bgSpr.width>=sw && th.upPanel.bgSpr.height>=th.panelH){
th.upPanel.bgSpr.sourceRect={x:0,y:50,width:sw-(th.borderSize*2),height:th.panelH}
}else{
th.upPanel.bgSpr.scaleX=(sw-(th.borderSize*2))/th.upPanel.bgSpr.width
th.upPanel.bgSpr.scaleY=th.panelH/th.upPanel.bgSpr.height
}*/

th.upPanel.butRights.x=((sw-(th.borderSize*2))-th.upPanel.butRights.width)
th.upPanel.butRights.y=((th.panelH)-th.upPanel.butRights.height)/2
th.updPosTitle()
if(th.lo && th.isUpdLoader){
//th.loaderContentSize.width=Math.round((sw-(borderSz*2))*th.contentScale)
//th.loaderContentSize.height=Math.round((sh-(borderSz*2))*th.contentScale)
//th.loaderContentSize.width=Math.round((sw-(borderSz*2))/th.contentScale)
//th.loaderContentSize.height=Math.round((sh-(borderSz*2))/th.contentScale)
if(!isUpd2){
th.updScrollsCB()
th.updSizeLoaderCB()
}
}

if(isUpd2){
th.checkRszTimer2()
}else{
th.checkRszTimer()
}


}

checkBlackTheme(){
var th=this
if(th.cfgFileData && th.cfgFileData.isBlackTheme){
return true
}
/*var fi=new lang.io.File('storeCfg')
var isExt=fi.isFile()
if(isExt){
var ba=fi.readBytes()
if(ba && ba.length>0){
var ob=ba.readObject()
if(ob && ob.blackTheme)return true
}
}*/
return false
}

}