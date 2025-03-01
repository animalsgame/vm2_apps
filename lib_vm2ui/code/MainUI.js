class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
}

static(){
var th=this
th.stageSizeCB=null
th.contentSpr=null
th.isV11=false
if('getMonitorInfo' in System)th.isV11=true
//alert('MUI')
/*var alertM=GLOBAL.alert
VM.setGlobal('alert',()=>{
var str=''
var sz=arguments.length
for (var i = 0; i < sz; i++) {
var vv=arguments[i]
str=str+vv
if(i!=sz-1)str+=' '
}
alertM.apply(null,arguments)
})*/

// для приложений где используется этот метод в Canvas классе, иначе вместо окна скриншота будет ошибка
lang.display.Canvas._createPopUpScreen=(bm)=>{
th.open('openScreenshot',[bm])
}

/*var sysExec=System.exec
System.exec=(v)=>{
var isNative=true
if(v){
if(v is String){
var spl=v.split(' ')
if(spl && spl.length>0){
var tt=spl.shift()
if(tt=='open'){
if(spl.length>0){
var urlV=spl.shift()
var pp=urlV.indexOf('https://ag6.ru/ss/')
if(pp==0){
isNative=false
alert('ok')
}
}
}
}
}
}

if(isNative){
var vv=sysExec.apply(this,arguments)
return vv
}
//alert(v)
}*/

}

getStageSize(){
var ob=null
var w=0
var h=0

if(this.stageSizeCB){
ob=this.stageSizeCB()
if(ob){
w=ob.width
h=ob.height
}
}

if(this.isV11){
var winObj=System.getWindow()
if(winObj && winObj.getStageSize){
ob=winObj.getStageSize()
if(ob){
w=ob.width
h=ob.height
}
}
}

if(!ob){
w=runtime.stage.stageWidth
h=runtime.stage.stageHeight
}

return {width:w,height:h}
}

getContentSprite(){
var th=this
var v=th.contentSpr
if(th.isV11){
var winObj=System.getWindow()
if(winObj && winObj.getContentSprite){
v=winObj.getContentSprite()
}
}
if(v==null)v=runtime.stage
return v
}

checkUpdateApp(id,cb){
if(id!=null){
if(System.platform.type=='pc'){
if('shortcutApp' in System){
var q=new lang.ui.AppAutoUpdateSprite(id)
q.endCB=cb
return q
}
}
}
return null
}

open(t,args){
var th=this
if(t=='globalSettings'){
th._createPopUpGlobalSettings()
}else if(t=='openScreenshot' && args.length>0){
th._createPopUpScreen(args[0])
}
}

openContextMenu(spr,e){
var th=this
th.openMenuCanvas(spr,e)
}

_createPopUpGlobalSettings(){
var spr=this.getContentSprite()

if('curSettingsScene' in runtime && runtime.curSettingsScene){
runtime.curSettingsScene.removePanel()
runtime.curSettingsScene=null
}

var cl=new lang.ui.animalsgame.settingsPanel.MainSprite(runtime.stage)
runtime.curSettingsScene=cl
spr.addChild(cl)

/*var popupW=400
var popupH=200
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Информация',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
cntSize.width-=100
cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5

var logoBM=new lang.display.Bitmap
logoBM.src='https://animals-game.ru/images/logo-vm2.png'
logoBM.x=(popupW-90)/2
logoBM.selectable=false
sp.addChild(logoBM)

var infoSpr=new lang.display.Sprite
infoSpr.y=70
infoSpr.width=popupW
infoSpr.css({'font-size':'17px','text-align':'center','font-family':'Arial'})
sp.addChild(infoSpr)

infoSpr.html='<div><span style="color:#ac26ae;">В разработке</span></div>'

//sp.addChild(sp2)
pp.addContent(sp)
runtime.stage.addChild(pp)*/

}

