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
  //variables for button, search boxes and Food2Fork API call for search results
  var myKey = config.MY_KEY;
  var foodToken = config.appToken;
  var secretToken = config.secret;
  var userFood1 = document.getElementById('ingredient-search1');
  var userFood2 = document.getElementById('ingredient-search2');
  var userIng1 = '';
  var userIng2 = '';
  var btn = document.getElementById('submit');
  //button
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
    // ajax call to Food2Fork API for interactive element: ingredients search results
    $.ajax({
      type:'GET',
      url: url,
      dataType: 'json',
      async: true,
      data: data,
      success:function(data){
        var foody=data.recipes;
        console.log(foody.map(data => data.title));
        foody.forEach(function(data){
          console.log(data.title);
          html += '<div class="recipe-ideas flex">';
          html += '<img class="thumbnail" src="' + data.image_url + '">';
          html += '<div class="text">';
          html += '<a class="ingLink" href="' + data.f2f_url + '" target="blank">';
          html += '<h2 class="recipe-name">' + data.title + '</h2>';
          html += '<h4 class="publisher"> by ' + data.publisher + '</h4>';
          html += '</a></div>';
          html += '</div>';

        }); // foreach
        html += '<div class="content flex">Try typing in different ingredients for more results! </div>';
        $('#results').html(html);

      } // success function

    }); // ajax

  }); // close button

  // charts.js chart on food waste

  var canvas = document.getElementById("barChart");
  var ctx = canvas.getContext('2d');

  // Global Options:
  Chart.defaults.global.defaultFontColor = 'black';
  Chart.defaults.global.defaultFontSize = 14;

  var data = {
    responsive: true,
    labels: ['0','Agricultural Production', 'Postharvest handling and storage', 'Processing and packaging', 'Distribution', 'Consumption'],
    datasets: [{
      label: "Cereals",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "blue",
      borderColor: "blue", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "blue",
      pointBackgroundColor: "blue",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "blue",
      pointHoverBorderColor: "blue",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 98, 96.04, 85.95, 84.23, 61.49],
      spanGaps: true,
    }, {
      label: "Roots and Tubers",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "red",
      borderColor: "red", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "red",
      pointBackgroundColor: "red",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "red",
      pointHoverBorderColor: "red",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 80, 72, 61.2, 56.91, 39.84],
      spanGaps: true,
    }, {
      label: "Oilseeds and Pulses",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "orange",
      borderColor: "orange", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "orange",
      pointBackgroundColor: "orange",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "orange",
      pointHoverBorderColor: "orange",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 88, 88, 83.6, 82.76, 79.45],
      spanGaps: true,
    }, {
      label: "Fruits and Vegetables",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "yellow",
      borderColor: "yellow", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "yellow",
      pointBackgroundColor: "yellow",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "yellow",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 80, 76.8, 75.26, 66.23, 47.68],
      spanGaps: true,
    }, {
      label: "Meat",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "green",
      borderColor: "green", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "green",
      pointBackgroundColor: "green",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "green",
      pointHoverBorderColor: "green",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 96.5, 95.53, 90.75, 87.12, 77.54],
      spanGaps: true,
    }, {
      label: "Fish and Seafood",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "pink",
      borderColor: "pink", // The main line color
      borderCapStyle: 'square',
      borderJoinStyle: 'miter',
      pointBorderColor: "pink",
      pointBackgroundColor: "pink",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "pink",
      pointHoverBorderColor: "pink",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 88, 87.56, 82.30, 74.89, 50.18],
      spanGaps: true,
    },
    {
      label: "Milk",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "purple",
      borderColor: "purple",
      borderCapStyle: 'butt',
      borderJoinStyle: 'miter',
      pointBorderColor: "purple",
      pointBackgroundColor: "purple",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "purple",
      pointHoverBorderColor: "purple",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [100, 96.5, 96.01, 94.86, 94.39, 80.23],
      spanGaps: false,
    }
  ]
};

// Notice the scaleLabel at the same level as Ticks
var options = {
  responsive: true,
  maintainAspectRatio:true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      },
      scaleLabel: {
        display: true,
        labelString: '% of Total Produced Food Remaining',
        fontSize: 14
      }
    }]
  }
};

// Chart declaration:
var myBarChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
}); // end charts.js


// taucharts making ajax call to json data to make chart on donation centers
if ( $(window).width() > 739) {
  var tauUrl = './donations.json';
  var donations = '';

  // ttaucharts for big screens
  $.ajax({
    type:'GET',
    url: tauUrl,
    data: donations,
    async: true,
    dataType:'json',
    success:function(donations){
      console.log('tau');
      var chart = new Taucharts.Chart({
        guide: {
          x: {label:'Threat Level'},  // custom label for X axis
          y: {label:'Percentage of Agencies Threatened'},    // custom label for Y axis
          padding: {b:40,l:40,t:10,r:10}   // chart paddings
        },
        data: donations,
        type: 'bar',
        x: 'Threat Level',
        y: 'Percentage of Agencies Threatened',
        color:'Type of Threat',
        plugins: [
          Taucharts.api.plugins.get('tooltip')({
            fields:['Type of Threat','Threat Level', 'Percentage Threatened']
          }),
          Taucharts.api.plugins.get('legend')({
            position: 'right',
          }),
        ]
      }); // close tauchart
      chart.renderTo('#tauResults');

    } //close success
  }); //close ajax
}
else {
  var tauUrl = './donations.json';
  var donations = '';

  // taucharts for small screens
  $.ajax({
    type:'GET',
    url: tauUrl,
    data: donations,
    async: true,
    dataType:'json',
    success:function(donations){
      console.log('tau');
      var chart = new Taucharts.Chart({
        guide: {
          x: {label:'Threat Level'},  // custom label for X axis
          y: {label:'Percentage Agencies Reporting Challenges'},    // custom label for Y axis
          padding: {b:40,l:40,t:10,r:10}   // chart paddings
        },
        data: donations,
        type: 'bar',
        x: 'Threat Level',
        y: 'Percentage of Agencies Threatened',
        color:'Type of Threat',
        plugins: [
          Taucharts.api.plugins.get('tooltip')({
            fields:['Type of Threat','Threat Level', 'Percentage Threatened']
          }),
          Taucharts.api.plugins.get('legend')({
            position: 'left',
            width: '20',
          }),
        ]
      }); // close tauchart
      chart.renderTo('#tauResults');
      window.dispatchEvent(new Event('resize'));
    } //close success
  }); //close ajax
}
}); // close wrapper
