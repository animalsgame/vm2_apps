class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(bm){
var th=this
this.firstRsz=false
this.targetProps={bitmapTarget:$app.cnv,bmTarget:bm}
this.ww=0
this.hh=0
this.curItemSpr=null
this.cnt=sprite()
this.cnt2=sprite()
this.bm=bm
this.bmPen=new lang.display.Bitmap
this.bmPen.mouseEnabled=false
this.scV=1/$app.allScale
/*if(bm){
bm.scaleX=scV
bm.scaleY=scV
}*/
th.cnt.scaleX=th.scV
th.cnt.scaleY=th.scV

this.bmdPen=null
this.ev=events()
this.ev2=events()
this.ev3=events()
this.rectV=new lang.geom.Rectangle
var st=th.stage
this.rectSelect=new lang.display.Sprite
this.rectSelect.alpha=0.5
this.rectSelect.createPainter()
this.rectSelect.isDragItem=true

addChild(this.cnt)

th.panel=new EditorPanel(th)
th.panel.targetProps=th.targetProps
th.panel.cbTint=(v)=>{
th.bm.tint=v
}

th.panel.thicknessCB=(v)=>{
if(th.curItemSpr){
if(th.curItemSpr.setSize){
th.curItemSpr.setSize(v)
var lastText=th.curItemSpr.ti.value
th.curItemSpr.setText('')
th.curItemSpr.setText(lastText)
}
}
}

th.panel.selectCB=(item)=>{
var isQ=true
if(item && item.type!='select')isQ=false
th.cnt2.mouseEnabled=isQ
}

th.panel.cbHex=(v)=>{
    
if(th.curItemSpr){
if(th.curItemSpr.setColor){ // для цвета текста
var decc=hexToDec(v)
th.curItemSpr.setColor(decc)
}
}
    
/*if(th.curItemSpr && th.curItemSpr.itemObj){
var tt=th.curItemSpr.itemObj.type
if(tt=='rectfill'){
var ww=th.curItemSpr.width
var hh=th.curItemSpr.height
th.curItemSpr.painter.clear()
th.curItemSpr.painter.rect(0,0,ww,hh,v)
}else if(th.curItemSpr is RectBorder){
th.curItemSpr.color=v
th.curItemSpr.resize(th.curItemSpr.w,th.curItemSpr.h)
}
}*/
}

th.ev.on(st,'drop',(e)=>{
var filesArr=e.files
if(filesArr && filesArr.length>0){
for (var i = 0; i < filesArr.length; i++) {
var fi=filesArr[i]
th.addImageFile(fi)
}
}
})

/*this.ev.on(spr,'mousedown',(e)=>{
spr.startDrag()
th.ev3.on(st,'mouseup',(e)=>{
th.ev3.clear()
spr.stopDrag()
})
})*/

var rclickItem=()=>{
var targ=this
if(targ && targ.parent){
targ.parent.removeChild(targ)
if(targ==th.curItemSpr)th.curItemSpr=null
}
}

this.rectSelect.rclick=()=>{
this.painter.clear()
this.x=0
this.y=0
th.rectV.x=0
th.rectV.y=0
th.rectV.width=0
th.rectV.height=0
}

var helpSpr=sprite()
helpSpr.mouseEnabled=false
th.helpSpr=helpSpr
var txtSpr=sprite()
var helpW=480
var helpH=150
th.helpW=helpW
var arr=['Выделите область и нажмите ENTER','Если область не выбрана - весь экран','Для отмены нажмите ESCAPE','Ссылка на скриншот будет в буфере обмена.']

if(bm){
var logoBM=bitmap('birdMin')
logoBM.x=28
logoBM.y=8

for (var i = 0; i < arr.length; i++) {
var txt=arr[i]
var tf=text(txt,{bold:true,color:Config.borderColorV})
tf.x=(helpW-tf.width)/2
txtSpr.addChild(tf)
}
vgroup(txtSpr,6)

var r1=sprite()
r1.createPainter()
r1.painter.border(4,Config.borderColorV)
r1.painter.rect(0,0,helpW,helpH,'#FEFEFE')
helpSpr.addChild(r1,logoBM,txtSpr)

//helpSpr.x=(($app.stageSize.w/$app.allScale)-helpW)/2
helpSpr.y=100

txtSpr.y=(helpH-txtSpr.height)/2
addChild(/*th.rectSelect,*/helpSpr,th.panel)

th.cnt.addChild(bm,th.cnt2,th.bmPen,th.rectSelect)
var keyui=lang.ui.Keyboard
this.ev.on(st,'keyup',(e)=>{
if(e.keyCode==keyui.ESCAPE){
th.cancelScreenNoHide()
}else if(e.keyCode==keyui.ENTER){
if(th.panel && th.panel.cbSaveSrv)th.panel.cbSaveSrv()
/*th.createScreen((res)=>{
if(res=='ok'){
if(th.screenScene)th.removeScene()
System.gc()
$app.readyScreen()
}
})*/
}
})

var pixFind=sprite()
pixFind.createPainter()
addChild(pixFind)

/*var bmd2=new lang.display.BitmapData(1,1,true,0)

var mat=new lang.geom.Matrix

th.ev.on(bm,'mousemovee',(e)=>{
var pos=mousePos(th,e)

if(pos.x<th.bm.width && pos.y<th.bm.height){
th.cnt.x=-pos.x
th.cnt.y=-pos.y
bmd2.draw(th.cnt)
th.cnt.setMatrix(mat)
var pix=bmd2.getPixel(0,0)
if(pix[3]>0){
var alp=pix[3]/255
var vv=RGBToHex(pix)
pixFind.painter.clear()
pixFind.painter.rect(0,0,50,50,vv)
th.panel.selectColor=hexToDec(vv)
}
}

})*/

/*th.ev.on(st,'click',(e)=>{
alert(e.target)
})*/

th.ev.on(bm,'mousedown',(e)=>{

var poss=mousePos(th.cnt,e)
var dragPos={}
var minVal=30

dragPos.x=poss.x
dragPos.y=poss.y

var itemm=th.panel.selectItem
var clr=th.panel.selectColor
var thicknessLine=th.panel.thicknessSize
var isTransparent=false
if(th.panel.alphaColor<0.12)isTransparent=true

if(itemm){
th.curItemSpr=null

if(itemm.type!='select'){
if(helpSpr && helpSpr.parent){
helpSpr.parent.removeChild(helpSpr)
helpSpr=null
}
}

if(itemm.type=='select'){

th.ev2.on(st,'mousemove',(e)=>{
var pos=mousePos(th.cnt,e)

var _x = Math.min(pos.x,dragPos.x)
var _y = Math.min(pos.y,dragPos.y)
var w = Math.abs(pos.x-dragPos.x)
var h = Math.abs(pos.y-dragPos.y)
w=Math.floor(w)
h=Math.floor(h)
_x=Math.floor(_x)
_y=Math.floor(_y)
if(w<minVal)w=minVal
if(h<minVal)h=minVal

if(helpSpr && helpSpr.parent){
helpSpr.parent.removeChild(helpSpr)
helpSpr=null
}

th.rectSelect.painter.clear()
th.rectSelect.painter.rect(0,0,w,h,'#000000')
th.rectSelect.x=_x
th.rectSelect.y=_y
th.rectV.x=_x
th.rectV.y=_y
th.rectV.width=w
th.rectV.height=h
})
}else if(itemm.type=='pencil' || itemm.type=='eraser'){
clr=hexToDec(clr)
if(!th.bmdPen){
th.bmdPen=new lang.display.BitmapData(th.bm.width,th.bm.height,true,0)
th.bmPen.src=th.bmdPen
}
//if(isTransparent)thicknessLine=15
var fillRect=new lang.geom.Rectangle(0,0,thicknessLine,thicknessLine)
var startPos2=poss
var alphaV=1
if(itemm.type=='eraser')alphaV=0

var cbDrawLine=(x,y)=>{
fillRect.x=x
fillRect.y=y
th.bmdPen.fillRect(fillRect,clr,alphaV)
}

th.ev2.on(st,'mousemove',(e)=>{
var pos=mousePos(th.cnt,e)

if(pos.x<th.bmPen.width && pos.y<th.bmPen.height){
    
var xx=pos.x
var yy=pos.y
var x1=startPos2.x
var y1=startPos2.y
var x2=xx-fillRect.width/2
var y2=yy-fillRect.height/2

th.drawline(x1,y1,x2,y2,cbDrawLine)

startPos2.x=x2
startPos2.y=y2

/*fillRect.x=pos.x
fillRect.y=pos.y
th.bmdPen.fillRect(fillRect,clr)*/
}

})

}else if(itemm.type=='rectfill' || itemm.type=='rect'){

var isFill=false
if(itemm.type=='rectfill')isFill=true

var sp2=null
if(isFill){
sp2=sprite()
sp2.createPainter()
}else{
sp2=new RectBorder(clr,thicknessLine)
}
sp2.isDragItem=true
sp2.itemObj=itemm
th.curItemSpr=sp2
sp2.rclick=rclickItem
//sp2.mouseEnabled=false
th.cnt2.addChild(sp2)

th.ev2.on(st,'mousemove',(e)=>{
var pos=mousePos(th.cnt,e)
var _x = Math.min(pos.x,dragPos.x)
var _y = Math.min(pos.y,dragPos.y)
var w = Math.abs(pos.x-dragPos.x)
var h = Math.abs(pos.y-dragPos.y)
w=Math.floor(w)
h=Math.floor(h)
_x=Math.floor(_x)
_y=Math.floor(_y)
if(w<minVal)w=minVal
if(h<minVal)h=minVal

if(isFill){
sp2.painter.clear()
sp2.painter.rect(0,0,w,h,clr)
}else{
sp2.resize(w,h)
}

/*sp2.painter.clear()
if(isFill){
sp2.painter.rect(0,0,w,h,clr)
}else{
sp2.painter.rect(0,0,w,thickness,clr)
sp2.painter.rect(0,0,thickness,h,clr)
sp2.painter.rect(w-thickness,0,thickness,h,clr)
sp2.painter.rect(0,h-thickness,w,thickness,clr)
}*/
sp2.x=_x
sp2.y=_y
})

}else if(itemm.type=='text'){
var tiInp=new InputSpr
tiInp.setSize(thicknessLine)
tiInp.setColor(clr)
tiInp.setText('Текст')
tiInp.ti.isDragItem=true
tiInp.ti.itemObj=itemm
tiInp.ti.on('mousedown',()=>{th.curItemSpr=this.parent})
tiInp.x=poss.x
tiInp.y=poss.y
th.curItemSpr=tiInp
tiInp.ti.rclick=rclickItem
th.cnt2.addChild(tiInp)
if(th.panel && th.panel.selectItemType)th.panel.selectItemType('select')
}

}

th.ev2.on(st,'mouseup',()=>{th.ev2.clear()})
})

th.ev.on(st,'resize',(e)=>{
var w=$app.stageScale.w
var h=$app.stageScale.h
th.resize(w,h)
})

}

}


