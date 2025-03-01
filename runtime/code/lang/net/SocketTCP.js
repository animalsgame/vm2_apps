class SocketTCP extends lang.events.EventDispatcher{
SocketTCP(){}
native connect(host,port){}
native send(o){}
native address(){}
native bind(port){}
native close(){}
}