class Redis{

Redis(){}
CALL(name,args){
//if(name=='connect')this.connect()
return this.query(name,args)
}

native query(name,args){}

}