class Painter2{
Painter2(w,h){
this.w=w
this.h=h
}

createLinearGradient(x0,y0,x1,y1,colors,ratios){
var o={type:'linearGradient',p:[x0,y0,x1,y1],colors:colors,ratios:ratios}
return o
}

beginGradientFill(type,colors,ratios,x0,y0,x1,y1){
var o={type:'gradient',type:type,p:[x0,y0,x1,y1],colors:colors,ratios:ratios}
return o
}

native translate(x,y){}
native rotate(v){}
native scale(x,y){}
native fill(){}
native stroke(){}

native setTarget(spr){}
native clear(){}
native border(_thickness,_color,_alpha){}
native circle(x,y,radius,color){}
native lineStyle(_thickness,_color){}
native moveTo(x,y){}
native lineTo(x,y){}
native curveTo(controlX,controlY,anchorX,anchorY){}
native cubiqCurveTo(x1,y1,x2,y2,x3,y3){}
native arc(xc,yc,radius,angle1,angle2,anticlockwise){}
native beginFill(color,alpha){}
native endFill(){}
native rect(x,y,w,h,color){}
native rectRound(x,y,w,h,color,r){}
native rectRoundComplex(x,y,w,h,color,tl,tr,bl,br){}

}