drawline(x1, y1, x2, y2, cb){
    var x=0;
    var y=0;
    var dx=0;
    var dy=0;
    var dx1=0;
    var dy1=0;
    var px=0;
    var py=0;
    var xe=0;
    var ye=0;
    var i=0;
    
    dx = x2 - x1;
    dy = y2 - y1;
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    
    if (dy1 <= dx1) {
        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }
        
        cb(x,y)
        
        for (i = 0; x < xe; i++) {
            x = x + 1;
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }
            
            cb(x,y)
        }
        
    } else {
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        }else{
            x = x2; y = y2; ye = y1;
        }
        
        cb(x,y)
        
        for (i = 0; y < ye; i++) {
            y = y + 1;
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            cb(x,y)
        }
    }
 }
 
 
getScreenBitmap(){
var th=this
var allW=th.bm.naturalWidth
var allH=th.bm.naturalHeight
var origW=allW
var origH=allH
var bm2=null

th.rectSelect.painter.clear()

var rect=th.rectV

rect.x=th.rectSelect.x
rect.y=th.rectSelect.y

if(System.getMonitorInfo){

}else{
rect.x=rect.x*th.scV
rect.y=rect.y*th.scV
}

if(rect.width==0)rect.width=allW
if(rect.height==0)rect.height=allH

var isFull=false
if(rect.width==allW && rect.height==allH)isFull=true

if(rect){
allW=rect.width
allH=rect.height
}

if(rect){
if(rect.x<0){
allW=rect.width+rect.x
rect.x=0
}
if(rect.y<0){
allH=rect.height+rect.y
rect.y=0
}
if(rect.x+rect.width>origW)allW=origW-rect.x
if(rect.y+rect.height>origH)allH=origH-rect.y
}

var lastCntScaleX=th.cnt.scaleX
var lastCntScaleY=th.cnt.scaleY

if(allW>0 && allH>0){
if(!isFull && rect){
this.cnt.x=-rect.x
this.cnt.y=-rect.y
}

if($app.isVM2V11){
th.cnt.scaleX=1
th.cnt.scaleY=1
}

var bmd=new lang.display.BitmapData(allW,allH,true,0)
bmd.draw(this.cnt)

th.cnt.scaleX=lastCntScaleX
th.cnt.scaleY=lastCntScaleY

if(!isFull && rect){
this.cnt.x=0
this.cnt.y=0
}
bm2=new lang.display.Bitmap
bm2.src=bmd
bm2.bmdData=bmd
return bm2
}
return null
}


