$(function(){
  console.log('scripts loaded');
var myKey = config.MY_KEY;
var userFood1 = 'egg';
var userFood2 = 'bacon';
var chosenFood1 = '&q=' + userFood1 ;
var chosenFood2 = '%20' + userFood2 + '&page=2';

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
      //console.log(foody.map(data => data.title));

      foody.forEach(function(data){
        console.log(data.title);
      /*  html += '<div class="latest-news flex">';
          html += '<img class="thumbnail" src="' + food.image_url + '">';
          html += '<div class="text">';
          html += '<a href="' + food.image_url + '" target="blank">';
          html += '<h2 class="headline">' + food.title + '</h2>';
          html += '<h4 class="byline"> by ' + food.ingredients + ', <em>' + article.source.name + '</em></h4>';
          html += '</a></div>';
        html += '</div>'; */

      }); // foreach
      $('#results').html(html);

    } // success function

  }); // ajax

//} //close loop

});
