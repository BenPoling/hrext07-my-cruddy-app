/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-submit').on('click', function(e){
    console.log(e);
    var keyData = $('.input-key').val();
    var valueData = $('.note-content').text();
    if(localStorage.getItem('data') === null) {
      var obj = {};
      obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
    } else if(JSON.parse(localStorage.getItem('data')).hasOwnProperty(keyData)) {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);      
    } else {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
    }
    // write to db
    // localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData;
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    var $noteDiv = $('<div></div>');
    $noteDiv.addClass('note');
    $noteDiv.addClass(keyData);
    $noteDiv.text(displayText);
    $noteDiv.appendTo('.container-data');

    // $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });


  $('.btn-submit').on('click', function(event) {
    // console.log($('.note-content').text());
    // var value = $('.note-content').text();
    // var key = localStorage.length + 1;
    // localStorage.setItem(key, value)
  })




  // update db
    // need to expand when  more than 1 item is added


  // delete item
  $('.container-data').on('click', '.note', function(event){
    console.log(event);
    // console.log('hello');
    var text = localStorage.getItem(event.currentTarget.classList[1])
    // console.log(text);
    console.log(event.currentTarget.classList[1])
    if(!text) {
      $('.note-content').text(text);
    }
  });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

});