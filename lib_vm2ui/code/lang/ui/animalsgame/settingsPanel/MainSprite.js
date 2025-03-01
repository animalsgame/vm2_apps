class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(mainObj){
var th=this
//VM.setGlobal('$playerSettings',this)
var clName=System.getClassName(this)
var spl=clName.split('.')
if(spl.size>0){
spl.pop()
clName=spl.join('.')
}

this.cc=System.getDefinitionByName(clName)

this.header=new th.cc.mainHeader(this)

var urlObj=stage.loaderInfo.parameters
this.updTextStage=null
this.bgColor='#3083A7'
this.bg=new lang.display.Sprite
this.bg.createPainter()
this.cnt=new lang.display.Sprite
this.cnt.y=this.header.headerH
this.scenesMaster=new th.cc.ScenesMaster(th)
this.cnt.addChild(this.scenesMaster)
addChild(this.bg,this.cnt)

addChild(this.header)
this.cbResize=(e)=>{th.autoResize()}
stage.on('resize',this.cbResize)
this.scenesMaster.clear()
this.header.init1()
//this.scenesMaster.navSceneHome()
}

removePanel(){
runtime.curSettingsScene=null
this.scenesMaster.clear()
if(this.parent!=null)this.parent.removeChild(this)
this.stage.off('resize',this.cbResize)
}

autoResize(){
var sz=MainUI.getStageSize()
var w=sz.width
var h=sz.height
var cntH=h-this.cnt.y-24
this.header.resize(w,h)
this.bg.painter.clear()
this.bg.painter.rect(0,0,w,h,this.bgColor)
//this.bg.painter.rect(0,this.cnt.y,w,cntH,'#F9F9F9')
this.cnt.width=w
this.cnt.height=cntH
this.bg.painter.rect(0,this.cnt.y,w,cntH,'#F9F9F9')
//this.cnt.scroll=true
this.scenesMaster.resize(w,cntH)

if(this.updTextStage)this.updTextStage.text='сцена: '+w+'x'+h

}

}


class UICheckboxSpr extends lang.display.Sprite{
    UICheckboxSpr(ob,flags,txt,vv,cb){
        this.spr=new lang.display.Sprite
        addChild(this.spr)
        this.flags=flags
        var tx=new lang.text.TextField
        tx.color=0
        tx.fontName='Arial'
        tx.fontSize=19
        tx.bold=false
        tx.text=''+txt
        tx.x=26
        //tx.y=1
        var b1=new ob.cc.CheckBox
        b1.selected=vv
        b1.callback=(v)=>{
            if(cb!=null)cb(v,flags)
        }
        tx.on('click',(e)=>{
        b1.selected=(b1.selected==true) ? false : true
        })
        this.b1=b1
        this.spr.addChild(b1,tx)
    }
}



class CheckBox extends lang.display.Sprite{

CheckBox(cb){
var th=this
this._isSelected=false
this.callback=cb
var w=25
var h=25
this.clrActive='#4BAAD3'
this.w=w
this.h=h
var q=new lang.display.Sprite
q.mouseChildren=false
var p1=new lang.display.Painter
var p2=new lang.display.Painter
var spr=new lang.display.Sprite
spr.alpha=0.8
p1.setTarget(spr)
p1.rect(0,0,w-5,h-5,'#000000')
q.addChild(spr)
var spr2=new lang.display.Sprite
spr2.x=(w-(w-5))/2
spr2.y=(h-(h-5))/2
q.addChild(spr2)
p2.setTarget(spr2)
this.p2=p2
this.redraw()
addChild(q)
q.on('click',(e)=>{th._selectFunc()})
}

set selected(v){
var v1=this._isSelected
if(v!=v1){
if(this.callback!=null)this.callback(v)
}
this._isSelected=v
this.redraw()
}

get selected(){
return this._isSelected
}

_selectFunc(){
var lastV=this._isSelected
this._isSelected=(this._isSelected==true) ? false : true
if(lastV!=this._isSelected){
if(this.callback!=null)this.callback(this._isSelected)
}
this.redraw()
}

redraw(){
var th=this
this.p2.clear()
var color=(this._isSelected==true)? th.clrActive : '#FFFFFF'
this.p2.rect(0,0,this.w-9,this.h-9,color)
}

}


class ScenesMaster extends lang.display.Sprite{

ScenesMaster(ob){
this.ob=ob
this.curScene=null
}

clear(){
while(this.numChildren>0){
var el=this.getChildAt(0)
el.parent.removeChild(el)
if('removeScene' in el)el.removeScene()
}
this.curScene=null
}

navSceneHome(){
clear()
var c=new this.ob.cc.SceneHome(this.ob)
this.curScene=c
addChild(c)
this.ob.autoResize()
}

navSceneInfo(){
clear()
var c=new this.ob.cc.SceneInfo(this)
this.curScene=c
addChild(c)
this.ob.autoResize()
}

resize(w,h){
for (var i = 0; i < this.numChildren; i++) {
var el=this.getChildAt(i)
if('resize' in el)el.resize(w,h)
}
}
}





