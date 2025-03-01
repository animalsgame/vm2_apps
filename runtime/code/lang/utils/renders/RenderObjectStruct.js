class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
}


callRMethod(spr,nm){
var cb=arguments.callee
if(spr!=null){
if(nm in spr){
var o=spr[nm]
if(o is Function)o()
}
if(spr is lang.display.Sprite){
for (var i = 0; i < spr.numChildren; i++) {
var el=spr.getChildAt(i)
cb(el,nm)
}
}
}
}


resizeDisplay(w,h){
this._resize(this,w,h)
}

_resize(spr,w,h){
var cb=arguments.callee
if(spr!=null){
if('onresize' in spr)spr.onresize(w,h)
if(spr is lang.display.Sprite){
for (var i = 0; i < spr.numChildren; i++) {
var el=spr.getChildAt(i)
cb(el,w,h)
}
}
}
}

render(o,spr){
if(spr==null)spr=this
var r=this._render(o,spr)
return r
}

_render(o,spr){
var th=this
if(spr==null)spr=new lang.display.Sprite
if(o!=null){
if(spr!=null){
var t=o.type
var el=null
if(t=='movie'){
el=new lang.display.Sprite
if('list' in o){
for (var i = 0; i < o.list.size; i++)th._render(o.list[i],el)
}
}else if(t=='img'){
el=new lang.display.Bitmap
//if('src' in o)el.src=o.src
}else if(t=='text'){
el=new lang.text.TextField
}else if(t=='canvas'){
el=new lang.display.Canvas

if('list' in o){
for (var i = 0; i < o.list.size; i++)th._render(o.list[i],el)
}

var fpsV=24
if('fps'in o)fpsV=o.fps
var fps=new lang.utils.FpsMaster
fps.framerate=fpsV
fps.run()
fps.add(el)
el.fpsMaster=fps
//if('update' in o)fps.setCallback(o.update)
fps.setCallback(()=>{
th.callRMethod(el,'update')
})

}else if(t=='rect'){
el=new lang.display.Sprite
el.createPainter()
var fill='#000000'
if('fill' in o)fill=o.fill
if('width' in o && 'height' in o)el.painter.rect(0,0,o.width,o.height,fill)
el.painter.fillData=fill
}
if(el!=null){
if('name' in o){
var nm=o.name
spr[nm]=el
}
spr.addChild(el)

for(var n in o){
var rr=true
if(n=='type')rr=false
else if(n=='name')rr=false
//else if(n=='width')rr=false
//else if(n=='height')rr=false
if(n.size>2){
var v=o[n]
var nm=n.cut(0,2)
if(nm=='on'){
var evType=n.cut(2)
if(evType=='click')el.buttonMode=true
if(evType!='resize'){
if(v is Function)el.on(evType,v)
rr=false   
}
}
}
if(rr==true)el[n]=o[n]
}

if(el is lang.text.TextField){
if('textFieldOffsetY' in GLOBAL)el.y=el.y+GLOBAL.textFieldOffsetY
}

if('onresize' in o)el.onresize=o.onresize
}
}
}
return spr
}

}