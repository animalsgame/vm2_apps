class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(screenScene){
var th=this
th.w=500
th.h=135
th.downPanelH=40
th.isLockClose=false
th.screenScene=screenScene
th.titleH=26
th.targetProps=null
th.thicknessSize=4
th.alphaColor=1
th.picker=null
th.cbTint=null
th.cbHex=null
th.ev=events()
th.selectCB=null
th.selectItem=null
th.thicknessCB=null
th.selectColor=0
th.bm=bitmap('birdMin')
th.bm.buttonMode=true
th.bg=rect(10,10,'#FEFEFE')
th.downPanel=sprite()
th.downPanelCnt=sprite()
th.downPanelCnt.x=8
th.downPanelCnt.y=6
th.downPanelBG=sprite()
th.downPanelBG.createPainter()
th.helpSpr=sprite()
th.helpBG=sprite()
th.helpBG.createPainter()
th.helpTitle=text('',{color:0xFFFFFF,bold:true})
th.helpTitle.y=4
th.spr=sprite()
th.spr2=sprite()
th.spr2.addChild(th.bg)
th.spr2.x=th.bm.width+4
addChild(th.spr)
th.helpSpr.y=-th.titleH
th.spr.addChild(th.bm,th.downPanel,th.spr2,th.helpSpr)
th.helpSpr.addChild(th.helpBG,th.helpTitle)
th.downPanel.addChild(th.downPanelBG,th.downPanelCnt)
th.downPanel.x=th.spr2.x
var itemsSpr=sprite()

var closeBut=bitmap('close')
closeBut.buttonMode=true
closeBut.y=6
closeBut.on('click',()=>{
if(th.screenScene && !th.isLockClose)th.screenScene.cancelScreenNoHide()
})
th.helpSpr.addChild(closeBut)

var setTooltip=(s)=>{
var w2=th.w//-(th.spr2.x*2)
closeBut.x=w2-(closeBut.width+10)
th.helpBG.painter.clear()
th.helpTitle.text=''
th.helpBG.painter.rect(0,0,w2,th.titleH,Config.borderColorV)
if(s){
th.helpTitle.text=s
th.helpTitle.x=(w2-th.helpTitle.width)/2
th.helpSpr.x=th.spr2.x+((th.w-w2)/2)
}
}

var selectItemCB=()=>{
var item=this.itemEl
if(item){
    
if(item==th.selectItem){
item=null
}
    
for (var i = 0; i < itemsSpr.numChildren; i++) {
var el=itemsSpr.getChildAt(i)
if(el.itemEl && el.bgSpr){
el.bgSpr.alpha=0
el.iconBM.tint=0
if(el.itemEl==item){
el.iconBM.tint=0xffffff
el.bgSpr.alpha=0.8
}
}
}

th.selectItem=item
if(th.selectCB)th.selectCB(item)
var titleV='Инструменты'
if(th.selectItem)titleV=th.selectItem.name
setTooltip(titleV)
}
}

var selectItemOverCB=()=>{
var item=this.itemEl
if(item && th.selectItem!=item){
this.alpha=0.5
}
}

var selectItemOutCB=()=>{
var item=this.itemEl
if(item && th.selectItem!=item){
this.alpha=0
}
}

itemsSpr.x=th.bm.width+10
th.helpSpr.x=th.spr2.x
itemsSpr.y=8

var itemW=70
var itemH=th.h-itemsSpr.y-8
var items=Config.itemsArr

var curColor='#FFFFFF'
var thicknessA=4
var itemW2=35

var colorPanel=sprite()
var tf3=text('цвет',{color:0})
tf3.y=4
var pickBG=sprite()
var fillSpr=sprite()
var brushRect=sprite()
brushRect.createPainter()
brushRect.buttonMode=true

var selectColor=(v,alp)=>{
if(alp===null)alp=1
if(v){
if(v is Number)v=decToHex(v)
brushRect.painter.clear()
brushRect.painter.border(thicknessA,0)
brushRect.painter.rect(0,0,itemW2-(thicknessA*2),itemW2-(thicknessA*2),v)

th.alphaColor=alp
th.selectColor=v
if(th.cbHex)th.cbHex(v)
//if(th.cbTint){
//var decc=hexToDec(v)
//th.cbTint(decc)
//}

}
}

if(curColor)selectColor(curColor,1)

brushRect.on('click',(e)=>{
var findWindow=$app.windowMaster.find('colorpicker')
if(findWindow){
findWindow.close()
}else{
$app.windowMaster.open('colorpicker',selectColor,th.targetProps)
}
})
fillSpr.addChild(brushRect)
pickBG.addChild(fillSpr)
pickBG.x=tf3.width+5

colorPanel.addChild(tf3,pickBG)

th.downPanelCnt.addChild(colorPanel)




// filter tint

var colorPanel=sprite()
var tf3=text('фильтр',{color:0})
tf3.y=4
var pickBG=sprite()
var fillSpr=sprite()
var brushRectTint=sprite()
brushRectTint.createPainter()
brushRectTint.buttonMode=true

var selectColorTint=(v)=>{
if(v){
if(v is Number)v=decToHex(v)
brushRectTint.painter.clear()
brushRectTint.painter.border(thicknessA,0)
brushRectTint.painter.rect(0,0,itemW2-(thicknessA*2),itemW2-(thicknessA*2),v)
if(th.cbTint){
var decc=hexToDec(v)
th.cbTint(decc)
}
}
}

if(curColor)selectColorTint(curColor,1)

brushRectTint.on('click',(e)=>{
var findWindow=$app.windowMaster.find('colorpickerFilter')
if(findWindow){
findWindow.close()
}else{
$app.windowMaster.open('colorpickerFilter',selectColorTint,th.targetProps)
}
})
fillSpr.addChild(brushRectTint)
pickBG.addChild(fillSpr)
pickBG.x=tf3.width+5

colorPanel.addChild(tf3,pickBG)

th.downPanelCnt.addChild(colorPanel)
colorPanel.x=120
//itemsSpr.addChild(colorPanel)

var sp6=sprite()
var tf4=text('размер',{color:0})
tf4.y=4
var thicknessSlider=hslider((v)=>{
th.thicknessSize=v
if(th.thicknessCB)th.thicknessCB(v)
},{min:th.thicknessSize,max:50,value:th.thicknessSize})
thicknessSlider.x=tf4.width+5
thicknessSlider.y=4
sp6.addChild(tf4,thicknessSlider)

th.downPanelCnt.addChild(sp6)

//hgroup(th.downPanelCnt,8)

var clrFill=decToHex(Config.borderColorV)
for (var i = 0; i < items.length; i++){
var el=items[i]
var sp=sprite()
sp.itemEl=el
var bgg=sprite()
bgg.createPainter()
bgg.painter.rectRound(0,0,itemW,itemH,clrFill,10)
//bgg.alpha=0.8
bgg.alpha=0
bgg.itemEl=el
var bmicon=bitmap(el.icon)
bmicon.tint=0
bmicon.mouseEnabled=false
bmicon.x=(itemW-bmicon.width)/2
bmicon.y=(itemH-bmicon.height)/2
bgg.on('click',selectItemCB)
bgg.on('rollover',selectItemOverCB)
bgg.on('rollout',selectItemOutCB)
sp.addChild(bgg,bmicon)
sp.bgSpr=bgg
sp.iconBM=bmicon
itemsSpr.addChild(sp)
}
th.spr.addChild(itemsSpr)


if(th.screenScene){
var butSpr2=sprite()
var tx4=text('Идёт загрузка...',{color:0})
tx4.x=6
tx4.y=8
tx4.visible=false
butSpr2.addChild(tx4)

var butSrv=null

th.cbSaveSrv=()=>{
if(th.screenScene && butSrv.visible){
//butSrv.isClickV=true
butSrv.visible=false
tx4.visible=true
th.isLockClose=true
th.screenScene.createScreen((res)=>{
//res='err'
th.isLockClose=false
if(res=='ok'){
if(th.screenScene)th.screenScene.removeScene()
System.gc()
$app.readyScreen()
}else{
butSrv.visible=true
tx4.visible=false
}
butSrv.visible=true
})
//butSrv.isClickV=false
}
}

butSrv=button(Config.borderColorV,'получить ссылку',th.cbSaveSrv)

var butSave=button(Config.borderColorV,'сохранить на пк',()=>{
if(th.screenScene && !butSave.isClickV){
butSave.isClickV=true
th.screenScene.saveFile()
butSave.isClickV=false
}
},{w:butSrv.width})

var butOpenA=button(Config.borderColorV,'+ изображение',()=>{
var fsState=null
if(!$app.isAutoFileRsz){
if(th.stage.displayState!='normal')fsState='full'
}
if(fsState)th.stage.displayState='normal'

System.openFileDialog((fi)=>{
if(th.screenScene)th.screenScene.addImageFile(fi)
})
if(fsState && fsState=='full'){
th.stage.displayState='fullscreen'
}
},{w:butSrv.width})
butSave.y=butSrv.height+5

butOpenA.y=butSave.y+butSave.height+5

butSpr2.addChild(butSrv,butSave,butOpenA)
itemsSpr.addChild(butSpr2)
}

hgroup(itemsSpr,4)

var _stage=th.stage
th.bm.on('mousedown',(e)=>{
var pos=mousePos(_stage,e)
pos.x=pos.x-th.spr.x
pos.y=pos.y-th.spr.y

var dw=th.spr.width
var dh=th.spr.height-th.titleH

th.ev.on(_stage,'mousemove',(e)=>{
var pos2=mousePos(_stage,e)
var xx=pos2.x-pos.x
var yy=pos2.y-pos.y
if(xx<0)xx=0
if(yy<0)yy=0
if(xx+dw>$app.stageScale.w)xx=$app.stageScale.w-dw
if(yy+dh>$app.stageScale.h)yy=$app.stageScale.h-dh
th.spr.x=xx
th.spr.y=yy
})
th.ev.on(_stage,'mouseup',(e)=>{th.ev.clear()})
})

th.w=itemsSpr.width+16
th.bm.y=(th.h-th.bm.height)/2

sp6.x=th.w-(sp6.width+30)

var selectItemType=(t)=>{
for (var i = 0; i < itemsSpr.numChildren; i++) {
var el0=itemsSpr.getChildAt(i)
if(el0 && el0.bgSpr){
var itemV=el0.bgSpr.itemEl
if(itemV && itemV.type==t){
selectItemCB.apply(el0)
}
}
}
}

th.selectItemType=selectItemType

selectItemType('select')
/*if(itemsSpr.numChildren>0){
var el0=itemsSpr.getChildAt(0)
if(el0 && el0.bgSpr){
selectItemCB.apply(el0)
}
}*/

th.resize(th.w,th.h)
}

resize(w,h){
var th=this
th.w=w
th.h=h
th.spr.x=($app.stageScale.w-w)/2
th.spr.y=($app.stageScale.h-h)-th.downPanelH-20
th.bg.painter.clear()
th.bg.painter.border(8,Config.borderColorV)
th.bg.painter.rect(0,0,w,h,th.bg.painter.fillV)

th.downPanelBG.painter.clear()
th.downPanelBG.painter.border(8,Config.borderColorV)
th.downPanelBG.painter.rect(0,0,w,th.downPanelH,th.bg.painter.fillV)
th.downPanel.y=h-3
}

remove(){
this.ev.clear()
this.cbTint=null
this.cbHex=null
this.selectCB=null
this.screenScene=null
this.thicknessCB=null
}

}