class mainHeader extends lang.display.Sprite{

mainHeader(ob){
var th=this
this.ob=ob
this.isInit=false
this.selectable=false
this.mSpr=new lang.display.Sprite
this.mSpr.y=2
this.mSpr.createPainter()
addChild(this.mSpr)    
    
var spr=new lang.display.Sprite
spr.createPainter()
this.mSpr.addChild(spr)
this.spr=spr

this.fsSprBG=new lang.display.Sprite
this.fsSprBG.createPainter()
addChild(this.fsSprBG)

this.headerH=50
this.footerH=24

var footerCont=new lang.display.Sprite
this.footerCont=footerCont
addChild(footerCont)
var footerSpr=new lang.display.Sprite
footerSpr.createPainter()
footerCont.addChild(footerSpr)
this.footerSpr=footerSpr

var txtFooter=new lang.text.TextField
txtFooter.width=230
txtFooter.fontName='Arial'
txtFooter.fontSize=18
txtFooter.bold=true
txtFooter.color=0xFFFFFF
if(System.platform.type=='web'){
txtFooter.text='PlayerVM2'
}else{
txtFooter.text='Игровой центр'
}

this.txtFooter=txtFooter
footerCont.addChild(txtFooter)

this.activeMenuID=0

this.menuSpr=new lang.display.Sprite
this.mSpr.addChild(this.menuSpr)

this.menuSpr.x=120

/*this.closeButBM=new lang.display.Bitmap
this.closeButBM.src='https://animals-game.ru/images/remove-symbol.png'
this.closeButBM.buttonMode=true
this.closeButBM.y=15
this.closeButBM.on('click',(e)=>{
$playerSettings.removePanel()
})
addChild(this.closeButBM)*/

//this.menuSpr.y=2
}

hideMenu(){
this.menuSpr.visible=false
}

resetMenuID(){
this.activeMenuID=0
}

setActiveMenuID(id,isCb){
if(this.activeMenuID!=id){
this.ob.scenesMaster.clear()
for (var i = 0; i < this.menuSpr.numChildren; i++) {
var q=this.menuSpr.getChildAt(i)
if(q!=null){
var idd=q.msk1.menuID
if(idd==id){
q.setActive()
q.tf.color=0xFFFFFF
var cbb=q.msk1.el[2]
if(cbb!=null){
if(isCb==true)cbb()
}
}else{
q.tf.color=0xbadcea
q.noActive()
}
}
}
}
this.activeMenuID=id
}


init1(){
if(this.isInit==false){
var th=this    
    
var menuArr=[
[1,'Главное',()=>{
th.ob.scenesMaster.navSceneHome()
}]]

if(System.platform.type!='web'){
menuArr.push([5,'Информация',()=>{
th.ob.scenesMaster.navSceneInfo()
}])
}

menuArr.push([3,'Выход',()=>{
th.ob.removePanel()
}])

//menuArr.push([3,'Приложения',()=>{}])

var xx=0
for (var i = 0; i < menuArr.size; i++) {
var el=menuArr[i]

var mask1=new lang.display.Sprite
mask1.createPainter()
mask1.alpha=0
mask1.el=el
mask1.menuID=el[0]
mask1.buttonMode=true
var pp=new lang.display.Sprite
var sp=new lang.display.Sprite
pp.addChild(sp)

pp.msk1=mask1

sp.createPainter()
mask1.sp=sp
mask1.pp=pp
pp.sp=sp


var txt1=el[1]
var tf=new lang.text.TextField
tf.color=0xbadcea
tf.fontName='Arial'
tf.fontSize=18
tf.bold=true
tf.text=''+txt1

var marginMenu=8

var menuW=tf.width+(marginMenu*2)
var menuH=48

tf.x=(menuW-tf.width)/2
tf.y=(menuH-18)/2
pp.addChild(tf,mask1)
pp.x=xx

xx+=(menuW+1)

pp.tf=tf


pp.menuW=menuW
pp.menuH=menuH


mask1.painter.rect(0,0,menuW,menuH,'#000000')


mask1.on('click',(e)=>{
var idd=this.menuID
th.setActiveMenuID(idd,true)
})
mask1.on('rollover',(e)=>{
var idd=this.menuID
if(th.activeMenuID!=idd){
this.pp.setActive()  
}
})
mask1.on('rollout',(e)=>{
var idd=this.menuID
if(th.activeMenuID!=idd){
this.pp.noActive()
}
})

pp.setActive=()=>{
this.sp.painter.clear()
this.sp.painter.rect(0,0,this.menuW,this.menuH,'#235E78')
}
pp.noActive=()=>{
this.sp.painter.clear()
}

this.menuSpr.addChild(pp)
}

    
var bm=new lang.display.Bitmap
bm.x=9
bm.y=2
bm.src='https://ag6.ru/images/logo-vm2.png'
addChild(bm)


this.isInit=true

this.setActiveMenuID(1,true)
this.ob.autoResize()
}
}

resize(w,h){
var menuW=w-100
var countSprW=150

this.mSpr.x=(w-menuW)/2

//this.spr.painter.clear()
//this.spr.painter.rect(0,0,menuW,this.headerH-2,'#3a9ac4')

this.fsSprBG.painter.clear()
this.fsSprBG.painter.rect(0,0,50,50,this.ob.bgColor)
this.fsSprBG.x=w-50
this.footerSpr.painter.clear()
this.footerSpr.painter.rect(0,0,w,this.footerH,'#455a64')
this.footerCont.y=h-this.footerH
//this.closeButBM.x=w-40
this.txtFooter.x=10+(w-this.txtFooter.width)/2
this.txtFooter.y=4
}

}

