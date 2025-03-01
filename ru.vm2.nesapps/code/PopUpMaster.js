class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
this.w=0
this.h=0
this.popupMinSize={width:300,height:200}
this.obj={}
this.cnt=new lang.display.Sprite
addChild(this.cnt)
}


reg(name,title,cb,props){
var th=this
if(name && cb){
if((name in th.obj)==false){
var res={name:name,title:title,cb:cb,props:props}
th.obj[name]=res
}
}
}

init(){
var th=this

th.reg('settinsJoyKeys','Управление',()=>{
var cnt2=new lang.display.Sprite
var keysSpr=new lang.display.Sprite
var allW=this.width
var allH=this.height
var ev=new lang.events.EventsObjectMaster
var keyObj=$app.curJoyKeysOrig
var yy=0
var keysArr=['LEFT','RIGHT','UP','DOWN','A','B','START','SELECT','SAVE','RESTORE']
var titleKeys={LEFT:'влево',RIGHT:'вправо',UP:'вверх',DOWN:'вниз'}
var tableCfg={width:allW-6,lineH:28,nums:0,numsTable:3}
tableCfg.nums=keysArr.length

var columnW=Math.ceil(tableCfg.width/tableCfg.numsTable)

var redrawKeys=null
var lastTxtKeyClick=null

var clickChangeKey=()=>{
var th2=this
var tt=this.keyType
if(tt && !th2.isClickV){
if(lastTxtKeyClick){
lastTxtKeyClick.text='(изменить)'
lastTxtKeyClick.isClickV=false
lastTxtKeyClick.x=(columnW*2)+(columnW-lastTxtKeyClick.width)/2
}
th2.isClickV=true
lastTxtKeyClick=th2
th2.text='<нажмите клавишу>'
th2.x=(columnW*2)+(columnW-th2.width)/2
ev.clear()
ev.on(th.stage,'keyup',(e)=>{
var key=e.keyCode
if(key>0){
ev.clear()
keyObj[tt]=key
$app.setKeysJoy(keyObj)
redrawKeys()
$app.cfgObjData.joy=keyObj
$app.saveCfg()
}
})
}
}

var createTable=(w,h,nums)=>{
var bgMain='#FFFFFF'
var bgTwo='#F2F2F2'
var borderBG='#DDDDDD'
var borderSize=1
var sp=new lang.display.Sprite
var numsTable=3
var columnW=Math.ceil(w/numsTable)
var columnH=h
var w2=columnW*numsTable
var h2=columnH*nums

var bg=new lang.display.Sprite
bg.createPainter()
sp.addChild(bg)

for (var i = 0; i < nums; i++){
var clr=bgMain
if(i%2==1)clr=bgTwo
bg.painter.rect(0,i*columnH,w2,columnH,clr)
bg.painter.rect(0,i*columnH,w2,borderSize,borderBG)
}
bg.painter.rect(0,nums*columnH,w2,borderSize,borderBG)

for (var i = 0; i < numsTable+1; i++){
bg.painter.rect(i*columnW,0,borderSize,h2,borderBG)
}
return sp
}


var addKey=(type)=>{
var title=type
var sp=new lang.display.Sprite
if(type in titleKeys)title=titleKeys[type]
var code=0
if(type in keyObj)code=keyObj[type]
var tx=$app.text(title,{color:0,fontSize:18,bold:false})
var tx3=$app.text('клавиша '+code,{color:0,fontSize:18,bold:false})
var tx4=$app.text('(изменить)',{color:0xad209b,fontSize:18,bold:false})
tx4.buttonMode=true
tx4.on('click',clickChangeKey)
tx4.keyType=type
tx.x=(columnW-tx.width)/2
tx3.x=(columnW+4)+(columnW-tx3.width)/2
tx4.x=(columnW*2)+(columnW-tx4.width)/2
tx.y=6
tx3.y=tx.y
tx4.y=tx.y-1
sp.addChild(tx,tx3,tx4)
sp.y=yy
yy=yy+tableCfg.lineH
keysSpr.addChild(sp)
}

redrawKeys=()=>{
yy=0
keysSpr.removeAllChilds()
for (var i = 0; i < keysArr.length; i++)addKey(keysArr[i])
}

var tbl=createTable(tableCfg.width,tableCfg.lineH,tableCfg.nums)
tbl.x=5
cnt2.addChild(tbl)
tbl.addChild(keysSpr)

redrawKeys()

yy+=8

var s='SAVE - сохранение игры<br />RESTORE - восстановление игры'
var arr=s.split('<br />')

if(arr){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
var tx=$app.text(el,{color:0x3083A7,fontSize:16})
tx.x=(allW-tx.width)/2
tx.y=yy
yy=yy+tx.height+4
cnt2.addChild(tx)
}
}

var tx=$app.text('сбросить управление',{color:0xad209b,fontSize:16})
tx.x=(allW-tx.width)/2
tx.y=yy
tx.buttonMode=true
tx.on('click',()=>{
$app.setKeysJoyDef()
th.close('settinsJoyKeys')
})
cnt2.addChild(tx)

cnt2.destroyCB=()=>{
ev.clear()
}

return cnt2
},{width:550,height:400})

