class AnimalsGameStream{

AnimalsGameStream(id,socket){
this.id=id
this.connect=socket
this.id=id
this.noStream=null
this.addUserCB=0
this.removeUserCB=0
this.closeHandler=0
this.packetsCB=null
this.isLeave=false
this.ev={}
}

on(t,cb){
this.ev[t]=cb
}
off(t){
if(t in this.ev)delete this.ev[t]
}

clearEvents(){
this.ev={}
}

hasEvent(t){
if(t in this.ev)return true
return false
}

emit(t,args){
if(t in this.ev){
var cb=this.ev[t]
cb.apply(this,args)
if(this.packetsCB!=null)this.packetsCB('get',t,args)
}
}

runE(t,o){
if (t == 'close'){
if(this.closeHandler!=0)this.closeHandler()
this.clear()
}else if(t==0){
if(this.packetsCB!=null)this.packetsCB('get','noStream',null)
if(this.noStream!=null){
this.noStream()
}
}
if(this.hasEvent(t)==true){
if(t==-2){
if(this.addUserCB!=0){
this.addUserCB(o)
}
}else if(t==-3){
if(this.removeUserCB!=0){
this.removeUserCB(o)
}
}else {
var args=[]
if(o!=null){
if((o is Array)==false)o=[o]
for (var i = 0; i < o.size; i++){args.push(o[i])}
}

this.emit(t,args)
}
}
}

send(){
var t = arguments[0]
var prms=[1,t]
for(var i=1; i < arguments.size; i++)prms.push(arguments[i])
this.connect.sendByStream(this.id, prms)
if(this.packetsCB!=null)this.packetsCB('send',t,prms)
}

join(o){
this.connect.sendByStream(this.id, [2]);
}

leave(){
//if(this.isLeave==false){
//this.isLeave=true
this.connect.sendByStream(this.id, [3]);
//}
}

clear(){
var stt=this.connect.streams
var idd=this.id
if(idd in stt){
delete stt[idd]
}
this.leave()
this.noStream=null
this.addUserCB=null
this.removeUserCB=null
this.closeHandler=null
}

clearNoLeave(){
var stt=this.connect.streams
var idd=this.id
if(idd in stt){
delete stt[idd]
}
//this.leave()
this.noStream=null
this.addUserCB=null
this.removeUserCB=null
this.closeHandler=null
}

}


/*****
Универсальный метод отправки данных
может отправлять данные с привязкой callback а может и просто отправить данные (если не нужно ждать ответа от сервера)

send((a,b)=>{},'команда',1,2,3,4,5) // пример с привязкой callback и аргументами

send('команда',1,2,3,4,5) // пример без callback но с аргументами

send('команда') // пример без callback и без аргументов

******/

class AnimalsGameSocket{

AnimalsGameSocket(appname,host,port){
this.host=host
this.port=port
this.appname=appname
this.datacb=null
this.noAppCB=null
var th=this
var sock=new lang.net.Socket
if('Config' in GLOBAL){
if('CONNECT_HOST' in GLOBAL.Config){
if(GLOBAL.Config.CONNECT_HOST=='animals-game.ru')sock.secure=true
}
}
this.isWeb=true
this.isSendBinary=false
if(System.platform.type!='web')this.isWeb=false
else{
this.isSendBinary=true
}
this.sock=sock
this.isConnect=false
this.isClose=false
this.cbIds={}
this.cmdsObj={}
this.streams={}
this.services={}

this.type=''
if(this.appname!=null){
if(this.appname.size>0)this.type='wsApp'
}


var service0={run:(arr)=>{
var tt=arr[1]
if(tt=='noapp'){
if(th.noAppCB!=null)th.noAppCB()
//alert('Серверное приложение не найдено')
}
}}

var service1={run:(arr)=>{
var params=arr[1]
var cid = arr[2]
if(cid in th.cbIds){
var cb=th.cbIds[cid]
cb.apply(th,params)

delete th.cbIds[cid]
}

}}


var service2={run:(arr)=>{
var aa=arr[1]
var t=aa.shift()

if(t in th.cmdsObj){
var cbb=th.cmdsObj[t]
cbb.apply(null,aa)
}

}}


var service3={run:(arr)=>{
var args=arr[1]
var streamid=args.shift()
var res=args.shift()
if(streamid in th.streams){
var stream=th.streams[streamid]
var ev=args.shift()
stream.runE(res,ev)
}
}}

this.addService(0, 'system', service0)
this.addService(1, 'main', service1)
this.addService(2, 'cbSocket', service2)
this.addService(3, 'stream', service3)


}




addService(id,name,o){
o.id=id;
o.name=name;
this.services[id]=o;    
}

on(t,cb){
this.cmdsObj[t]=cb 
}

getUniqID(){
var v=Math.randomInt()
if(v in this.cbIds){
return this.getUniqID()
}
return v
}

closeStreams(){
for(var n in this.streams){
var el=this.streams[n]
el.runE("close")
}
}

Connect(cbok,cberr,cbdisconnect){
var th=this
sock.on('connected',()=>{
th.isConnect=true
cbok()
})
sock.on('data',(o)=>{
    //alert('dataaa',o)
   // return
var arr=o//JSON.decode(o)
if(arr is lang.utils.ByteArray)arr=arr.readObject()
else if(arr is String)arr=JSON.decode(arr)
var c=arr[0]
if(c in th.services){
var serviceObj=th.services[c]
serviceObj.run(arr)
}


//th.datacb(res)
})
sock.on('error',()=>{
th.isConnect=false
cberr()
})
sock.on('disconnect',()=>{
th.isConnect=false
th.isClose=true
th.closeStreams()
cbdisconnect()
})
 
sock.connect(host,port)
}

send(){
if(this.isConnect==true){
var c=''
var isFunc=false
var arg1=arguments[0]
var n=0
if(arg1 is Function){
isFunc=true
n=2
c=arguments[1]
}else{
n=1
c=arg1
}
var rnd=0
if(isFunc==true){
rnd=this.getUniqID()
this.cbIds[rnd]=arg1
}

var paramsarr=[]
if(this.type=='wsApp')paramsarr.push(this.appname)
paramsarr.push(1)
paramsarr.push(c)
paramsarr.push(rnd)

var args=[]
for(var i=n;i<arguments.size;i++)args.push(arguments[i])
//var appid=0
//args.push(appid)
if(args.size>0)paramsarr.push(args)
/*var str=JSON.encode(paramsarr)
sock.send(str)*/
this.sendData(paramsarr)
}
}


isConnected(){
if(this.isConnect==true)return true
return false
}

sendData(o){
if(this.isSendBinary==true){
var ba=new lang.utils.ByteArray
ba.writeObject(o)
this.sock.send(ba)
}else{
var str=JSON.encode(o)
this.sock.send(str)
}
}

sendByStream(streamid, params){
//var rnd = this.getUniqID()
var prms=[streamid]
if(params!=null){
for (var i=0; i < params.size; i++)prms.push(params[i])
}
var p=[]
if(this.type=='wsApp')p.push(this.appname)
p.push(3)
p.push(prms)
//alert(JSON.encode(p))
this.sendData(p)
}

createStream(id){
var s=new AnimalsGameStream(id,this)
this.streams[id]=s
return s
}

}