class RenderSettingsDrawSpr1 extends lang.display.Sprite{

RenderSettingsDrawSpr1(){
this.bg1=new lang.display.Sprite
this.bg1.createPainter()
this.sp1=new lang.display.Sprite
addChild(this.bg1,this.sp1)
}

init(ob){
var th=this
var ww=320
var hh=250

this.sp1.x=25
this.sp1.y=50


var tff=new lang.text.TextField
tff.fontSize=16
tff.fontName='Arial'
tff.text='Отрисовка'
tff.color=0
tff.bold=true
tff.x=(ww-tff.width)/2
tff.y=2
addChild(tff)


var tff=new lang.text.TextField
tff.fontSize=16
tff.fontName='Arial'
tff.text='для сброса перезапустите программу'
tff.color=0x008500
tff.bold=true
tff.x=(ww-tff.width)/2
tff.y=20
addChild(tff)

this.bg1.painter.border(1,0xCCCCCC)
this.bg1.painter.rect(0,0,ww,hh,'#F9F9F9')

var drawText=1<<1
var drawBitmap=1<<2
var drawBitmapMC=1<<3
var runAnimationBMC=1<<4
var drawPainter=1<<5
var drawMask=1<<6
var enableDebug1=1<<7
var flagsV=drawText|drawBitmap|drawBitmapMC|runAnimationBMC|drawPainter|drawMask

//System.exec('setRenderDrawCfg',flags)

if('playerDrawCfgParams' in GLOBAL)flagsV=GLOBAL.playerDrawCfgParams


var paramsArr=[
['отладка',enableDebug1],['текст (TextField)',drawText],['графика (Bitmap)',drawBitmap],['графика (BitmapMovieClip)',drawBitmapMC],['анимация (BitmapMovieClip)',runAnimationBMC],['фигуры (Painter)',drawPainter],['маски',drawMask]
]

var y1=0

for (var i = 0; i < paramsArr.size; i++) {
var el=paramsArr[i]
var nm=el[0]
var mm=el[1]
var qq=new ob.cc.UICheckboxSpr(ob,mm,nm,(flagsV & mm)>0,(v,v2)=>{
if(v==true){
if((flagsV & v2)==0)flagsV|=v2
}else if((flagsV & v2)>0)flagsV&=~v2
th.saveFlags(flagsV)
})
qq.y=y1
y1+=24
this.sp1.addChild(qq)

}

if(System.platform.type=='pc'){

var cfgObjCl=new ob.cc.RenderColorModSpr1(ob.scenesMaster)

cfgObjCl.loadCfgFile()

var isMultithread=false
if('multithread' in cfgObjCl.cfgData){
if(cfgObjCl.cfgData.multithread=='1')isMultithread=true
}

var tm4=null
var curValMultithread='0'
var qq=new ob.cc.UICheckboxSpr(ob,'','многозадачность',isMultithread,(v)=>{
curValMultithread='0'
if(v)curValMultithread='1'
if(tm4==null){
tm4=Timer.init(200,()=>{
this.stop()
tm4=null
cfgObjCl.cfgData['multithread']=curValMultithread
cfgObjCl.saveCfgFile()
cfgObjCl.reloadVM2()
})
}
})
qq.y=y1
qq.b1.clrActive='#FF7400'
qq.b1.redraw()
y1+=24
this.sp1.addChild(qq)

}

//cfgObjCl.cfgData['multithread']='1'
//cfgObjCl.saveCfgFile()
//cfgObjCl.reloadVM2()



}

saveFlags(v){
VM.setGlobal('playerDrawCfgParams',v)
System.exec('setRenderDrawCfg',v)
}

}





