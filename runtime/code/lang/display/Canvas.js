class Canvas extends lang.display.Sprite{
	
Canvas(){
/*this.welcomeSprite=this.getWelcomeCanvasSpr()
addChild(this.welcomeSprite)
this.update()*/
var th=this
this.cbRClick=(e)=>{
var targ=e.target
if('rclick' in targ){
targ.rclick(e)
}else{
th.openMenuCanvas(th,e)
}
}
this.on('rclick',th.cbRClick)
}

removeRClick(){
if(this.cbRClick!=null){
this.off('rclick',this.cbRClick)
this.cbRClick=null
}
}


_createPopUpGlobalSettings(){
    
/*var cl=new lang.ui.animalsgame.settingsPanel.MainSprite(runtime.stage)
runtime.stage.addChild(cl)*/
    
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


native setColorMod(r,g,b){}


playerUpdateFunc(){
//System.exec('playerUpdateRun')

/*var popupW=400
var popupH=230
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Установщик',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
cntSize.width-=100
cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5

var infoSpr=new lang.display.Sprite
infoSpr.y=70
sp.addChild(infoSpr)

var yy1=0
var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0xac26ae
tfA1.text='Идёт проверка обновлений...'
tfA1.x=(popupW-tfA1.width)/2
tfA1.y=yy1
infoSpr.addChild(tfA1)
yy1+=30


var url1='https://ag6.ru/VM2Api.php'
URL.post(url1,{c:'vm2CheckPCUpdate'},(ob)=>{
if(ob!=null){
if('data' in ob)ob=ob.data
}
//alert(JSON.encode(ob))

var pref1='Загрузка'

var cb3=(status)=>{
if(status=='ready'){
tfA1.text='Загрузка 0%'
}else if(status=='libs_ready'){
pref1='Загрузка компонентов'
tfA1.text=pref1
}else if(status=='ok'){
tfA1.text='Обновление завершено, перезапустите программу'
}else if(status=='error'){
tfA1.text='Ошибка при обновлении'
}else if(status=='no_update'){
tfA1.text='Нет обновлений'
Timer.init(2000,()=>{
this.stop()
pp.remove()
})
}
tfA1.x=(popupW-tfA1.width)/2
}

//tfA1.text=pref1+' 0%'
//tfA1.x=(popupW-tfA1.width)/2

var oo={}
if(ob!=null){
if('id' in ob){
oo.id=ob.id
if('url' in ob)oo.url=ob.url
if('zipLibs' in ob){
var zipLibsData=ob.zipLibs
if(zipLibsData!=null){
var idd=0
if('id' in zipLibsData)idd=zipLibsData.id
if('url' in zipLibsData){
var url2=zipLibsData.url
oo.zipLibsID=idd
oo.zipLibsURL=url2
}
}
}
}
}

System.exec('playerUpdate',oo,cb3,()=>{
cb3('error')
},(ev)=>{
var perc=Math.floor(ev.loaded/ev.total*100)
tfA1.text='Загрузка '+perc+'%'
tfA1.x=(popupW-tfA1.width)/2
})
    
    
},()=>{
tfA1.text='Ошибка получения данных'
tfA1.x=(popupW-tfA1.width)/2

Timer.init(2000,()=>{
this.stop()
pp.remove()
})
})
//var info=System.exec('playerUpdateInfo')
//alert(info.lastUpdateStr)

//var isCheckUpd=false
//if(info.lastUpdateStr.size<=0)isCheckUpd=true


//var isUpd=false
//if(info.lastUpdateStr.size<=0)isUpd=true
//else if(ss!=info.lastUpdateStr){
//isUpd=true
//}

tfA1.x=(popupW-tfA1.width)/2

pp.addContent(sp)
runtime.stage.addChild(pp)*/
}


/*playerUpdateFunc(){
//System.exec('playerUpdateRun')

var popupW=400
var popupH=230
var pp=new lang.ui.animalsgame.popup.PopUpDef1('Установщик',popupW,popupH)
var sz=pp.getContentSize()
var cntSize=pp.getContentSize()
cntSize.width-=100
cntSize.height-=80
var sp=new lang.display.Sprite
sp.y=5

var infoSpr=new lang.display.Sprite
infoSpr.y=70
sp.addChild(infoSpr)

var yy1=0
var tfA1=new lang.text.TextField
tfA1.fontName='Arial'
tfA1.fontSize=16
tfA1.color=0xac26ae
tfA1.text='Идёт проверка обновлений...'
tfA1.x=(popupW-tfA1.width)/2
tfA1.y=yy1
infoSpr.addChild(tfA1)
yy1+=30


var info=System.exec('playerUpdateInfo')
//alert(info.lastUpdateStr)

//var isCheckUpd=false
//if(info.lastUpdateStr.size<=0)isCheckUpd=true


URL.binaryGet(info.updateURL,(bb)=>{
var ss=bb.readUTFBytes(bb.size)

var isUpd=false
if(info.lastUpdateStr.size<=0)isUpd=true
else if(ss!=info.lastUpdateStr){
isUpd=true
}

if(isUpd==true){
//tfA1.text='Есть обновление!'

tfA1.text='Загрузка 0%'
tfA1.x=(popupW-tfA1.width)/2

System.exec('playerUpdate',()=>{
tfA1.text='Обновление завершено, перезапустите программу'
tfA1.x=(popupW-tfA1.width)/2
},()=>{
tfA1.text='Ошибка при обновлении'
tfA1.x=(popupW-tfA1.width)/2
},(ev)=>{
var perc=Math.floor(ev.loaded/ev.total*100)
tfA1.text='Загрузка '+perc+'%'
tfA1.x=(popupW-tfA1.width)/2
},''+ss)

}else{
tfA1.text='Нет обновлений'

Timer.init(2000,()=>{
this.stop()
pp.remove()
})

}
tfA1.x=(popupW-tfA1.width)/2

},()=>{
tfA1.text='Ошибка получения данных'
tfA1.x=(popupW-tfA1.width)/2

Timer.init(2000,()=>{
this.stop()
pp.remove()
})

})

pp.addContent(sp)
runtime.stage.addChild(pp)
}*/

openMenuCanvas(cnv,e){
var th=this
if(cnv)th=cnv
if(System.platform.type!='web'){
var gl=GLOBAL
var isUI=false
if('MainUI' in gl){
var mui=gl.MainUI
if('openContextMenu' in mui){
isUI=true
mui.openContextMenu(th,e)
}
}
//if(isUI==false)th.openMenuCanvas(th)
}
}

getWelcomeCanvasSpr(){
var th=this
var spr=new lang.display.Sprite
var w=this.stage.stageWidth
var h=this.stage.stageHeight
/*this.width=w
this.height=h*/

/*var bm1=new lang.display.Bitmap
bm1.on('load',()=>{
bm1.off('load',arguments.callee)
th.update()
})
bm1.src='https://animals-game.ru/images/toplogo.png'
*/
/*var aa=new lang.display.Sprite
spr.addChild(aa)
var p=new lang.display.Painter
p.setTarget(aa)
p.rect(0,0,w,50,'#3083a7')
        
var txt=new lang.text.TextField
txt.fontSize=20
txt.text='Сцена готова :)'
txt.x=(w-txt.width)/2
txt.y=(h-txt.height+90)/2
spr.addChild(txt)*/
      
return spr
}

native getContext(type){}

native getImage(cb){}

getImageByteArray(cb){
this.getImage((bm)=>{
bm.toByteArray(cb)
})
	
}

toDataURL(type,opt){
var imgType='png'
var isBinary=false
var defQuality=0.92
var quality=defQuality
if(opt is Number)quality=opt
if(quality>1)quality=quality/100
var qualityPerc=quality*100 as int

if(type){
var arr=type.split('/')
if(arr && arr.length>1){
var t1=arr[0]
var val=arr[1]
if(t1=='binary')isBinary=true
if(val=='webp' || val=='jpeg')imgType=val
}else if(type=='binary')isBinary=true
}

var ba=new lang.utils.ByteArray
var vv=BitmapDecoder.writeByteArray(ba,this,{quality:qualityPerc,format:imgType})
if(vv){
ba.position=0
if(isBinary)return ba
var str=base64_encode(ba)
if(str){
var s2='data:image/'+imgType+';base64,'+str
return s2
}
}
return null
}

native draw(p){
	
}

native update(){
	
}

native clear(){
}

native cache(v){}
native uncache(v){}
	
}