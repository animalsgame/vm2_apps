class Timer{

static init(_interval,_cb){
var tm=new Timer
tm.interval=_interval
tm.cb=_cb
tm.start()
return tm
}
static initOne(_interval,_cb){
var tm=new Timer
tm.interval=_interval
tm.cb=()=>{
this.stop()
_cb()
}
tm.start()
return tm
}

native start(){}
native stop(){}


}