class RenderColorModSpr1 extends lang.display.Sprite{

RenderColorModSpr1(){
this.filePath='PlayerConfig.txt'
this.isInit2=false
this.cfgData={}
this.bg1=new lang.display.Sprite
this.bg1.createPainter()
this.sp1=new lang.display.Sprite
addChild(this.bg1,this.sp1)
}

init(ob){
var th=this
var ww=240
var hh=200
this.isInit2=true
this.ww=ww
this.hh=hh

this.sp1.x=20
this.sp1.y=80

this.cfgData=th.readPlayerConfig()
//alert(JSON.encode(this.cfgData))

var tff=new lang.text.TextField
tff.fontSize=15
tff.fontName='Arial'
tff.text='Цветность (RGB формат)'
tff.color=0
tff.x=(ww-tff.width)/2
addChild(tff)

var yy=20

var tff=new lang.text.TextField
tff.fontSize=13
tff.fontName='Arial'
tff.text='центр может менять цветность'
tff.color=0x008500
tff.x=(ww-tff.width)/2
tff.y=yy
addChild(tff)

yy+=17

var tff=new lang.text.TextField
tff.fontSize=13
tff.fontName='Arial'
tff.text='укажите ниже числа от 0 до 255 (RGB)'
tff.color=0x008500
tff.x=(ww-tff.width)/2
tff.y=yy
addChild(tff)

yy+=17

var tff=new lang.text.TextField
tff.fontSize=13
tff.fontName='Arial'
tff.text='и нажмите сохранить'
tff.color=0x008500
tff.x=(ww-tff.width)/2
tff.y=yy
addChild(tff)

this.bg1.painter.border(1,0xCCCCCC)
this.bg1.painter.rect(0,0,ww,hh,'#F9F9F9')

this.inputArr=[]
var paramsArr=['R','G','B']
var colorsText=[['R - красный',0xFF0000],['G - зелёный',0x008500],['B - синий',0x265cae]]
var defColors=[255,255,255]
var defColors2=[255,200,100]
var defColorsReset=[255,255,255]
if('colorMod' in th.cfgData){
var colorModSpl=th.cfgData.colorMod.split(',')
if(colorModSpl.size>=3){
var rr=th.getColorValue(colorModSpl[0])
var gg=th.getColorValue(colorModSpl[1])
var bb=th.getColorValue(colorModSpl[2])

defColors[0]=rr
defColors[1]=gg
defColors[2]=bb

}
}

var y1=20
var inpW=40
for (var i = 0; i < paramsArr.size; i++) {
var el=paramsArr[i]
var qq=this.createTextInput(inpW,el)
this.inputArr.push(qq.ti)
qq.ti.value=defColors[i]
qq.x=(i*(inpW+30))
this.sp1.addChild(qq)
}


var sp2=new lang.display.Sprite
addChild(sp2)
sp2.x=5
sp2.y=this.sp1.y+25

var xx1=0

for (var i = 0; i < colorsText.size; i++) {
var el=colorsText[i]
var tx=el[0]
var clr=el[1]

var tf=new lang.text.TextField
tf.fontSize=13
tf.fontName='Arial'
tf.color=clr
tf.text=' '+tx
tf.x=xx1
xx1=xx1+tf.width+5
sp2.addChild(tf)

}


this.spr4=new lang.display.Sprite
addChild(this.spr4)

var tfSave1=new lang.text.TextField
tfSave1.fontSize=14
tfSave1.fontName='Arial'
tfSave1.color=0xFF0000
tfSave1.text='демо цвет'
tfSave1.x=((ww-80)-tfSave1.width)/2
tfSave1.y=hh-60
tfSave1.buttonMode=true
tfSave1.on('click',(e)=>{

for (var i = 0; i < defColors2.size; i++) {
var ti=th.inputArr[i]
ti.value=defColors2[i]
}

th.saveFunc()
})
this.spr4.addChild(tfSave1)


var tfSave2=new lang.text.TextField
tfSave2.fontSize=14
tfSave2.fontName='Arial'
tfSave2.color=0x008500
tfSave2.text='сброс'
tfSave2.x=60+(ww-tfSave2.width)/2
tfSave2.y=hh-60
tfSave2.buttonMode=true
tfSave2.on('click',(e)=>{
for (var i = 0; i < defColorsReset.size; i++) {
var ti=th.inputArr[i]
ti.value=defColorsReset[i]
}
th.saveFunc()
})
this.spr4.addChild(tfSave2)

var tfSave=new lang.text.TextField
tfSave.fontSize=16
tfSave.fontName='Arial'
tfSave.color=0x265cae
tfSave.text='Сохранить'
tfSave.x=(ww-tfSave.width)/2
tfSave.y=hh-30
tfSave.buttonMode=true
tfSave.on('click',(e)=>{
th.saveFunc()
})
this.spr4.addChild(tfSave)

}


createTextInput(w,nm){
var hh=22
var xx=20
var spr=new lang.display.Sprite
var bg=new lang.display.Sprite
bg.x=xx
bg.createPainter()
bg.painter.border(1,0)
bg.painter.rect(0,0,w,hh,'#FFFFFF')
spr.addChild(bg)

var tf=new lang.text.TextField
tf.fontName='Arial'
tf.fontSize=16
tf.text=nm
tf.y=1
spr.addChild(tf)

var ti=new lang.text.TextInput
ti.fontName='Arial'
ti.x=xx+5
ti.y=3
ti.fontSize=16
ti.width=w
ti.height=hh
spr.ti=ti
spr.addChild(ti)
return spr
}

getColorValue(v){
if(v is String)v=v as int
if(v<0)v=255
if(v>255)v=255
return v
}

getColorValueTI(ti){
var v=255
if(ti!=null){
v=ti.value as int
if(v<0)v=255
if(v>255)v=255
}
return v
}

loadCfgFile(){
var th=this
if(th.isInit2==false){
th.isInit2=true
th.cfgData=th.readPlayerConfig()
}
}

readPlayerConfig(){
var th=this
var ob={}
var fi=new lang.io.File(th.filePath)
var isExt=fi.exists()
if(isExt==true){
var ba=fi.readBytes()
if(ba!=null){
if(ba.size>0){
var ss=ba.readUTFBytes(ba.size)
if(ss!=null){
if(ss.size>0){
var spl=ss.split('\n')
for (var i = 0; i < spl.size; i++) {
var el=spl[i]
var pos1=el.indexOf(' ')
if(pos1>-1){
var key=el.cut(0,pos1)
var value=el.cut(pos1+1)
ob[key]=value
}
}
}
}
}
}
}
return ob
}


saveCfgFile(){
var th=this
var s=''
var n=0
var i=0
for(var q in th.cfgData)n+=1
for(var nn in th.cfgData){
var vv=th.cfgData[nn]
s+=''+nn+' '+vv
if(i!=n-1){
s+='\n'
}
i+=1
}
//alert(s)
var bb=new lang.utils.ByteArray
bb.writeUTFBytes(s)
bb.position=0
lang.utils.File.saveBytes(this.filePath,bb)
}

reloadVM2(obj){
var isMsg=true
if(obj && 'info' in obj)isMsg=obj.info
var runFile=MainUI.getAppByRestartVM2()
if(runFile){
if(isMsg){
alert('Игровой центр будет перезапущен.')
}
var rr=System.exec('runApp',runFile)
System.exit()
}else{
alert('Сохранено, перезапустите игровой центр')
}
}

saveFunc(){
var th=this
if(this.inputArr.size>=3){
var rVal=this.getColorValueTI(this.inputArr[0])
var gVal=this.getColorValueTI(this.inputArr[1])
var bVal=this.getColorValueTI(this.inputArr[2])

var ss=rVal+','+gVal+','+bVal
th.cfgData['colorMod']=ss

if(ss=='255,255,255'){
if('colorMod' in th.cfgData)delete th.cfgData['colorMod']
}

th.spr4.visible=false

th.saveCfgFile()

var tfSave=new lang.text.TextField
tfSave.fontSize=16
tfSave.fontName='Arial'
tfSave.color=0x265cae
tfSave.text='Сохранено!'
tfSave.x=(th.ww-tfSave.width)/2
tfSave.y=th.hh-50
th.addChild(tfSave)

Timer.init(3000,()=>{
this.stop()
th.spr4.visible=true
if(tfSave.parent!=null){
tfSave.parent.removeChild(tfSave)
}
})

//alert(ss)

}
}

}