th.reg('appHelp','Помощь',()=>{
var cnt2=new lang.display.Sprite
var allW=this.width
var s='Управление с помощью клавиш со стрелками.<br />ESC = возврат в меню.<br /><br />Кнопки:<br />A = клавиша A<br />B = клавиша S<br />START = клавиша ENTER<br />SELECT = клавиша пробел<br />'
var arr=s.split('<br />')
var yy=0

if(arr){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
var tx=$app.text(el,{color:0,fontSize:16})
tx.x=(allW-tx.width)/2
tx.y=yy
yy=yy+tx.height+4
cnt2.addChild(tx)
}
}
return cnt2
},{width:400})

th.reg('settings','Настройки',()=>{
var cnt2=new lang.display.Sprite
var maxVol=100
var vol=$app.nesVolume
var yy=0
var panelSize=this
var volSliderW=100
var speedSliderW=100
var volSpr=new lang.display.Sprite


var dispTypeSpr=new lang.display.Sprite
dispTypeSpr.y=5
var sprSelectDisp=new lang.display.Sprite
var radioButtonsDisp=new lang.display.Sprite
var tx1=$app.text('Экран',{color:0,fontSize:16})
sprSelectDisp.x=tx1.width+18
dispTypeSpr.addChild(tx1,sprSelectDisp)
sprSelectDisp.addChild(radioButtonsDisp)

var lastDisplayType=$app.dispType

var createRadioBut=(name,o,cb)=>{
var sp=new lang.display.Sprite
var clr1='#44dcdf'
var clr2='#FFFFFF'
var circleSize=6
var isFirst=true
var tx0=$app.text(name,{color:0,fontSize:16})
tx0.buttonMode=true
tx0.on('click',()=>{if(cb)cb(sp)})
var radioSpr=new lang.display.Sprite
radioSpr.createPainter()
tx0.x=10
radioSpr.y=9
radioSpr.buttonMode=true
radioSpr.on('click',()=>{if(cb)cb(sp)})
sp.addChild(radioSpr,tx0)
sp.dObj=o
sp.radioSpr=radioSpr
sp.checked=false
sp.setSelected=(v,noupd)=>{
sp.checked=v
var clrV=clr2
if(v)clrV=clr1
radioSpr.painter.clear()
radioSpr.painter.border(1,0)
radioSpr.painter.circle(0,0,circleSize,clrV)
if(cb && !isFirst){
if(v && !noupd)cb(sp)
}
isFirst=false
}
sp.setSelected(false)
return sp
}


var selectNesDisplay=(v)=>{
for (var i = 0; i < radioButtonsDisp.numChildren; i++) {
var d=radioButtonsDisp.getChildAt(i)
d.setSelected(d.dObj.dType==v,true)
}
}

var clickRadioBut=(ob)=>{
if(ob.dObj){
var tt=ob.dObj.dType
if(tt!=lastDisplayType){
lastDisplayType=tt
$app.dispType=tt
$app.cfgObjData.dispType=tt
$app.saveCfg()
selectNesDisplay(tt)
$app.autoResize()
}
}
}

var tx0=createRadioBut('с масштабом',{dType:0},clickRadioBut)
var tx1=createRadioBut('растянуть',{dType:1},clickRadioBut)
var tx2=createRadioBut('настоящий',{dType:2},clickRadioBut)

radioButtonsDisp.addChild(tx0,tx1,tx2)

var x3=0
for (var i = 0; i < radioButtonsDisp.numChildren; i++) {
var d=radioButtonsDisp.getChildAt(i)
d.x=x3
x3=x3+d.width+15
}


/*var tx0=$app.text('с масштабом',{color:0,fontSize:16})
tx0.dType=0
var tx1=$app.text('растянуть',{color:0,fontSize:16})
tx1.dType=1
var tx2=$app.text('настоящий',{color:0,fontSize:16})
tx2.dType=2

var arr5=[tx0,tx1,tx2]

var selectNesDisplay=(v)=>{
for (var i = 0; i < arr5.length; i++) {
var d=arr5[i]
d.color=(d.dType==v) ? 0xad209b : 0
}
}

var clickDispType=()=>{
var tt=this.dType
if(tt!=lastDisplayType){
lastDisplayType=tt
$app.dispType=tt
selectNesDisplay(tt)
$app.autoResize()
}
}

var x3=0
for (var i = 0; i < arr5.length; i++) {
var el=arr5[i]
el.buttonMode=true
el.on('click',clickDispType)
sprSelectDisp.addChild(el)
el.x=x3
x3=x3+el.width+8
}*/

dispTypeSpr.x=(panelSize.width-dispTypeSpr.width)/2
cnt2.addChild(dispTypeSpr)
selectNesDisplay($app.dispType)
yy+=30

var tx1=$app.text('громкость',{color:0,fontSize:16})
tx1.x=5
var volumeSlider=$app.createSlider((k)=>{
vol=Math.floor(k*100)
if(vol<0)vol=0
if(vol>100)vol=100
$app.setNesVolume(vol)
})

volumeSlider.resize(volSliderW)
volumeSlider.setValue(vol/maxVol)
volumeSlider.x=volSliderW+5
volumeSlider.y=5
volSpr.addChild(tx1,volumeSlider)

volSpr.x=(panelSize.width-volSpr.width)/2
volSpr.y=yy
cnt2.addChild(volSpr)

yy+=20

if('audioSync' in $app.nes){
var speedObj={min:0.4,max:2}
var speedSpr=new lang.display.Sprite
var tx1=$app.text('скорость эмулятора',{color:0,fontSize:16})
tx1.x=5

var speedSlider=$app.createSlider((k)=>{
var val=speedObj.min+(speedObj.max-speedObj.min)*k
if($app.nes)$app.nes.speed=val
})


var updPosSpeedSlider=()=>{
var spCur=1
if('speed' in $app.nes)spCur=$app.nes.speed
var speedKoefPos=(spCur-speedObj.min)/(speedObj.max-speedObj.min)
speedSlider.setValue(speedKoefPos)
}

speedSlider.resize(speedSliderW)

speedSlider.x=tx1.width+18
speedSlider.y=5
updPosSpeedSlider()

var tx4=$app.text('сбросить',{color:0x1531AE,fontSize:16})
tx4.buttonMode=true
tx4.on('click',()=>{
if($app.nes){
$app.nes.speed=1
updPosSpeedSlider()
}
})
tx4.x=speedSlider.x+speedSliderW+8
speedSpr.addChild(tx1,speedSlider,tx4)

speedSpr.x=(panelSize.width-speedSpr.width)/2
speedSpr.y=yy
cnt2.addChild(speedSpr)

yy+=25


var txSettingsJoy=$app.text('настроить управление',{color:0xad209b,fontSize:16})
txSettingsJoy.buttonMode=true
txSettingsJoy.on('click',()=>{
th.open('settinsJoyKeys')
})
txSettingsJoy.x=(panelSize.width-txSettingsJoy.width)/2
txSettingsJoy.y=yy
cnt2.addChild(txSettingsJoy)

yy+=20

var syncAudioSpr=new lang.display.Sprite

var syncAudioSpr2=new lang.display.Sprite
syncAudioSpr2.y=30

var tx2=$app.text('синхронизация звука (привязка к fps)',{color:0,fontSize:16,align:'center',allW:panelSize.width})
tx2.y=8
var syncAudioFPS=new lang.display.Sprite
var syncAudioV=new lang.display.Sprite
syncAudioV.y=20
var tf2=$app.text('с fps (звук может заикаться)',{fontSize:15,color:0,align:'center',allW:panelSize.width})
tf2.syncTypeV=0
tf2.buttonMode=true
syncAudioFPS.addChild(tf2)

var tf3=$app.text('без fps (звук может отличаться, но игры работают быстрее)',{fontSize:15,color:0,align:'center',allW:panelSize.width})
tf3.syncTypeV=1
tf3.buttonMode=true
syncAudioV.addChild(tf3)

syncAudioSpr2.addChild(syncAudioFPS,syncAudioV)

var arr2=[tf2,tf3]

var selectSyncAudio=(v)=>{
for (var i = 0; i < arr2.length; i++) {
var d=arr2[i]
d.color=(d.syncTypeV==v) ? 0x0E9925 : 0
}
$app.nes.audioSync=v
}

tf2.on('click',()=>{
selectSyncAudio(0)
})
tf3.on('click',()=>{
selectSyncAudio(1)
})

selectSyncAudio($app.nes.audioSync)

syncAudioSpr.addChild(tx2,syncAudioSpr2)
syncAudioSpr.y=yy
//syncAudioSpr.x=(panelSize.width-syncAudioSpr.width)/2
cnt2.addChild(syncAudioSpr)
}

yy+=70

var tx2=$app.text('это окно можно вызвать нажав U во время игры',{color:0x3083A7,fontSize:16,align:'center',allW:panelSize.width})
tx2.y=yy
//tx2.y=panelSize.height-(tx2.height+5)
cnt2.addChild(tx2)

if($app.isSupSave){
//s2+='\nдля сохранения игры нажмите B\nдля восстановления игры нажмите R'
var tx3=$app.text('для сохранения во время игры нажмите B',{color:0x3083A7,fontSize:16,align:'center',allW:panelSize.width})

yy=yy+tx2.height

tx3.y=yy
cnt2.addChild(tx3)

var tx4=$app.text('для загрузки сохранения во время игры нажмите R',{color:0x3083A7,fontSize:16,align:'center',allW:panelSize.width})
yy=yy+tx3.height

tx4.y=yy
cnt2.addChild(tx4)
}

return cnt2
},{width:500,height:280})

}

