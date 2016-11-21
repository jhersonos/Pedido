$( document ).ready(function() {
    
    $(".pedido-box").on('click',function(){
        var id = $(".pedido-box")
        if (id.attr("id")=="on") {
           $('.ui.modal')
          .modal({
            blurring: true,
            closable : true
          })
          .modal('show')
        ; 
    }else{
        //console.log("Box disabled")
    }
    	
    })
    function remove(id){
    	var tag = "#"+id;
    	var tagitem = "#item"+id;
    	$(tagitem).remove();
    	$(tag).prop('checked',false)
    }
});