addImageFile(fi){
var th=this

var rclickItem=()=>{
var targ=this
if(targ && targ.parent){
targ.parent.removeChild(targ)
if(targ==th.curItemSpr)th.curItemSpr=null
}
}

if(fi){
var nm=fi.name
if(nm){
var spl=nm.split('.')
var extFile=spl.pop()
if(extFile=='png' || extFile=='jpeg' || extFile=='jpg' || extFile=='gif'){
var ba=fi.readBytes()
var bm2=new lang.display.Bitmap
bm2.isDragItem=true
bm2.src=ba
if(bm2.width>0 && bm2.height>0){
bm2.rclick=rclickItem
th.cnt2.addChild(bm2)
}
}
}
}
}

createScreen(cb){
var th=this
var bm2=th.getScreenBitmap()
if(!cb)this.removeScene()
if(bm2){
this.saveScreenServer(bm2,cb)
}
}

saveFile(){
var th=this
var bm2=th.getScreenBitmap()
if(bm2){
var ts=Date.now()
var nm='screen_'+ts+'.png'
if(!$app.isAutoFileRsz)th.stage.displayState='normal'
var fi=new lang.io.File(nm)
var res=fi.saveDialog(bm2.bmdData)
if(res){
this.removeScene()
$app.readyScreen()
}
}
}