open(name){
var th=this
var popupInfo=null
if(name){
if(name in th.obj)popupInfo=th.obj[name]
if(popupInfo){
var pp=th.findPopupByName(name)
if(pp==null){
var titleH=40
var margin=5
var titleTxt=''
if(popupInfo.title)titleTxt=popupInfo.title

var resWH={width:0,height:0}
var panelSize={width:0,height:0}
var propsObj=popupInfo.props

if(propsObj){
if('width' in propsObj && propsObj.width>0)panelSize.width=propsObj.width
if('height' in propsObj && propsObj.height>0)panelSize.height=propsObj.height
}

var spr=new lang.display.Sprite
var cntM=new lang.display.Sprite
var cnt2=new lang.display.Sprite

cnt2.x=margin

var args=[]
var ob={}
for (var i=1; i<arguments.length; i++)args.push(arguments[i])

panelSize.width=Math.max(panelSize.width,resWH.width,th.popupMinSize.width)
panelSize.height=Math.max(panelSize.height,resWH.height,th.popupMinSize.height)

ob.width=panelSize.width-(cnt2.x)
ob.height=panelSize.height-(titleH+margin)

var cntRes=popupInfo.cb.apply(ob,args)
if(cntRes){
resWH.width=Math.max(panelSize.width,cntRes.width,th.popupMinSize.width)
resWH.height=Math.max(panelSize.height,cntRes.height,th.popupMinSize.height)
cnt2=cntRes
spr.cntData=cntRes
}

panelSize.width=Math.max(resWH.width,th.popupMinSize.width)
panelSize.height=Math.max(resWH.height,th.popupMinSize.height)

cnt2.y=titleH+margin

var titleSpr=new lang.display.Sprite
titleSpr.x=2
titleSpr.y=2
spr.cntSize=panelSize
spr.popupInfo=popupInfo
spr.cntSpr=cntM

var bg=$app.rect(1,1,'#000000')
var bg2=$app.rect(1,1,'#FFFFFF')
bg.alpha=0.2
bg2.painter.clear()
bg2.painter.border(4,0)
bg2.painter.rect(0,0,panelSize.width,panelSize.height,'#FFFFFF')
var bgTitle=$app.rect(panelSize.width-(titleSpr.x*2),titleH,'#3083A7')

spr.bgSpr=bg

var tf1=$app.text(titleTxt,{fontSize:18,align:'center',allW:panelSize.width})
tf1.y=(titleH-tf1.height)/2

var butClose=$app.text('закрыть',{color:0xFFFF00,fontSize:16})
butClose.x=panelSize.width-(butClose.width+8)
butClose.y=11
butClose.buttonMode=true
butClose.on('click',()=>{
th.close(name)
})

titleSpr.addChild(bgTitle,tf1,butClose)

if(name=='settings'){
var butHelp=$app.text('помощь',{color:0x00FFFF,fontSize:16})
butHelp.x=6
butHelp.y=11
butHelp.buttonMode=true
butHelp.on('click',()=>{
th.open('appHelp')
})
titleSpr.addChild(butHelp)
}

cntM.addChild(bg2,titleSpr,cnt2)

spr.addChild(bg,cntM)
th.rszPopup(spr)
th.cnt.addChild(spr)
}
}
}

}

findPopupByName(name){
var th=this
if(name){
for (var i = 0; i < th.cnt.numChildren; i++) {
var d=th.cnt.getChildAt(i)
if(d && d.popupInfo && d.popupInfo.name==name)return d
}
}
return null
}

close(name){
var th=this
if(name){
var pp=th.findPopupByName(name)
if(pp && pp.cntData){
if(pp.cntData.destroyCB){
pp.cntData.destroyCB()
pp.cntData.destroyCB=null
}
pp.cntData=null
}
if(pp && pp.parent)pp.parent.removeChild(pp)
}
}

autoResize(){
var th=this
th.resize(th.w,th.h)
}

rszPopup(d){
var th=this
if(d){
if(d.bgSpr){
d.bgSpr.painter.clear()
d.bgSpr.painter.rect(0,0,th.w,th.h,'#000000')
}
if(d.cntSpr){
d.cntSpr.x=(th.w-d.cntSize.width)/2
d.cntSpr.y=(th.h-d.cntSize.height)/2
}
}
}

resize(w,h){
var th=this
th.w=w
th.h=h

for (var i = 0; i < th.cnt.numChildren; i++) {
var d=th.cnt.getChildAt(i)
if(d)th.rszPopup(d)
}

}

}