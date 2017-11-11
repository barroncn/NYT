$(document).ready(function() {

//FUNCTIONS
//==========================================================================================================================================================
  function getResults(){
    var searchTerm = $("#searchTerm").val().trim();
    var yearStart = $("#yrStart").val().trim();
    var yearEnd = $("#yrEnd").val().trim();
    var recordsToGet = $("#numberRecords").val();
    
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e16a8ebfb69e4d109aa6c62af4b83881&q=" + searchTerm;
    var queryURL;
    
    if(yearStart === "" && yearEnd === ""){
      queryURL = url;
    }
    else if(yearStart === ""){
      queryURL = url + "&end_date=" + yearEnd + "1231";
    }
    else if(yearEnd === ""){
      queryURL = url + "&begin_date=" + yearStart +"0101";
    }
    else{
      queryURL = url + "&begin_date=" + yearStart + "0101&end_date=" + yearEnd + "1231";
    }
    
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).done(function(result) {
      
      for(var j = 0; j < recordsToGet; j++){
          $("#theResults").append("<h3 id='resultHead'>" + result.response.docs[j].headline.main + "</h3>" +
                                  "<p id='snippet'>" + result.response.docs[j].snippet + "</p>" +
                                  "<a href='" + result.response.docs[j].web_url + "' target='_blank'><p id='theLink'>" + result.response.docs[j].web_url + "</p></a></div><hr>");
      }
    });
  }//Closes getResults
  
//MAIN PROCESS
//===========================================================================================================================================================

  $("#search").on("click", function(){
     event.preventDefault();
     getResults();
  });

  $("#clear").on("click", function(){
     event.preventDefault();
     $("#theResults").empty();
  });
  
});//Closes document.ready

//Add to get a thumbnail: (but older searches don't have a thumbnail so they return errors...)
//"<div id='oneResult'><p id='thumbNail'><img src='https://www.nyt.com/" + result.response.docs[i].multimedia[0].url + "' alt='thumbnail' /></p>" +
                                 

