$( document ).ready(function() {
    
    $(".pedido-box").on('click',function(){
        var id = $(".pedido-box")
        if (id.attr("id")=="on") {
           $('#pro')
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
    $("#co").on('click',function(){
      $("#correct").modal({
            blurring: true,
            closable : true
          }).modal('hide')      
    })
    $("#vale").on('click',function(){
      $('#complete').modal({
            blurring: true,
            closable : true
          }).modal('hide');
    })
    $(".closem").on('click',function(){
        $('#pro')
          .modal({
            blurring: true,
            closable : true
          })
          .modal('hide');
    })

    $("#close").on('click',function(){
          $('#error').modal({
            blurring: true,
            closable : true
          }).modal('hide')
    })
    $("#ok").on('click',function(){
      $("#sav").attr("disabled",false)
        $("#sav").removeClass("loading")
        $("#restaurant-list").val("");
        $("#local-list").val("").attr("disabled",true);
        $("#comentarios").val("");  
        $("#distrito").val("");
        $("#total").val("");
        $("#destino").val("");
        $("#referencia").val("");
        $("#name-client").val("");
        $("#tipo-pago").val("");
        $("#delivery").val("");
        $("#monto-cobrar").val("");     
        $("#list-product .item").removeClass("show")
        $("#list-product .item").addClass("none");
        $('.pedido-box .center-box').attr('id','label-off')
        $('.pedido-box').attr('id','off')
        $('.prex').removeClass('pshow')
        $('.prex').addClass('pnone')
        $('#error').modal({
            blurring: true,
            closable : true
          }).modal('hide')
    })

});