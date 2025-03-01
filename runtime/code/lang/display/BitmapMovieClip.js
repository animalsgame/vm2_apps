class BitmapMovieClip extends lang.display.DisplayObject{

BitmapMovieClip(_bitmap){
this.frames=[]
this.labels={}
this.bitmap=_bitmap
this.currentFrame=0
}

addFrame(v,name){
var th=this
if(name==null){
var sz=th.frames.size
th.labels[sz]=v
}else{
th.labels[name]=v
}
th.frames.push(v)
}

gotoAndPlay(v){
this.currentFrame=v
this.isStop=false
}
gotoAndStop(v){
this.currentFrame=v
this.isStop=true
}

//native addBMC(v){}

}