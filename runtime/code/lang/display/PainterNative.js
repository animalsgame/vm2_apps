class PainterNative{
PainterNative(){}
native setTarget(o){}
native border(_thickness,_color,_alpha){}
native lineStyle(_thickness,_color){}
createLinearGradient(x0,y0,x1,y1,colors,ratios){
var o={type:'linearGradient',x0:x0,y0:y0,x1:x1,y1:y1,colors:colors,ratios:ratios}
return o
}
native beginGradientFill(type,colors,ratios,x0,y0,x1,y1){}
native beginFill(color,alpha){}
native endFill(){}
native circle(x,y,radius,color){}
native rect(x,y,w,h,color){}
native rectRound(x,y,w,h,color,r){}
native clear(){}
}