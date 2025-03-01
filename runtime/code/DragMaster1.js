class DragMaster1{
    DragMaster1(spr){
        var th=this
        this.spr=spr
        this.isV2=false
        if(spr!=null){
            if('mouseX' in spr)this.isV2=true
        }
        this._bounds=null
        this.startPos={x:0,y:0}
		this.isMultitouch=false
        this.cbMove=(e)=>{
            var xx=e.mouseX-th.startPos.x
            var yy=e.mouseY-th.startPos.y
            /*if(th.isV2==true){
            var xx=th.spr.mouseX-th.startPos.x
            var yy=th.spr.mouseY-th.startPos.y
            }*/
            var b=th._bounds
            if(b!=null){
                if(-xx<b.x)xx=-b.x
                if(-yy<b.y)yy=-b.y
                if(-xx>b.width)xx=-b.width
                if(-yy>b.height)yy=-b.height
            }
            
            th.spr.x=xx
            th.spr.y=yy
            /*if(th.isV2==true){
                e.updateAfterEvent()
            }*/
        }
    }
    
    start(){
        var th=this
        /*if(this.isV2==true){
        this.startPos.x=this.spr.mouseX
        this.startPos.y=this.spr.mouseY
        
        //alert(this.startPos.x,this.startPos.y)
        }else{*/
        var pos=System.grabMousePos()
        this.startPos.x=pos.x-this.spr.x
        this.startPos.y=pos.y-this.spr.y
        //}
        
        this.isMultitouch=false
        if('multitouch' in this.spr){
            if(this.spr.multitouch==true)this.isMultitouch=true
        }
        if(this.isMultitouch==true){
        //if(System.platform.type=='android'){
            this.spr.on('mousemove',this.cbMove)
        }else{
            this.spr.stage.on('mousemove',this.cbMove)
        }
        
    }
    
    stop(){
        //if(System.platform.type=='android'){
        if(this.isMultitouch==true){
            this.spr.off('mousemove',this.cbMove)
        }else{
            this.spr.stage.off('mousemove',this.cbMove)
        }
    }
}