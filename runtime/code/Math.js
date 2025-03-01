class Math{

static get E(){return 2.718281828459045}
static get PI(){return 3.141592653589793}
static get SQRT2(){return 1.4142135623730951}
static get SQRT1_2(){return 0.7071067811865476}
static get LN2(){return 0.6931471805599453}
static get LN10(){return 2.302585092994046}
static get LOG2E(){return 1.4426950408889634}
static get Log10E(){return 0.4342944819032518}
static native random(){}

static randomInt(q){
var max=10000000
if(q!=null)max=q
var v=Math.floor(Math.random()*max)
return v
}
static native abs(x){}
static native acos(x){}
static native asin(x){}
static native atan(x){}
static native atan2(y, x){}
static native ceil(x){}
static native cos(x){}
static native exp(x){}
static native floor(x){}
static native log(x){}
static native max(x,y){}
static native min(x,y){}
static native pow(x,y){}
static native round(x){}
static native sin(x){}
static native sqrt(x){}
static native tan(x){}
}