openMenuCanvas(cnv,e){
var th=this
var targ=null
if(e!=null)targ=e.target

if('curMenuRight' in th){
if(th.curMenuRight!=null){
th.curMenuRight.remove()
if(th.curMenuRight.parent!=null)th.curMenuRight.parent.removeChild(th.curMenuRight)
}
}
th.curMenuRight=null

var version=''
if('platformVersion' in System.platform){
version=' '+System.platform.platformVersion
}

if(('curMenuRight' in this)==false)this.curMenuRight=null
if(this.curMenuRight!=null)this.curMenuRight.remove()
var menuList=[]
var menuListSys=[]
/*['Информация',()=>{
}],*/

if(targ!=null){
if(targ is lang.text.TextField){
var txtV=targ.text
if('textVal' in targ)txtV=targ.textVal
if(txtV.size>0){
menuListSys.push(['Копировать текст',()=>{
var str=txtV
str=str.replaceAll('\n','')
System.setClipboard(str)
//alert('ok',str)
}])
}
if('hrefValue' in targ){
menuListSys.push(['Копировать URL',()=>{
System.setClipboard(targ.hrefValue)
}])
}
}else if(targ is lang.text.TextInput){
var str2=System.getClipboard()
if(str2!=null){
if(str2.size>0){
menuListSys.push(['Вставить',()=>{
var caretPos=0
if('caretIndex' in targ)caretPos=targ.caretIndex
var str2=System.getClipboard()
if(str2!=null){
str2=str2.replaceAll('\n','')
if(caretPos>0){
var val=targ.value
var s1=val.cut(0,caretPos)
var s2=val.cut(caretPos)
targ.value=s1+str2+s2
}else{
targ.value+=str2
}
}
}])
}
}
}
}

if(System.platform.type!='web'){
menuList.push(['Сделать скриншот',()=>{
    
var v7=false
    
if(MainUI.isV11){
var winObj=System.getWindow()
if(winObj && winObj.screenshot){
winObj.screenshot()
v7=true
}
}

if(!v7){
var isCrop=false
var isMobile=false
var pixelRatio=1
var plInfo2=System.platform
if('mobile' in plInfo2 && plInfo2.mobile)isMobile=true    
if(System.platform.type=='android')isMobile=true

if(System.platform.type!='web'){
if('pixelRatio' in runtime.stage)pixelRatio=runtime.stage.pixelRatio
}
if(isMobile==false)isCrop=true

if(isCrop){
th.createSceneScreenshot()
}else{

var stW=runtime.stage.stageWidth
var stH=runtime.stage.stageHeight

var bmd=new lang.display.BitmapData(stW,stH,true,0)
bmd.resolution=pixelRatio
bmd.draw(runtime.stage)
var bmd2=bmd
if(pixelRatio!=1.0){
var bm=new lang.display.Bitmap
/*bm.on('load',()=>{
th._createPopUpScreen(this)   
})*/
bm.src=bmd
bm.scaleX=1/pixelRatio
bm.scaleY=1/pixelRatio

bmd2=new lang.display.BitmapData(stW,stH,true,0)
bmd2.draw(bm)
bmd.dispose()
}

var bm=new lang.display.Bitmap
bm.bmdData=bmd2
bm.src=bmd2
th._createPopUpScreen(bm)

/*var bm=new lang.display.Bitmap
bm.on('load',()=>{
th._createPopUpScreen(this)   
})
bm.bmdData=bmd
bm.src=bmd*/
}
}
}])

if(System.platform.type=='pc'){

/*if('setWindowMin' in System){
menuList.push(['Снимок экрана',()=>{
    
Timer.initOne(80,()=>{
System.setWindowMin()
var lastState=runtime.stage.displayState
var bmd2=VM.callNative('getScreenDesktop')
System.setWindowMax()
if(bmd2){

if('curScreenshotScene' in runtime && runtime.curScreenshotScene){
runtime.curScreenshotScene.removeScene()
runtime.curScreenshotScene=null
}

var bm=new lang.display.Bitmap
bm.bmdData=bmd2
bm.src=bmd2

if(bm.width>0 && bm.height>0){
var bmd3=new lang.display.BitmapData(bm.width,bm.height,true,0)
bmd3.draw(bm)

bm=new lang.display.Bitmap
bm.bmdData=bmd3
bm.src=bmd3
runtime.stage.displayState='fullscreen'
var q=new lang.ui.animalsgame.Screenshot(bm,(bm3)=>{
runtime.stage.displayState=lastState
th._createPopUpScreen(bm3)
})
q.resizeCheck=false
runtime.stage.addChild(q)
}
//th._createPopUpScreen(bm)
}
})


}])
}*/

}

}

if(cnv!=null){
if(System.platform.type=='web'){
menuList.push(['Сделать скриншот',()=>{

/*if(System.platform.type=='web'){
cnv.update()
cnv.getImage((bm)=>{
//bm.on('load',()=>{
//this.removeAllEvents()
th._createPopUpScreen(bm)
//})
//alert('Ссылка',bm.src)    
})    
}else{*/


var bmd=new lang.display.BitmapData(/*cnv.width,cnv.height,*/runtime.stage.stageWidth,runtime.stage.stageHeight,true,0)
bmd.draw(cnv)

var bm=new lang.display.Bitmap
bm.on('load',()=>{
th._createPopUpScreen(this)   
})
bm.bmdData=bmd
bm.src=bmd
//}


}])
}
}
/*,['Инструменты разработчика',()=>{
//lib.widget.console.ConsoleWidget.open(cnv)
}]*/

var isAndroid=false
if(System.platform.type=='android')isAndroid=true

var fullPathAppsShared=''
if(isAndroid==true){
fullPathAppsShared=System.getPathFolderFiles('shared')
fullPathAppsShared+='/'
}

if(cnv==null){
if(System.platform.type=='pc'){    
menuList.push(['Мои скриншоты',()=>{
fullPathAppsShared+='screens'
System.exec('open '+fullPathAppsShared)
}])
menuList.push(['Домашняя папка',()=>{
System.exec('open '+fullPathAppsShared)
}])
}
menuList.push(['Панель управления',()=>{
th._createPopUpGlobalSettings()
}])
}else{
if(System.platform.type=='pc'){
menuList.push(['Мои скриншоты',()=>{
System.exec('open screens')
}])
menuList.push(['Домашняя папка',()=>{
System.exec('open /')
}])
menuList.push(['Панель управления',()=>{
th._createPopUpGlobalSettings()
}])
}
}

menuList.push(['О программе VM2',()=>{
th._createPopUpAbout()
}])

/*if(cnv!=null){
if(System.platform.type=='pc'){
menuList.push(['Проверить обновления',()=>{
th.playerUpdateFunc()
}])
}
}*/

if(System.platform.type!='web'){
if(menuListSys.length>0){
menuList=menuListSys
}
}

if(runtime.cbContextMenuRClick!=null){
var arr1=runtime.cbContextMenuRClick()
if(arr1!=null){
if(arr1 is Array){
menuList=arr1
}
}
}

var stageSize=this.getStageSize()
var sw=stageSize.width
var sh=stageSize.height
//var sw=runtime.stage.stageWidth
//var sh=runtime.stage.stageHeight
var spr=this.getContentSprite()
var pos=System.grabMousePos()
if(this.isV11){
if(spr){
var pos2=spr.toLocal({x:pos.x,y:pos.y})
if(pos2)pos=pos2
}
}
var q=new lang.display.MenuCanvasWidget(menuList)
if(cnv==null){
q.firstClick1=false
}else{
q.x=pos.x
q.y=pos.y
if((pos.x+q.w)>sw)q.x=sw-q.w
if((pos.y+q.h)>sh)q.y=sh-q.h
q.firstClick=true
}
//q.firstClick=true
this.curMenuRight=q
spr.addChild(q)
}



