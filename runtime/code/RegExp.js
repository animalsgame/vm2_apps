class RegExp {

RegExp(str,flags){
this.str=str
this.flags=flags
}

native test(s){}
native exec(s){}
native match(s){}

}