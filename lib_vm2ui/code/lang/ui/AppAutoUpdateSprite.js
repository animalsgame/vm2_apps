class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(id){
this.appid=id
var scriptURL='VM2Api.php'
this.apiStoreURL='https://ag6.ru'+'/'+scriptURL
//this.apiStoreURL='https://animals-game.ru'+'/'+scriptURL
this.fullPathApps='appsInstall'
this.libsPath='libs'
this.extFile='animalsgame'
this.endCB=null
this.mspr=new lang.display.Sprite
this.bg=new lang.display.Sprite
//this.bg.alpha=0.8
this.bg.createPainter()
this.tf=new lang.text.TextField
this.tf.color=0
this.tf.fontSize=20
addChild(this.mspr)
this.mspr.addChild(this.bg,this.tf)
}

/*
updShortcut2(){
var th=this

if(System.platform.type=='pc'){
if('shortcutApp' in System){
var path=th.fullPathApps
var fi=new lang.io.File(path)
var arr=fi.listFiles()
if(arr && arr.length>0){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
var idd=el.name
var info=th.getAppInstallInfoData(idd)
if(info){
if(info.appName){
var nmm=info.appName

var v2=System.shortcutApp('check',{name:nmm})
if(v2 && info.appFilePath){
var iconPath=path+'/'+idd+'/icon48.ico'
var vv=System.shortcutApp('create',{name:nmm,app:info.appFilePath,icon:iconPath})
}

}
}
}
}
}
}

}*/

checkVM2Update(cbok,cberr){

}

/*
checkVM2Update(cbok,cberr){
var th=this
if(System.platform.type=='pc'){
th.apiStore('vm2CheckPCUpdate','',(ob)=>{
if(ob!=null){
if('id' in ob){
var oo={}
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
//oo.id=80
if(oo.id!=0){
var isUpd=false
var isDown=false
var ver=0

if('platformVersion' in System.platform){
var version=System.platform.platformVersion
ver=version as int
}
//ver=1
if(ver!=0){
if(ver!=oo.id){
if(ver<oo.id)isDown=true
isUpd=true
}
}

if(isUpd){
var cb3=(status)=>{
if(status=='ready'){
}else if(status=='libs_ready'){
}else if(status=='ok'){
if(cbok)cbok(status)
}else if(status=='no_update'){
if(cbok)cbok(status)
}
}

var txt2='Идёт обновление VM2, версия '+oo.id

th.setText(txt2)

System.exec('playerUpdate',oo,cb3,()=>{
if(cberr)cberr()
},(e)=>{
var perc=e.loaded/e.total*100 as int
//var total=(e.total/1024) as int
//var loaded=(e.loaded/1024) as int
var txt4=txt2+' ('+perc+'%)'
th.setText(txt4)
})
}else{
if(cbok)cbok('no_update')
}
}
}
}
})
}
}*/

isInstallLib(name){
var th=this
var path=th.libsPath+'/'+name+'.'+th.extFile
var fi=new lang.io.File(path)
var isExt=fi.isFile()
if(isExt)return true
return false
}


getLibsUpdateListInfo(){
var ba=new lang.utils.ByteArray
var arr=[]
var path=this.libsPath+'/updates.txt'
var ob=this.readFileJSON(path)
if(ob){
if(ob is Array)arr=ob
}
if(arr){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
if('name' in el){
var libName=''+el.name
var time=0
if('time' in el)time=el.time as int
if(libName.length>0){
ba.writeString(libName)
ba.writeInt(time)
//alert(libName,time)
}
}
}
}
return ba
}



