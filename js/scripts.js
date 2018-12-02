// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
  console.log('vid loaded');
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'bdBi1LAOoek'
  });
}
// jq wrapper
$(function(){
  console.log('scripts loaded');

  var myKey = config.MY_KEY;
  var foodToken = config.appToken;
  var secretToken = config.secret;
  var userFood1 = document.getElementById('ingredient-search1');
  var userFood2 = document.getElementById('ingredient-search2');
  var userIng1 = '';
  var userIng2 = '';
  var btn = document.getElementById('submit');
  var foodbtn = document.getElementById('search');
  var getFood = document.getElementById('food-search');
  var findFood = '';

  /*foodbtn.addEventListener('click', function(){
    var url= "";
    var data= [];
    var html= '';
    findFood = getFood.value;
    console.log(findFood);

    $.ajax({
      url: "https://data.mo.gov/resource/ik3n-3nbb.json",
      type: "GET",
      data: {
        "$limit" : 5000,
        "$$app_token" : foodToken
      },
      success:function(data){
        var state = data.map(data => data.location_state);
        var address = data.map(data => data.location_address);
        var city = data.map(data => data.location_city);
        var zip = data.map(data => data.location_zip);
        var agency = data.map(data => data.agency_name);
        var county = data.map(data => data.county);
        var phone = data.map(data => data.phone_number);

        var tablehtml ='';
        var tableContent = document.getElementById('table-content');
        function buildTable(){
          tablehtml += '<tr><th>Agency</th><th>Phone Number</th><th>Address</th></tr>';
          for (i=0; i < data.length; i++){
          //  if(findFood === city[i] || state[i] || zip[i]){
          if(findFood === city[i] || findFood === state[i] ||findFood === zip[i] ){
              tablehtml += '<tr>';
              tablehtml += '<td>' + agency[i] + '</td><td>' + phone[i] + '</td><td>' + address[i] + city[i] + state[i] + zip[i] + '</td>';
              tablehtml += '</tr>';
            } // close if
          }  // close forloop
          tableContent.innerHTML = tablehtml;
        } // close buildtable
        buildTable();

      } // success function
    }); // close ajax
  }); // close button */


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
    var i='';

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
        console.log(foody.map(data => data.title));
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

  }); // close button

}); // close wrapper
