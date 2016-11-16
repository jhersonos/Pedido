$( document ).ready(function() {
    
    $(".pedido-box").on('click',function(){
    	$('.ui.modal')
		  .modal({
		    blurring: true,
		    closable : true
		  })
		  .modal('show')
		;
    })
    function remove(id){
    	var tag = "#"+id;
    	var tagitem = "#item"+id;
    	$(tagitem).remove();
    	$(tag).prop('checked',false)
    }
});