cancelScreen(){
var th=this
$app.isStart=false
$app.scenesMaster.nav('Home')
th.removeScene()
$app.readyScreen()
}

cancelScreenNoHide(){
var th=this
$app.isStart=false
$app.scenesMaster.nav('Home')
th.removeScene()
$app.readyScreenNoMin()
}

removeScene(){
var th=this
th.ev.clear()
th.ev2.clear()
th.ev3.clear()
if(th.parent)th.parent.removeChild(th)
destroyItem(th)
$app.windowMaster.closeAll()
}

resize(w,h){
var th=this
th.ww=w
th.hh=h
th.helpSpr.x=(w-th.helpW)/2
th.panel.resize(th.panel.w,th.panel.h)
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
var th=this
if(ba){
    
if($app.vm2Acc==null){
var account=th.loadAccountVM2()
if(account!=null)$app.vm2Acc=account
}

var props={guest:1}
var acc=$app.vm2Acc
if(acc)props={vm2_login:acc.login,vm2_pass:acc.pass}
props.img=ba

URL.post(Config.uploadURL,props,(o)=>{
if(o && o.data)o=o.data
var isOk=false
if(o.url)isOk=true
if(isOk){
if(cbok)cbok(o.url)
}else{
if(cberr)cberr()
}
},()=>{
if(cberr)cberr()
})
}
}

saveScreenServer(bm,cb){
var th=this

var rnd=Math.randomInt(1000000)
var fullPathAppsShared='screens'

var fi=new lang.io.File(fullPathAppsShared)
var isExists=fi.exists()
if(isExists==false)fi.mkdir()

var fi=new lang.io.File(fullPathAppsShared+'/screen'+rnd+'.png')
fi.write(bm.bmdData)
var ba=fi.readBytes()
fi.delete()

if(ba){
th.uploadScreenSS(ba,(urlV)=>{
System.setClipboard(urlV)
//System.exec('open '+urlV)
if(cb)cb('ok')
//$app.readyScreen()
},()=>{
if(cb)cb('error')
//alert('Ошибка загрузки скриншота.')
})
}
}

}