class SceneHome extends lang.display.Sprite{

SceneHome(ob){
var th=this
this.selectable=false

this.monthsListMin=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']

this.cnt=new lang.display.Sprite
this.css({'text-align':'center','font-family':'Arial'})
addChild(this.cnt)
var sp=new lang.display.Sprite
sp.position='relative'
this.cnt.addChild(sp)
this.sp=sp
if(System.platform.type=='web'){
sp.html='<br /><div><span style="color:#ac26ae;font-size:18px;position:relative;">Панель управления VM2</span></div>'
}
this.tfRuntimeTm=new lang.text.TextField
this.tfRuntimeTm.fontSize=16
this.tfRuntimeTm.fontName='Arial'
this.tfRuntimeTm.bold=true
this.tfRuntimeTm.color=0

this.vmInfoSpr2=new lang.display.Sprite
this.vmInfoSpr2.width=200
this.vmInfoSpr=new lang.display.Sprite
this.vmInfoSpr.position='relative'
this.vmInfoSpr.createPainter()
this.vmInfoSpr.width=200
this.vmInfoSpr.height=230
this.vmInfoSpr.x=10

if(System.platform.type=='web'){
this.vmInfoSpr.html='<div><span style="color:#ac26ae;font-size:18px;position:relative;">о vm</span></div>'
this.vmInfoSpr.css({border:'1px solid #CCCCCC'})
}else{
this.vmInfoSpr.painter.border(1,0xCCCCCC)
this.vmInfoSpr.painter.rect(0,0,200,250,'#F9F9F9')
this.vmInfoSpr.y=5

var settingsDrawPanel=new ob.cc.RenderSettingsDrawSpr1
settingsDrawPanel.x=220
settingsDrawPanel.y=5
settingsDrawPanel.init(ob)
this.cnt.addChild(settingsDrawPanel)

/*var colorModPanel=new ob.cc.RenderColorModSpr1
colorModPanel.x=530
colorModPanel.y=5
colorModPanel.init(ob)
this.cnt.addChild(colorModPanel)*/

}
this.cnt.addChild(this.vmInfoSpr)

var str2=th.timestampToStrDate1(runtime.startTime)
var platformType=System.platform.type
var version='-'
if('platformVersion' in System.platform)version=''+System.platform.platformVersion
if(System.platform.type=='web'){
this.vmInfoSpr.html+='<div>версия:<span style="color:#ac26ae;">'+version+'</span></div><br />'
this.vmInfoSpr.html+='<div>запуск:<br /><span style="color:#26ae90;">'+str2+'</span></div><br />'
}else{
    
this.vmInfoSpr2.addChild(this.tfRuntimeTm)

var szStage=MainUI.getStageSize()

var stageSizeStr=''+szStage.width+'x'+szStage.height

var osName=null
var rendersInfo=System.exec('getRendersInfo')    
var yy1=0
if('os' in System.platform)osName=System.platform.os
var a2=[]
a2.push({title:'о vm',txt:'',color:0xac26ae})
if(osName){
a2.push({title:'os:',txt:osName,color:0xFF7400})
}
a2.push({title:'платформа:',txt:platformType,color:0x46A6CF})

if(rendersInfo && rendersInfo.active){
a2.push({title:'рендер:',txt:rendersInfo.active,color:0x26ae90})
}

a2.push({isType:2,title:'сцена:',txt:stageSizeStr,color:0x3DBA54})

a2.push({title:'версия:',txt:version,colorTitle:0,color:0xac26ae})
a2.push({title:'запуск:',txt:str2,colorTitle:0,color:0x26ae90,newLine:1})
a2.push({title:'работает',txt:'',color:0})
for (var i = 0; i < a2.size; i++) {
var el=a2[i]
var nm1=el.title
var nm2=el.txt
var txx=nm1+' '+nm2
var isNewLine=false
if('newLine' in el){
isNewLine=true
txx=nm1
}

var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0
tfA1.bold=true
if('isType' in el && el.isType==2){
ob.updTextStage=tfA1
}
if('color' in el)tfA1.color=el.color
if('colorTitle' in el)tfA1.color=el.colorTitle
tfA1.text=txx
tfA1.x=(200-tfA1.width)/2
tfA1.y=yy1
this.vmInfoSpr.addChild(tfA1)
yy1+=24

if(isNewLine==true){
yy1-=6
var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.bold=true
tfA1.color=0
if('color' in el)tfA1.color=el.color
tfA1.text=nm2
tfA1.x=(200-tfA1.width)/2
tfA1.y=yy1
this.vmInfoSpr.addChild(tfA1)
yy1+=24
}


}
yy1-=7
this.vmInfoSpr2.y=yy1
}

this.vmInfoSpr.addChild(this.vmInfoSpr2)

this.tm=Timer.init(1000,()=>{
th.updateVMTime()  
})
th.updateVMTime()
}


getMinMonthStr1(pos){
        return this.monthsListMin[pos];
    }
    
