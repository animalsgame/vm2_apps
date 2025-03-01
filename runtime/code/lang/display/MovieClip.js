class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
this.frames=[]
this.labels={}
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

}