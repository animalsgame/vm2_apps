class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
this.LEFT=1
this.RIGHT=2
this.UP=3
this.DOWN=4
this.A=5
this.B=6
this.START=7
this.SELECT=8
}

native keyHandler(key,down){}
native loadBytes(ba){}
native saveState(){}
native loadState(ba){}
native destroy(){}

}