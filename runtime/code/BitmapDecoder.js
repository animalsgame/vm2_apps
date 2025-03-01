class %CURRENT_CLASSNAME%{

constructor(){
}

static(){
this.PIXELS=1<<1
this.BITMAPDATA=1<<2
this.INFO=1<<3
}

static native read(src){}
static native readAsync(src,cbok,cberr){}
static native writeByteArray(ba,src,props){}

rescale(ba,w,h,props){
if(!props)props={}
if(ba){
var cnv=new lang.display.Canvas
var ctx=cnv.getContext('2d')
if(ctx){
var format='png'
var type='image'
var quality=1
if(ba is lang.utils.ByteArray){
if(w>0 && h>0){
var newW=w
var newH=h
var bm=new lang.display.Bitmap
bm.src=ba
var imgW=bm.width
var imgH=bm.height
var sx=0
var sy=0
var cropObj=null
var crObj=props.crop
if(crObj && crObj.width>0 && crObj.height>0)cropObj=crObj
if(imgW>0 && imgH>0){
var cnvW=newW
var cnvH=newH
if(cropObj){
cnvW=cropObj.width
cnvH=cropObj.height
sx=cropObj.x
sy=cropObj.y
if(sx<0)sx=0
if(sy<0)sy=0

if(sx+cnvW>w){
cnvW=w-sx
sx=w
}

if(sy+cnvH>h){
cnvH=h-sy
sy=h
}

}

if(cnvW>0 && cnvH>0){
cnv.width=cnvW
cnv.height=cnvH
ctx.drawImage(bm,sx,sy,imgW,imgH,0,0,newW,newH)
if(props.format)format=props.format
if(props.quality)quality=props.quality/100
if(props.binary)type='binary'
var res=cnv.toDataURL(type+'/'+format,quality)
delete cnv
return res
}
}
}
}
}
}
return null
}

}