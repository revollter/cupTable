$(document).ready(function(){
$('.startButton').click(function(){
   window.location.href='competition.html';
});
function anime(){
    setTimeout(function(){
        $('#1').css({'background-color':'red'});
    }, 1400);
    
    setTimeout(function(){
        $('#5').css({'background-color':'red'});
        $('#5').html('Player one');
    }, 1600);
    
    setTimeout(function(){
        $('#4').css({'background-color':'white'});
    }, 2400);
   
    setTimeout(function(){
        $('#6').css({'background-color':'white'});
        $('#6').html('Player four');
    }, 2600);
    
    setTimeout(function(){
        $('#7').css({'background-color':'red'});
        $('#7').html('Player one');
    }, 3600);
        
    setTimeout(function(){
       $('#1').css({'background-color':'grey'});
       $('#5').css({'background-color':'grey'});
       $('#4').css({'background-color':'grey'});
       $('#6').css({'background-color':'grey'});
       $('#7').css({'background-color':'grey'});
       $('#5').empty();
       $('#6').empty();
       $('#7').empty();
    }, 4000);
    
    setTimeout(function(){
        anime();
    }, 4200);
}

anime();
});