_createPopUpAbout(){
var th=this
var popupW=500
var popupH=400
if(System.platform.type!='web'){
popupW=400
popupH=300
}
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Информация',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
//cntSize.width-=100
//cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5

var logoBM=new lang.display.Bitmap
logoBM.src='https://ag6.ru/images/logo-vm2.png'
logoBM.x=(popupW-90)/2
logoBM.selectable=false
sp.addChild(logoBM)

var infoSpr=new lang.display.Sprite
infoSpr.y=70
infoSpr.width=popupW
infoSpr.css({'font-size':'17px','text-align':'center','font-family':'Arial'})
sp.addChild(infoSpr)

var version=''
if('platformVersion' in System.platform)version=' '+System.platform.platformVersion

var platformV=System.platform.type
if(System.platform.type=='web'){
infoSpr.html='<div><span style="color:#ac26ae;">О программе VM2</span></div><div><span>Версия: '+version+'</span></div><div><span>Платформа: '+platformV+'</span></div>'

if('browserUserAgent' in System.platform){
infoSpr.html+='<div><span>user agent: '+System.platform.browserUserAgent+'</span></div>'
}    
}else{
var yy1=0
var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0xac26ae
tfA1.text='О программе VM2'
//tfA1.buttonMode=true
tfA1.x=(popupW-tfA1.width)/2
tfA1.y=yy1
infoSpr.addChild(tfA1)
yy1+=30

var a2=[['Версия',version],['Платформа',platformV]]
for (var i = 0; i < a2.size; i++) {
var el=a2[i]
var nm1=el[0]
var nm2=el[1]
var txx=nm1+': '+nm2

var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0
tfA1.text=txx
tfA1.x=(popupW-tfA1.width)/2
tfA1.y=yy1
infoSpr.addChild(tfA1)
yy1+=24
}

}

var siteURL='https://ag6.ru/vm2'

if(System.platform.type=='web'){
var siteSpr=new lang.display.Sprite
siteSpr.html='<div style="width:150px;"><a href="'+siteURL+'" target="_blank">Наш сайт</a></div>'
siteSpr.x=(popupW-70)/2
siteSpr.y=popupH-60
sp.addChild(siteSpr)
}else{

//if(System.platform.type=='pc'){
var usersTxt=new lang.text.TextField
usersTxt.fontName='Arial'
usersTxt.fontSize=19
usersTxt.color=0x265cae
usersTxt.text='Особые благодарности'
usersTxt.buttonMode=true
usersTxt.x=(popupW-usersTxt.width)/2
usersTxt.y=popupH-140
usersTxt.on('click',(e)=>{
pp.remove()
th._createPopUpUsersQ()
})
sp.addChild(usersTxt)
//}   
var siteTxt=new lang.text.TextField
siteTxt.fontName='Arial'
siteTxt.fontSize=19
siteTxt.color=0
siteTxt.text='Наш сайт'
siteTxt.buttonMode=true
siteTxt.x=(popupW-siteTxt.width)/2
siteTxt.y=popupH-100
siteTxt.on('click',(e)=>{
System.exec('open '+siteURL)
})
sp.addChild(siteTxt)
}

//sp.addChild(sp2)
pp.addContent(sp)
var spr=this.getContentSprite()
spr.addChild(pp)
}


