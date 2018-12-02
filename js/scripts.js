var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    console.log('vid loaded');
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'IoCVrkcaH6Q'
  });
}


$(function(){
  console.log('scripts loaded');


  var myKey = config.MY_KEY;
  var userFood1 = document.getElementById('ingredient-search1');
  var userFood2 = document.getElementById('ingredient-search2');
  var userIng1 = '';
  var userIng2 = '';
  var btn = document.getElementById('submit');
  var foodbtn = document.getElementById('Search');


  btn.addEventListener('click', function(){
    console.log("chosenFood1");

    var url= "";
    var data= [];
    var html= '';

    $.ajax({
        url: "https://data.mo.gov/resource/ik3n-3nbb.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "KEY!"
        },
        success:function(data){
          alert("Retrieved " + data.length + " records from the dataset!");
          console.log(data);
          //console.log(foody.map(data => data.title));
        /*  foody.forEach(function(data){
            console.log(data.title);
            html += '<div class="latest-news flex">';
            html += '<img class="thumbnail" src="' + data.image_url + '">';
            html += '<div class="text">';
            html += '<a href="' + data.f2f_url + '" target="blank">';
            html += '<h2 class="headline">' + data.title + '</h2>';
            html += '<h4 class="byline"> by ' + data.publisher + ', <em>' + data.social_rank + '</em></h4>';
            html += '</a></div>';
            html += '</div>';

          }); // foreach
          $('#results').html(html); */

        } // success function
}); // close ajax
  }); // close button


  btn.addEventListener('click', function(){
    userIng1 = userFood1.value;
    userIng2 = userFood2.value;
    console.log(userIng1);
    console.log(userIng2);


    var chosenFood1 = '&q=' + userIng1 ;
    var chosenFood2 = '%20' + userIng2 + '&page=1';
    console.log(chosenFood1);

    var url= 'https://www.food2fork.com/api/search?key=' + myKey + chosenFood1 + chosenFood2;
    var url2 = 'https://www.food2fork.com/api/get?key=' + myKey + '&rId=35382';
    var data= [];
    var html= '';
    // var urlArray=[url, url2];
    var i='';

    //for(i=0; i<urlArray.length; i++){

    $.ajax({
      type:'GET',
      url: url,
      dataType: 'json',
      async: true,
      data: data,
      success:function(data){
        var foody=data.recipes;
        console.log(foody);
        console.log(url);
        //console.log(foody.map(data => data.title));
        foody.forEach(function(data){
          console.log(data.title);
          html += '<div class="latest-news flex">';
          html += '<img class="thumbnail" src="' + data.image_url + '">';
          html += '<div class="text">';
          html += '<a href="' + data.f2f_url + '" target="blank">';
          html += '<h2 class="headline">' + data.title + '</h2>';
          html += '<h4 class="byline"> by ' + data.publisher + ', <em>' + data.social_rank + '</em></h4>';
          html += '</a></div>';
          html += '</div>';

        }); // foreach
        $('#results').html(html);

      } // success function

    }); // ajax

    //} //close loop

  }); // close button

}); // close wrapper