    funcCorrectZeroTm(v){
        if(v<10)return '0'+v
        return v
    }
    
    timestampToStrDate1(timestamp){
        var d=new Date()
        d.setTime(timestamp*1000)
        var datestr=''
        if(timestamp>0){
            var month=d.getMonth();
            var m1=this.getMinMonthStr1(month)
            var date=d.getDate()
            var year=d.getFullYear()
            var hours=d.getHours()
            var minutes=d.getMinutes()
            var secs=d.getSeconds()
            var cHours=funcCorrectZeroTm(hours)
            var cMinutes=funcCorrectZeroTm(minutes)
            var cSecs=funcCorrectZeroTm(secs)
            return ''+date+' '+m1+' '+year+' в '+cHours+':'+cMinutes+':'+cSecs
        }
        return 'нет данных о дате'
    }

updateVMTime(){
var ts=Date.getTimestamp()
    var tsRuntime=runtime.startTime
    var allTime=ts-tsRuntime
    var s1=this.toHourMinSecTxt2(allTime)
    if(System.platform.type=='web'){
     this.vmInfoSpr2.html='<div>работает<br />'+s1+'</div>'   
    }else{
    this.tfRuntimeTm.text=s1
    this.tfRuntimeTm.x=(200-this.tfRuntimeTm.width)/2
    }
}

removeScene(){
if(this.tm!=null){
this.tm.stop()
this.tm=null
}
}


toHourMinSecTxt2(v){
        //v=3705
        var seconds = Math.floor(v);
        var days = Math.floor(seconds / (60*60*24))
        seconds -= days*(60*60*24);
        var hours = Math.floor(seconds / (60*60))
        seconds -= hours*(60*60);
        var minutes = Math.floor(seconds / 60)
        seconds -= minutes*60
        var str=''
        if(days>0)str+=days+' д. '
        if(hours>0)str+=hours+' ч. '
        if(minutes>0)str+=minutes+' мин. '
        //if(seconds>0)
        str+=seconds+' сек.'
        return str
    }

resize(w,h){
this.sp.width=w
}

}