getListUsersVM2(){
var arr=[
//{name:'Кира Малиновская',url:'https://vk.com/id796204268'},
//{name:'Ирина Суворова',url:'https://vk.com/id666989552'},
{name:'Ольга Полякова',url:'https://vk.com/id449198110'},
{name:'Ирина Добренькая',url:'https://vk.com/id297520695'},
{name:'Софи Терещенкова',url:'https://vk.com/id494753752'},
{name:'Вероника Ростова',url:'https://vk.com/id362280761'},
{name:'Дмитрий Костяков',url:'https://vk.com/id668955051'},
{name:'И создатель :)',url:'https://vk.com/id57028472'}
]
return arr
}

_createPopUpUsersQ(){
var popupW=500
var popupH=400
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Благодарности',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
cntSize.width-=100
cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5

var infoSpr=new lang.display.Sprite
infoSpr.y=10
sp.addChild(infoSpr)


var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0xac26ae
tfA1.text='Особые благодарности этим людям'
tfA1.x=(popupW-tfA1.width)/2
infoSpr.addChild(tfA1)

var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0xac26ae
tfA1.text='они помогают поддерживать программу!'
tfA1.x=(popupW-tfA1.width)/2
tfA1.y=26
infoSpr.addChild(tfA1)


var arr=this.getListUsersVM2()
//arr.dup(10)

var columnNum=2
var columnW=170
var ww=columnW*columnNum


var sp2=new lang.display.Sprite
sp2.x=80
sp2.y=70
infoSpr.addChild(sp2)

var linesSpr=new lang.display.Sprite
linesSpr.createPainter()
sp2.addChild(linesSpr)
var i=0
var y1=0
arr.eachTime(100,(el)=>{
//for (var i = 0; i < arr.size; i++) {
//var el=arr[i]
var tff=new lang.text.TextField
tff.fontSize=14
tff.fontName='Arial'
tff.color=0
var pos=i+1
tff.text=el.name
tff.x=(columnW-tff.width)/2
tff.y=y1
i+=1
sp2.addChild(tff)

var tff2=new lang.text.TextField
tff2.fontSize=14
tff2.fontName='Arial'
tff2.color=0x265cae
tff2.text='страничка'
tff2.buttonMode=true
tff2.x=columnW+tff2.width
tff2.y=y1
tff2.urlV=el.url
sp2.addChild(tff2)
tff2.on('click',(e)=>{
var urll=this.urlV
System.exec('open '+urll)
})
y1+=30
linesSpr.painter.rect(0,y1-8,ww,2,'#CCCCCC')

})


pp.addContent(sp)
var spr=this.getContentSprite()
spr.addChild(pp)
}









