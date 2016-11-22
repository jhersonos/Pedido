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

});