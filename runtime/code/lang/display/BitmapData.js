class BitmapData{

BitmapData(w,h,transparent,fillColor){}
native draw(o){}
native drawStream(o){}
native getPixel(x,y){}
native getPixelInt(x,y){}
native getPixels(rect){}
native setPixel(x,y,color){}
native setPixel32(x,y,color){}
native setPixels(arr,rect){}
native copyPixels(bmd,rect,dest){}
native floodFill(x,y,color){}
native fillRect(rect,color){}
native updatePixels(){}
native dispose(){}
}