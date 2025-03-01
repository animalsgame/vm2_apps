class SocketUDP extends lang.events.EventDispatcher{
SocketUDP(){}
native connect(host,port){}
native send(o){}
native sendto(o,host,port){}
native address(){}
native bind(port){}
native close(){}
}