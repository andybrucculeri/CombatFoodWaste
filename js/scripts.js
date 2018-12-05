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

  // highchart for food waste data
  Highcharts.chart('foodWasteChart', {
    chart: {
      style: {
        fontFamily: 'times'
      },
      type: 'column'
    },
    title: {
      text: 'Weight Percentages of Food Loss and Waste (in percentage of what enters each step)'
    },
    xAxis: {
      categories: ['Agricultural Production', 'Postharvest handling and storage', 'Processing and packaging', 'Distribution', 'Consumption']
    },
    yAxis: {
      min: 0,
      ceiling: 160,
      title: {
        text: 'Percentage Waste'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          fontFamily: 'times',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    legend: {
      align: 'center',
      x: -10,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y} percent <br/>Total Waste: {point.stackTotal} percent'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },
    series: [{
      name: 'Cereals',
      data: [2, 2, 5.5, 2, 27]
    }, {
      name: 'Roots and tubers',
      data: [20, 10, 15, 7, 30]
    },
    {
      name: 'Oilseeds and pulses',
      data: [12, 0, 5, 1, 4]
    },
    {
      name: 'Fruits and vegetables',
      data: [20, 4, 2, 12, 28]
    },{
      name: 'Meat',
      data: [3.5, 1, 5, 4, 11]
    }, {
      name: 'Fish and seafood',
      data: [12, .5, 6, 9, 33]
    },  {
      name: 'Milk',
      data: [3.5, 0.5, 1.2, 0.5, 15]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'top',
            y: 75,
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          xAxis: {
            labels: {
              autoRotation: [-90]
            }
          },
          subtitle: {
            text: null
          },
          credits: {
            enabled: false
          }
        }
      }]
    }
  }); // close highchart
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
            y: {label:'Percentage Agencies Reporting Challenges'},    // custom label for Y axis
            padding: {b:40,l:40,t:10,r:10}   // chart paddings
          },
          data: donations,
          type: 'bar',
          x: 'Threat Level',
          y: 'Percentage Threatened',
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
          y: 'Percentage Threatened',
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