installLibsList(arr,cb,cb5){
var th=this
if(arr){
if(arr.length>0){
var pathSave=th.libsPath+'/updates.txt'
var arrLibs=[]
var ss=arr.join(',')
var ob4=th.readFileJSON(pathSave)
if(ob4){
if(ob4 is Array)arrLibs=ob4
}

var updateLibObj=(o)=>{
var pos1=-1

for (var i = 0; i < arrLibs.length; i++) {
var el1=arrLibs[i]
if(el1.name==o.name){
if(pos1==-1)pos1=i
}
}

if(pos1>-1)arrLibs.del(pos1)
arrLibs.push(o)

var s2=JSON.encode(arrLibs)
th.writeFile(pathSave,s2)
}

var n=0
var n2=0
var cb2=(o3)=>{
th.setText('Библиотека '+o3.name+' обновлена')
n2+=1
var updtm=0
if('update_time' in o3)updtm=o3.update_time
var ob2={name:o3.name,time:updtm}

updateLibObj(ob2)
if(n2>=n){
if(cb)cb()
n2=0
if(o3.name=='UI'){
var nm3=o3.name
var vv=System.loadLibrary([nm3])
}
}
}

var loadLibCB=(ell)=>{
var nm=ell.name
var pathSave=th.libsPath+'/'+nm+'.'+th.extFile
URL.binaryGet(ell.url,(ba2)=>{
if(ba2.length>0){
th.writeFile(pathSave,ba2)
cb2(ell)
}
})
}

th.apiStorePost('store.getLibsByName',{name:ss},(arr)=>{
if(arr){
n=arr.length
if(arr.length>0){
for (var i = 0; i < arr.length; i++) {
var el=arr[i]
if(cb5)cb5(el)
loadLibCB(el)
}
}else{
if(cb)cb()
}
}
})

}else{
if(cb)cb()
}
}
}



checkLibsUpdate(cb){
var bb=this.getLibsUpdateListInfo()
bb.position=0
this.apiStorePost('store.checkLibsUpdates',{ba:bb},(arr)=>{
if(arr!=null){
if(cb)cb(arr)
}
},()=>{
if(cb)cb(null)
})
}

readFileJSON(path){
var ss=null
var fi=new lang.io.File(path)
var isExt=fi.exists()
if(isExt){
var ba=fi.readBytes()
if(ba){
if(ba.length>0)ss=ba.readUTFBytes(ba.length)
}
}
if(ss){
var ob=JSON.decode(ss)
return ob
}
return null
}

writeFile(path,data){
var ba=null
if(path){
var fi=new lang.io.File(path)
if(data){
if(data is String){
var bb=new lang.utils.ByteArray
bb.writeUTFBytes(data)
bb.position=0
ba=bb
}else if(data is lang.utils.ByteArray){
ba=data
ba.position=0
}else if(data is lang.display.BitmapData){
ba=data
}else if(data is Object){
data=JSON.encode(data)
var bb=new lang.utils.ByteArray
bb.writeUTFBytes(data)
bb.position=0
ba=bb
}
}
if(ba){
var v=fi.write(ba)
return v
}
}
return false
}

apiStore(cmd,params,cb,cberr){
if(params==null)params=''
var pl=System.platform.type
if(pl=='pc')params+='&fp=1'
URL.post(this.apiStoreURL+'?c='+cmd+'&v=3&'+params,{isZipParam:1},(obb)=>{
var ob=null
if(obb){
if('data' in obb)ob=obb.data
}
if(obb is String){
if(cberr)cberr()
}else{
if(cb)cb(ob)
}
},cberr)
}

apiStorePost(cmd,params,cb,cberr){
if(params==null)params={}
var pl=System.platform.type
params.platform=pl
params.isZipParam=1
URL.post(this.apiStoreURL+'?c='+cmd+'&v=3',params,(obb)=>{
var ob=null
if(obb){
if('data' in obb)ob=obb.data
}

if(obb is String){
if(cberr)cberr()
}else{
if(cb)cb(ob)
}
},cberr)
}

getAppInstallInfoData(name){
if(name){
var path1=this.fullPathApps+'/'+name
var appPath=path1+'/app.'+this.extFile
var ob={packageName:name,appName:''}
var appInfoBA=null
var obInfo=this.readFileJSON(path1+'/app.json')
if(obInfo){
ob.appName=obInfo.name
ob.appFilePath=appPath
if('assetsList' in obInfo)ob.assetsList=obInfo.assetsList
if('updateTime' in obInfo)ob.fileUpdTime=obInfo.updateTime
for(var n in obInfo)ob[n]=obInfo[n]
return ob
}
}
return null
}

