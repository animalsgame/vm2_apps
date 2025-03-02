class %CURRENT_CLASSNAME%{

constructor(){
this.w=31
this.h=31
this.mapLength=0
this.map=[]
}

rnd1(){
var rnd=Math.random()
if(rnd>0.5)return -1
return 1
}

setData(a,w,h){
if(a && w>0 && h>0){
this.w=w
this.h=h
this.map=a
this.mapLength=this.w*this.h
}
}

createDef(){
var th=this
var sz=th.h*th.w
if(sz>0){
th.map=new Array(sz)
th.map.fill(1)
th.setData(th.map,th.w,th.h)
}
}

setValue(x,y,v){
var th=this
var pos=(y*th.w)+x
th.map[pos]=v
}

getValue(x,y){
var th=this
var pos=(y*th.w)+x
return th.map[pos]
}


gen(x,y){
var th=this
var PATH=0
var WALL=1
var DIR_RIGHT=0
var DIR_DOWN=1
var DIR_LEFT=2
var DIR_UP=3

  var dirs=[DIR_RIGHT,DIR_DOWN,DIR_LEFT,DIR_UP]
  dirs.sort(th.rnd1)
  var isNoWay=true
  var mazeW=th.w
  var mazeH=th.h
  for (var i=0; i<dirs.length; i++){
      var dir=dirs[i]
    if (dir == DIR_RIGHT && x + 2 < mazeW && th.getValue(x+2,y) != PATH){
      th.setValue(x+1,y,PATH)
      th.setValue(x+2,y,PATH)
      isNoWay=false
      th.gen(x+2,y)
    }
    else if (dir == DIR_DOWN && y + 2 < mazeH && th.getValue(x,y+2) != PATH){
      th.setValue(x,y+1,PATH)
      th.setValue(x,y+2,PATH)
      isNoWay=false
      th.gen(x,y+2)
    }
    else if (dir == DIR_LEFT && x - 2 > 0 && th.getValue(x-2,y) != PATH){
      th.setValue(x-1,y,PATH)
      th.setValue(x-2,y,PATH)
      isNoWay=false
      th.gen(x-2,y)
    }
    else if (dir == DIR_UP && y - 2 > 0 && th.getValue(x,y-2) != PATH){
      th.setValue(x,y-1,PATH)
      th.setValue(x,y-2,PATH)
      isNoWay=false
      th.gen(x,y-2)
    }
  }
  if(isNoWay)return
}

render(bmd,itemSize,colors){
var th=this
var WALL=1
var hh=Math.floor(th.map.length/th.w)
var sz2=th.w*th.h
var rect=new lang.geom.Rectangle(0,0,itemSize,itemSize)
for (var ii = 0; ii < sz2; ii++){
var i=ii%th.w
var j=Math.floor(ii/th.w)
var vv=th.getValue(i,j)
rect.x=i*itemSize
rect.y=j*itemSize
var clr=(vv==WALL) ? colors[0] : colors[1]
bmd.fillRect(rect,clr)
}
//bmd.floodFill(0*itemSize,1*itemSize,0xFF0000)
}

}