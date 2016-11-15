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
});