class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
var th=this
this.scenesObj={}
this.curScene=null

th.register('Home',()=>{
var sp=sprite()
var sp2=sprite()
var txtSpr=sprite()
var butSpr=sprite()
var logoBM=bitmap('bird')
var allW=0
var txtArr=['Для создания скриншота найдите птичку на панели задач внизу','и нажмите на неё.']
var yy=0
var maxW=0
for (var i = 0; i < txtArr.length; i++){
var el=txtArr[i]
var tx=text(el,{color:0})
var tw=tx.width
if(maxW<tw)maxW=tw
tx.x=(maxW-tw)/2
tx.y=yy
yy=yy+tx.height
txtSpr.addChild(tx)
}

var but2=button('#6dbbee','Создать скриншот',()=>{
if(!$app.isStart)$app.isStart=true
$app.screenShot()
})
but2.visible=false
var but=button('#ff8500','Начать',()=>{
but.visible=false
but2.visible=true
but2.x=(allW-but2.width)/2
Timer.init(100,()=>{
this.stop()
$app.isStart=true
$app.readyScreen()
})
},{w:160})


sp.addChild(sp2)

sp2.addChild(logoBM,txtSpr)
sp2.addChild(butSpr)
butSpr.addChild(but)

vgroup(sp2,12)

allW=sp2.width
logoBM.x=(allW-logoBM.width)/2
but.x=(allW-but.width)/2
sp.resize=(w,h)=>{
sp2.x=(w-allW)/2
sp2.y=(h-sp2.height)/2
}
return sp
})

}

register(name,cb){
var th=this
if(name!=null){
if(cb!=null){
th.scenesObj[name]=cb
}
}
}

nav(name){
var th=this
if(name!=null){
if(name in th.scenesObj){
th.clear()
var args=[]
for(var i=1; i<arguments.size; i++)args.push(arguments[i])
var q=th.scenesObj[name]
var ob=q.apply(null,args)
th.curScene=ob
addChild(ob)
$app.autoResize()
}
}
}

resize(w,h){
var th=this
if(th.curScene!=null){
if('resize' in th.curScene)th.curScene.resize(w,h)
}
}

clear(){
var th=this
if(th.curScene){
if(th.curScene.parent)th.curScene.parent.removeChild(th.curScene)
if(th.curScene.removeScene)th.curScene.removeScene()
if(th.curScene.resize)th.curScene.resize=null
th.curScene=null
}
}

}