window.onload = function(){

    document.getElementById("create").addEventListener("click", function(event){
    event.preventDefault();
    });
    
    document.getElementById("create").onclick = function(){
        clearCompetition();
        jQueryHideShow(['#addingDiv', '#show', '#randomize']);
        document.getElementById('cancel').style.display = 'none';
        
        players = document.getElementsByName("players")[0].value.split("\n");
        players_number = players.length;
        shuffle(players);
        countingVariables(players_number);
        cells_number = counting_all_cells(first_round_cells);
        
        makeCompetitionTable();
        completeTable(pre_matches, empty_cells, playin_2, first_round_cells);
        jQueryMovment();
    };  
       
    document.getElementById("randomize").onclick = function(){
        clearCompetition();
        makeCompetitionTable();
        shuffle(players);
        completeTable(pre_matches, empty_cells, playin_2, first_round_cells);
        jQueryMovment();
    };
        
    document.getElementById("show").onclick = function(){
        jQueryHideShow(['#addingDiv', '#show', '#randomize', '#cancel']);           
    };
        
    document.getElementById("cancel").onclick = function(){
        jQueryHideShow(['#addingDiv', '#show', '#randomize', '#cancel']);
    }; 
    
};

function countingVariables(pn){
    var power_of_two = 1;
    while(power_of_two < pn){
        power_of_two *= 2;
    }

    pre_matches = (pn - (power_of_two/2));
    empty_cells = power_of_two - 2*pre_matches;
    playin_2 = pn - 2*pre_matches;
    first_round_cells = power_of_two;
}

function counting_all_cells(frc){
    var b = 0;
    while (frc >= 1){
        b += frc;
        frc /= 2;
    }
    return b;
}

function makeCompetitionTable(){
    var id = 1;
    var round_number = 1;
    
    while (id <= cells_number){
        var div_round = document.createElement("div");
        div_round.className = 'round';
        div_round.id = 'round' + round_number;
        
        document.getElementById('competition').appendChild(div_round);
        cells_in_round = first_round_cells/Math.pow(2, round_number-1);
        console.log(cells_number);
        e = 1;
        
        while ( e <= cells_in_round){
            var div_cell = document.createElement("div");
            div_cell.className =  'cell-' + round_number;
            div_cell.id = 'cell' + id;
            
            var div_name = document.createElement("div");
            div_name.className = 'name';
            div_name.id = id;
            
            document.getElementById('round' + round_number).appendChild(div_cell);
            document.getElementById('cell' + id).appendChild(div_name);
                if (round_number > 2){
                 var button = document.createElement("input");
                 var cell = document.getElementById('cell' + id);
                 
                button.setAttribute("type", "button");
                 button.className = 'clear';
                 button.value = "-";
                 cell.insertBefore(button, cell.childNodes[0]);
                }
            e++;
            id++;
        }
        round_number++;
    }
    
}

function completeTable(pm, ec, pin2, frc){
    var tabiter = 0;
    var id = 1;
    
    while (id <= frc){
        if(((id%4 == 1 || id%4 == 2) && (tabiter <= (pm*2)-1)) || (ec == 0)){
            document.getElementById(id).innerHTML = players[tabiter];
            tabiter++;
        } else if (ec >= 0) {
            document.getElementById(id).style.visibility = 'hidden';
            ec--;
        }
        id++;
    }

         while(id <= frc+(frc/2)){
             if ((id%2 == 1 && pm > 0) || pin2 <= 0){
                 
                 var button = document.createElement("input");
                 var cell = document.getElementById('cell' + id);
                 
                 button.setAttribute("type", "button");
                 button.className = 'clear';
                 button.value = "-";
                 cell.insertBefore(button, cell.childNodes[0]);
           
                 pm -= 1;
             
            } else if (pin2>0) {
                document.getElementById(id).innerHTML = players[tabiter];
                pin2--;
                tabiter++;
             }
             id++;
         }
}


function clearCompetition(){
    var div = document.getElementById("competition");
    while (div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {
   
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function jQueryHideShow(id){
    var i = 0;
    while(id[i]){
        if($(id[i]).is(':visible')){
            $(id[i]).animate({ height: 'hide' }); 
        }
          else{
            $(id[i]).animate({ height: 'show' }); 
        }
        i++;
    }
}

function jQueryMovment(){
        $('.name').click(function(){
        var id = parseInt($(this).attr('id'));
        var dest_id = 0;
           if (id%2 == 1) {
               dest_id = ((id+1)/2)+first_round_cells;
           } else {
               dest_id = (id/2)+first_round_cells;
           }
        $("#" + dest_id).html($("#" + id).clone());
        });
    
    
    $( ".clear" ).click(function() {    
        $(this).next().empty();
    });


}