setText(v){
var th=this
th.tf.text=''+v
var marg=8
var w=th.tf.width
var h=th.tf.height
th.bg.painter.clear()
th.tf.x=marg
th.tf.y=marg
th.bg.painter.border(8,0x3083A7)
th.bg.painter.rect(0,0,w+(marg*2),h+(marg*2),'#FFFFFF')
}

endUpdate(v){
var th=this
th.tf.text=''
th.tf.x=0
th.tf.y=0
th.bg.painter.clear()
if(th.endCB)th.endCB(v)
th.endCB=null
}


assetsAppDownload(o,cbok,cberr){
var th=this
if(o){
var path1=th.fullPathApps+'/'+o.id
var pathA=path1+'/app.json'
var infoV=th.getAppInstallInfoData(o.id)
var infoObj=th.readFileJSON(pathA)

var updAssetsObj=(oo)=>{
if(oo){
var aList=null
if(infoObj){
if('assetsList' in infoObj)aList=infoObj.assetsList
if(aList==null)aList=[]

var p2=-1
for (var i = 0; i < aList.length; i++) {
var el1=aList[i]
if(el1.name==oo.name){
if(p2==-1)p2=i
}
}
if(p2>-1)aList.del(p2)
aList.push({name:oo.name,time:oo.fileTime})

infoObj.assetsList=aList

var ss=JSON.encode(infoObj)
th.writeFile(pathA,ss)
}

}
}

if(infoV){
var assetsArr=null
var assetsInfoObj={}
var noAssets=[]
if('assets_list' in o){
if(o.assets_list!=null){
if(o.assets_list.length>0)assetsArr=o.assets_list
}
}

if('assetsList' in infoObj){
if(infoObj.assetsList!=null){
for (var i = 0; i < infoObj.assetsList.length; i++) {
var ell=infoObj.assetsList[i]
var nmm=ell.name
assetsInfoObj[nmm]=ell
}
}
}
//alert(JSON.encode(assetsArr))
if(assetsArr){
for (var i = 0; i < assetsArr.length; i++) {
var el=assetsArr[i]
var nm2=el.name
var v1=false
if(nm2 in assetsInfoObj){
var ob3=assetsInfoObj[nm2]
if(ob3.time!=el.fileTime)v1=true
}else{
v1=true
}
if(v1==false){
var fi3=new lang.io.File(path1+'/'+nm2)
var isExt=fi3.isFile()
if(isExt==false)v1=true
}
if(v1)noAssets.push(el)
}
}

if(noAssets.length>0){
var pos1=0
var cb2=()=>{
if(pos1<noAssets.length){
var elv=noAssets[pos1]
var assetName=elv.name
th.setText('Загрузка ресурса "'+assetName+'"...')
URL.binaryGet(elv.url,(ba)=>{
pos1+=1
updAssetsObj(elv)
th.writeFile(path1+'/'+assetName,ba)
cb2()
},()=>{
if(cberr)cberr()
}/*,(e)=>{
var perc=e.loaded/e.total*100 as int
var totalV=(e.total/1024) as int
var loadedV=(e.loaded/1024) as int
}*/)
}else{
pos1=0
if(cbok)cbok()
}
}
cb2()
//alert(JSON.encode(noAssets))
}else{
if(cbok)cbok()
}
}else{
if(cbok)cbok()
}
}
}