loadAccountVM2(){
var fi=new lang.io.File('vm2Auth')
var isExt=fi.exists()
if(isExt==true){
var ba=fi.readBytes()
if(ba!=null){
var ob=ba.readObject()
if(ob!=null){
if('login' in ob){
if(ob.login!=null){
if('pass' in ob){
if(ob.pass!=null){
var oo={}
oo.login=ob.login
oo.pass=ob.pass
return oo
}
}
}
}
}
}
}
return null
}


uploadScreenSS(ba,cbok,cberr){
if(ba!=null){
var acc=runtime.vm2Account
var props={guest:1}
if(acc)props={vm2_login:acc.login,vm2_pass:acc.pass}
props.img=ba

var url='https://ag6.ru/mainApi.php?c=service.uploadSS'
//if(acc!=null){
//var url='https://ag6.ru/mainApi.php?c=service.uploadSS'
URL.post(url,props,(o)=>{
if(o){
if('data' in o)o=o.data
}
var isOk=false
if('url' in o)isOk=true
if(isOk==true){
if(cbok)cbok(o.url)
}else{
if(cberr)cberr()
}
},()=>{
if(cberr)cberr()
})
/*}else{
if(cberr)cberr()
}*/
}
}

createSceneScreenshot(){
var th=this

if('curScreenshotScene' in runtime && runtime.curScreenshotScene){
runtime.curScreenshotScene.removeScene()
runtime.curScreenshotScene=null
}

var stW=runtime.stage.stageWidth
var stH=runtime.stage.stageHeight
var pixelRatio=1
var bmd=new lang.display.BitmapData(stW,stH,true,0)
bmd.resolution=pixelRatio
bmd.draw(runtime.stage)
var bmd2=bmd
if(pixelRatio!=1.0){
var bm=new lang.display.Bitmap
/*bm.on('load',()=>{
th._createPopUpScreen(this)   
})*/
bm.src=bmd
bm.scaleX=1/pixelRatio
bm.scaleY=1/pixelRatio

bmd2=new lang.display.BitmapData(stW,stH,true,0)
bmd2.draw(bm)
bmd.dispose()
}

var bm=new lang.display.Bitmap
bm.bmdData=bmd2
bm.src=bmd2

var q=new lang.ui.animalsgame.Screenshot(bm,(bm3)=>{
th._createPopUpScreen(bm3)
})
var spr=this.getContentSprite()
spr.addChild(q)
}

