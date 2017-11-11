$( document ).ready(function() {

//GLOBAL VARIABLES
//=================================================================================================================


//FUNCTIONS
//=================================================================================================================
function getResults(){
    var searchTerm = $("#searchTerm").val().trim();
    var yearStart = $("#yrStart").val().trim() + "0101";
    var yearEnd = $("#yrEnd").val().trim() + "1231";
    var recordsToGet = $("#numberRecords").val();
    var url;
    console.log(yearEnd);
    
    if($("#yrStart").val().trim()==="" && $("#yrEnd").val().trim() ===""){
      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881";
    }
    else if($("#yrStart").val().trim()===""){
      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881&end_date=" + yearEnd;
    }
    else if($("#yrEnd").val().trim() ===""){
      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881&begin_date=" + yearStart;
    }
    else{
      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881&begin_date=" + yearStart + "&end_date=" + yearEnd;
    }
    
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
      
      if (recordsToGet == 10){
        for(var i = 0; i < 10; i++){
          $("#theResults").append( "<h3 id='resuldHead'>" + result.response.docs[i].headline.main + "</h3>" +
                                  "<p id='snippet'>" + result.response.docs[i].snippet + "</p>" +
                                  "<a href='" + result.response.docs[i].web_url + " ' target='_blank'><p id='snippet'>" + result.response.docs[i].web_url + "</p></a></div><hr>");      
        }
      }
      
      else if (recordsToGet == 5){
        for(var j = 0; j < 5; j++){
          $("#theResults").append("<h3 id='resuldHead'>" + result.response.docs[j].headline.main + "</h3>" +
                                  "<p id='snippet'>" + result.response.docs[j].snippet + "</p>" +
                                  "<a href='" + result.response.docs[j].web_url + " ' target='_blank'><p id='snippet'>" + result.response.docs[j].web_url + "</p></a></div><hr>");        
        }
      }
      
      else{
          $("#theResults").append("<h3 id='resuldHead'>" + result.response.docs[0].headline.main + "</h3>" +
                                  "<p id='snippet'>" + result.response.docs[0].snippet + "</p>" +
                                  "<a href='" + result.response.docs[0].web_url + " ' target='_blank'><p id='snippet'>" + result.response.docs[0].web_url + "</p></a></div><hr>");        
      }
      
    });

}
//MAIN PROCESS
//=================================================================================================================

$("#search").on("click", function(){
    event.preventDefault();
    getResults();
});

$("#clear").on("click", function(){
    event.preventDefault();
    $("#theResults").empty();
});
})//Closes document.ready


//"<div id='oneResult'><p id='thumbNail'><img src='https://www.nyt.com/" + result.response.docs[i].multimedia[0].url + "' alt='thumbnail' /></p>" +
                                 