installAppNewData(ob,logo,appData,updTime){
var th=this
var name=ob.name
var path1=th.fullPathApps+'/'+ob.id
var ext1=th.extFile
var isZip=false
if('appURL' in ob){
var s4=''+ob.appURL
var p3=s4.indexOf('.zip')
if(p3>-1)isZip=true
}

var obInfo={name:name,updateTime:updTime}
var obj5=th.readFileJSON(path1+'/app.json')
if(obj5){
if('assetsList' in obj5){
if(obj5.assetsList!=null)obInfo.assetsList=obj5.assetsList
}
}

var str1=JSON.encode(obInfo)

th.writeFile(path1+'/app.json',str1)
if(logo)th.writeFile(path1+'/icon.png',logo)

if(isZip){
var rnd=Math.randomInt()
var tempFile1='tempFile'+rnd+'.zip'
var fi6=new lang.io.File(tempFile1)
fi6.write(appData)
var zip=new lang.utils.Zip
var b=zip.open(tempFile1)
if(b==true){
var qq=zip.saveFile('app.'+ext1,path1+'/app.'+ext1)
}
zip.close()
fi6.delete()
}else{
th.writeFile(path1+'/app.'+ext1,appData)
}
return true
}


installNewApp2(ob,cbok,cbprogress){
var th=this
if(ob){
var id=ob.id
var nm=ob.name
var logoURL=ob.imageURL
var appURL=ob.appURL
var cbLoad=(baLogo)=>{
URL.binaryGet(appURL,(ba)=>{
var updTime=ob.fileUpdTime
if(updTime is String)updTime=0
var r=th.installAppNewData(ob,baLogo,ba,updTime)
if(cbok)cbok()
},()=>{
},(e)=>{
if(cbprogress)cbprogress(e.total,e.loaded)
})
}
cbLoad(null)
//URL.binaryGet(logoURL,cbLoad)

}
}


runAppPath(id){
var th=this
var ext=th.extFile
var path1=th.fullPathApps+'/'+id+'/app.'+ext

var fi=new lang.io.File(path1)
var isExt=fi.isFile()
if(isExt){
System.exec('runApp',path1)
}
}



check(){
var th=this

var isUpdVM2=false

/*var fi1=new lang.io.File('vm2Version2.txt')
var isFile1=fi1.isFile()
if(isFile1){
th.updShortcut2()
fi1.delete()
}*/

var cb5=(v)=>{
if(v=='no_update' && isUpdVM2)v='ok'

if(v=='ok'){
th.setText('Перезапуск...')

Timer.initOne(500,()=>{
th.runAppPath(th.appid)
th.endUpdate(v)
System.exit()
})

}else{
th.endUpdate(v)
}
}

var cb4=(oo)=>{
if(oo){
var infoV=th.getAppInstallInfoData(oo.id)
if(infoV){
if('fileUpdTime' in infoV){
var updTime=infoV.fileUpdTime
var tm2=0
var isUpd=false
if('fileUpdTime' in oo)tm2=oo.fileUpdTime
if(tm2!=updTime)isUpd=true
//alert(isUpd)
if(isUpd){
th.setText('Загрузка обновления...')
th.installNewApp2(oo,()=>{
th.assetsAppDownload(oo,()=>{
cb5('ok')
},()=>{
cb5('error')
})
}/*,(total,loaded)=>{
var perc=loaded/total*100 as int
var totalV=(total/1024) as int
var loadedV=(loaded/1024) as int
if(curSc)curSc.setTextPercentBar('Загружено '+loadedV+' из '+totalV+' кб',perc)
}*/)
}else{
cb5('no_update')
}
}else{
cb5('no_update')
}
}
}else{
cb5('error')
}
}

var cb2=()=>{
th.apiStore('infoApp','id='+th.appid,cb4,cb4)
}

var uiLibName='UI'

var cb8=(st)=>{
if(st=='ok')isUpdVM2=true
//alert(7,st)
th.checkLibsUpdate((a2)=>{

var libsArr=[]

var isLibUI=th.isInstallLib(uiLibName)
if(isLibUI==false)libsArr.push(uiLibName)

if(a2 && a2.length>0){
for (var i = 0; i < a2.length; i++)libsArr.push(a2[i])
}

if(libsArr && libsArr.length>0){
th.installLibsList(libsArr,cb2)
}else{
cb2()
}
})
}

Timer.init(500,()=>{
this.stop()
cb8()
})

//th.checkVM2Update(cb8,()=>{
//cb8()
//})

}

}