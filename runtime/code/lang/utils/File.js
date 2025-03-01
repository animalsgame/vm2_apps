class File{

File(){
}

native delete(path){}
native isExists(path){}
native saveBytes(ba,path){}
native saveString(s,path){}

native readBytes(cb){}
native readString(cb){}
}