class SceneInfo extends lang.display.Sprite{

SceneInfo(sceneM){
var th=this
var txtH=23
this.sceneM=sceneM
this.isSoftwareView=false
this.rendersInfoSpr=new lang.display.Sprite
this.rendersInfoSpr.x=30
this.spr1=new lang.display.Sprite
this.spr1.x=30
addChild(this.rendersInfoSpr,this.spr1)

this.tfListSotware=new lang.text.TextField
this.tfAboutTxt=new lang.text.TextField
this.scrollSpr=null

var yy1=0
var tff=new lang.text.TextField
tff.fontSize=16
tff.fontName='Arial'
tff.bold=true
tff.text='Список рендеров'
tff.color=0
tff.x=(180-tff.width)/2
tff.y=yy1
yy1+=txtH
th.rendersInfoSpr.addChild(tff)

var rendersInfo=System.exec('getRendersInfo')
var renderTypeObj={direct3d11:5,opengl:4,direct3d:3}
if(rendersInfo!=null){
    
rendersInfo.list.sort((a,b)=>{
var p1=0
var p2=0
if(a in renderTypeObj)p1=renderTypeObj[a]
if(b in renderTypeObj)p2=renderTypeObj[b]
return p2-p1
})
    
var pos1=-1
for (var i = 0; i < rendersInfo.list.size; i++) {
var el=rendersInfo.list[i]
if(el==rendersInfo.active)pos1=i
}
    
    
var cb5=(nm)=>{
/*var ar=['opengl','direct3d','direct3d11']
for (var i = 0; i < ar.size; i++) {
var q=ar[i]
if(nm==q)return q
}
return null*/
return nm
}

var curRender=''
var cfgObjCl=new sceneM.ob.cc.RenderColorModSpr1(sceneM)
var cb6=(nm)=>{
if(nm!=curRender){
curRender=nm

cfgObjCl.loadCfgFile()

/*if(nm=='direct3d'){
if('renderer' in cfgObjCl.cfgData)delete cfgObjCl.cfgData['renderer']
}else{*/
cfgObjCl.cfgData['renderer']=nm
//}

cfgObjCl.saveCfgFile()
cfgObjCl.reloadVM2()

}
}
    
for (var i = 0; i < rendersInfo.list.size; i++) {
var el=rendersInfo.list[i]
var tff=new lang.text.TextField
tff.fontSize=18
tff.fontName='Arial'
tff.color=0
tff.bold=true
tff.renderNameV=el
var nm=''+(i+1)+': '+el
if(pos1==i){
nm+=' (текущий)'
tff.color=0x00CC00
curRender=el
}else{
var nm3=cb5(el)
tff.buttonMode=true
if(nm3!=null){
tff.on('click',()=>{
cb6(this.renderNameV)
})
}else{
tff.color=0xFF0000
tff.on('click',()=>{
alert('Этот рендер не рекомендуется ставить.')
})
}
}
tff.text=nm
//tff.x=(180-tff.width)/2
tff.y=yy1
yy1+=txtH
th.rendersInfoSpr.addChild(tff)
}
}



var tff=this.tfListSotware
tff.fontSize=18
tff.fontName='Arial'
tff.text='Показать список ПО'
tff.color=0x265cae
tff.bold=true
tff.x=(180-tff.width)/2
tff.y=yy1+50
tff.buttonMode=true
tff.on('click',(e)=>{
var sz=MainUI.getStageSize()
th.openListSoftware()
th.resize(sz.width,sz.height-72)
})
yy1+=txtH
addChild(tff)


var tff=this.tfAboutTxt
tff.fontSize=18
tff.fontName='Arial'
tff.text='О программе VM2'
tff.color=0x46A6CF
tff.bold=true
tff.x=(180-tff.width)/2
tff.y=yy1+70
tff.buttonMode=true
tff.on('click',(e)=>{
MainUI._createPopUpAbout()
})
yy1+=txtH
addChild(tff)

//alert(rendersInfo.list,rendersInfo.active)


}

openListSoftware(){
this.sceneM.ob.header.resetMenuID()
removeChild(this.tfListSotware)
removeChild(this.tfAboutTxt)
removeChild(this.rendersInfoSpr)
this.isSoftwareView=true

var arr=[
{name:'SDL2',txt:'рендеринг (отрисовка)',url:'https://www.libsdl.org'},
{name:'stb_image',txt:'чтение графики',url:'https://github.com/nothings/stb'},
{name:'cairo',txt:'рендеринг текста и фигур',url:'https://www.cairographics.org'},
{name:'Nano SVG',txt:'рендеринг векторной графики',url:'https://github.com/memononen/nanosvg'},
{name:'Box2D',txt:'физика в играх',url:'https://github.com/erincatto/Box2D'},
{name:'CURL',txt:'работа с web запросами',url:'https://curl.haxx.se'},
{name:'rapidJSON',txt:'JSON парсер',url:'https://github.com/Tencent/rapidjson'},
{name:'tinyxml',txt:'XML парсер',url:'https://sourceforge.net/projects/tinyxml'},
{name:'Boost',txt:'набор библиотек',url:'https://www.boost.org'},
{name:'OpenSSL',txt:'работа с SSL',url:'https://www.openssl.org'},
{name:'WebSocket++',txt:'вебсокеты',url:'https://github.com/zaphoyd/websocketpp'},
{name:'BASS',txt:'звук',url:'http://www.un4seen.com'},
{name:'SQLite',txt:'база данных',url:'https://www.sqlite.org'}
/*{name:'SDL2',txt:'рендеринг (отрисовка)',url:'https://www.libsdl.org'},
//{name:'SDL_image',txt:'чтение графики',url:'https://www.libsdl.org/projects/SDL_image'},
{name:'SDL_ttf',txt:'рендеринг ttf шрифтов',url:'https://www.libsdl.org/projects/SDL_ttf'},
{name:'Box2D',txt:'физика в играх',url:'https://github.com/erincatto/Box2D'},
{name:'CURL',txt:'работа с web запросами',url:'https://curl.haxx.se/download.html'},
{name:'rapidJSON',txt:'json парсер',url:'https://github.com/Tencent/rapidjson'},
{name:'tinyxml',txt:'xml парсер',url:'https://sourceforge.net/projects/tinyxml'},
{name:'Boost',txt:'набор библиотек',url:'https://www.boost.org'},
{name:'OpenSSL',txt:'работа с SSL',url:'https://www.openssl.org'},
{name:'WebSocket++',txt:'вебсокеты',url:'https://github.com/zaphoyd/websocketpp'},
{name:'BASS',txt:'звук',url:'http://www.un4seen.com'}*/
]
//arr.dup(10)

var columnNum=3
var columnW=170
var ww=columnW*columnNum
this.columnAllW=ww

this.msk1=new lang.display.Sprite
this.msk1.createPainter()

var sp=new lang.display.Sprite
this.spr1.addChild(this.msk1,sp)

var linesSpr=new lang.display.Sprite
linesSpr.createPainter()
sp.addChild(linesSpr)

this.spr1.mask=this.msk1
this.spr1.blendModeColor=0

this.scrollSpr=new lang.ui.VScrollBar1(sp)
addChild(this.scrollSpr)

var y1=0

for (var i = 0; i < arr.size; i++) {
var el=arr[i]
var tff=new lang.text.TextField
tff.fontSize=16
tff.fontName='Arial'
tff.color=0
tff.bold=true
var pos=i+1
tff.text=el.name
tff.x=(columnW-tff.width)/2
tff.y=y1

sp.addChild(tff)


var tff=new lang.text.TextField
tff.fontSize=16
tff.fontName='Arial'
tff.color=0
tff.bold=true
tff.text=el.txt
tff.x=columnW+(columnW-tff.width)/2
tff.y=y1
sp.addChild(tff)


var tff2=new lang.text.TextField
tff2.fontSize=16
tff2.fontName='Arial'
tff2.color=0x265cae
tff2.bold=true
tff2.text='сайт'
tff2.buttonMode=true
tff2.x=columnW+columnW+tff2.width+18//+tff.width
tff2.y=y1
tff2.urlV=el.url
sp.addChild(tff2)
tff2.on('click',(e)=>{
var urll=this.urlV
System.exec('open '+urll)
})

y1+=30

linesSpr.painter.rect(0,y1-8,ww,2,'#CCCCCC')


}

this.scrollSpr.setMaxValue(y1+30)

}

removeScene(){
if(this.scrollSpr!=null)this.scrollSpr.remove()
}

resize(w,h){
var th=this
this.rendersInfoSpr.x=(w-180)/2
this.tfListSotware.x=(w-this.tfListSotware.width)/2
this.tfAboutTxt.x=(w-this.tfAboutTxt.width)/2

if('columnAllW' in th){
    
this.msk1.painter.clear()
this.msk1.painter.rect(0,0,w,h,'#000000')
    
this.spr1.x=30+(w-th.columnAllW-50)/2

if(this.scrollSpr!=null){
this.scrollSpr.resize(13,h)
this.scrollSpr.x=this.spr1.x+th.columnAllW
}

}
}

}