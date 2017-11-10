$( document ).ready(function() {

//GLOBAL VARIABLES
//=================================================================================================================


//FUNCTIONS
//=================================================================================================================
function getResults(){
    var searchTerm = $("#searchTerm").val().trim();
    var yearStart = $("#yrStart").val().trim() + "0101";
    var yearEnd = $("#yrEnd").val().trim() + "1231";
    var recordsToGet = $("#numberRecords").text().trim();
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
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881&begin_date=" + yearStart;
    }
    
    else{
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm +
                "&api-key=e16a8ebfb69e4d109aa6c62af4b83881&begin_date=" + yearStart + "&end_date=" + yearEnd;
    }
    // if($("#yrStart").text().trim() === ""  )
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
      console.log(url);
      console.log(result.response.docs[0].headline.main);
      console.log(result.response.docs[0].snippet);
      
      for(var i = 0; i < result.response.docs.length; i++){
      $("#theResults").append("<h3 id='resuldHead'>" + result.response.docs[i].headline.main + "</h3>");
      $("#theResults").append("<p id='snippet'>" + result.response.docs[i].snippet + "</p>");
      $("#theResults").append("<a href='" + result.response.docs[i].web_url + " ' target='_blank'><p id='snippet'>" + result.response.docs[i].web_url + "</p></a>" + "<hr>");      
      }
    });

}
//MAIN PROCESS
//=================================================================================================================
//  getResults();   

$("#search").on("click", function(){
    event.preventDefault();
    getResults();

})  
})//Closes document.ready