_createPopUpScreen(bm){
var th=this
if(bm!=null){
var popupW=500
var popupH=400
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Скриншот',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
cntSize.width-=100
cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5
var isRatio=false
var ratio=1
if(bm.naturalWidth>=cntSize.width)isRatio=true
if(bm.naturalHeight>=cntSize.height)isRatio=true

if(isRatio==true){
/*var getAspectRatioSize=(w,h,maxWidth,maxHeight)=>{
var ratio = Math.min(maxWidth /w, maxHeight /h)
var o={width:0,height:0}
o.width=w*ratio
o.height=h*ratio
return o
}*/
ratio=Math.min(cntSize.width/bm.naturalWidth,cntSize.height/bm.naturalHeight)
if(ratio>1.0)ratio=1
sz.width=bm.naturalWidth*ratio
sz.height=bm.naturalHeight*ratio
}else{
sz.width=bm.naturalWidth
sz.height=bm.naturalHeight
}

bm.scaleX=ratio//sz.width/bm.naturalWidth
bm.scaleY=ratio//sz.height/bm.naturalHeight
bm.x=(popupW-sz.width)/2
bm.y=(cntSize.height-sz.height)/2

sp.addChild(bm)

var sp2=new lang.display.Sprite
if(System.platform.type=='web'){
sp2.html='<div style="width:200px;"><a href="'+bm.src+'" download>Сохранить на компьютер</a></div>'    
}else{
    
    
var x2=0

var arr2=[]
arr2.push(['Сохранить на компьютер',()=>{
pp.remove()
var rnd=Math.randomInt(1000000)
var fullPathAppsShared=''
if(System.platform.type=='android'){
fullPathAppsShared=System.getPathFolderFiles('shared')
fullPathAppsShared+='/'
}
fullPathAppsShared+='screens'

if(System.platform.type=='android'){
var fi=new lang.io.File(fullPathAppsShared)
var isExists=fi.exists()
if(isExists==false)fi.mkdir()
/*var isExists=System.exec('ls -l '+fullPathAppsShared)
if(isExists==null){
System.exec('mkdir '+fullPathAppsShared)
}*/
}

var fi2=new lang.io.File(fullPathAppsShared+'/screen'+rnd+'.png')
fi2.write(bm.bmdData)
//lang.utils.File.saveBytes(fullPathAppsShared+'/screen'+rnd+'.png',bm.bmdData)
}])

if(runtime.vm2Account==null){
var account=th.loadAccountVM2()
if(account!=null)runtime.vm2Account=account
}

//if(runtime.vm2Account!=null){

arr2.push(['Сохранить на сервер',()=>{
//if(runtime.vm2Account!=null){
sp2.visible=false

var tf6=new lang.text.TextField
tf6.fontName='Arial'
tf6.fontSize=16
tf6.color=0x0000FF
tf6.text='Загрузка скриншота...'
tf6.x=(popupW-tf6.width)/2
tf6.y=popupH-100

sp.addChild(tf6)


var rnd=Math.randomInt(1000000)
var fullPathAppsShared='screens'

var fi=new lang.io.File(fullPathAppsShared)
var isExists=fi.exists()
if(isExists==false)fi.mkdir()

var fi2=new lang.io.File(fullPathAppsShared+'/screen'+rnd+'.png')
fi2.write(bm.bmdData)
var ba=fi2.readBytes()
fi2.delete()

if(ba!=null){
th.uploadScreenSS(ba,(urlV)=>{
//sp2.visible=true
System.setClipboard(urlV)


var tf5=new lang.text.TextField
tf5.fontName='Arial'
tf5.fontSize=16
tf5.color=0x0000FF
tf5.text=''+urlV
tf5.buttonMode=true
tf5.on('click',()=>{
System.exec('open '+urlV)
})
tf5.x=(popupW-tf5.width)/2
tf5.y=tf6.y

if(tf6.parent)tf6.parent.removeChild(tf6)

sp.addChild(tf5)


//alert('Ссылка скопирована в буфер обмена.')
},()=>{
if(tf6.parent)tf6.parent.removeChild(tf6)
sp2.visible=true
alert('Ошибка загрузки скриншота.')
})
}
/*}else{
alert('Необходима авторизация в игровом центре.')
}*/
}])
//alert(acc.login,acc.pass)
//}

for (var i = 0; i < arr2.size; i++) {
var ell=arr2[i]
var tf1=new lang.text.TextField
tf1.fontName='Arial'
tf1.fontSize=16
tf1.color=0
if(i==1){
tf1.color=0x008500
}
/*if(i==1){
if(runtime.vm2Account==null)tf1.color=0xFF0000
}*/
tf1.text=ell[0]
tf1.buttonMode=true
tf1.on('click',ell[1])
tf1.x=x2
x2=x2+tf1.width+15
sp2.addChild(tf1)
}

}

sp.addChild(sp2)
pp.addContent(sp)
sp2.x=(popupW-180)/2
if(System.platform.type!='web'){
sp2.x=(popupW-x2)/2
}
sp2.y=popupH-100
pp.closeCB=()=>{

URL.removeURL(bm.src)
}
var spr=this.getContentSprite()
spr.addChild(pp)
}
}

static getAppByRestartVM2(){
if(System.platform.type=='pc'){
var appFile='windowApp/main.animalsgame'
var appFile2='mApp.animalsgame'
var fi2=new lang.io.File(appFile)
var isExt=fi2.isFile()
if(isExt)return appFile
var fi3=new lang.io.File(appFile2)
var isExt2=fi3.isFile()
if(isExt2)return appFile2
}
return null
}


}