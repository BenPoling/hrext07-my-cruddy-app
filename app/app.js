/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
    var dataObj = JSON.parse(localStorage.getItem('data'));
    // console.log(dataObj);
    $('.container-data').empty();
    for(var key in dataObj) {
      var $noteDiv = $('<div></div>');
      $noteDiv.addClass('note');
      $noteDiv.class = (key);
      var date = Date().split(' ').slice(0,3).join(' ');
      $noteDiv.text(`${date} | ${key}`);
      // console.log($noteDiv);
      $('.container-data').append($noteDiv)
      // $noteDiv.appendTo('.container-data');      
    }

  $('.btn-submit').on('click', function(e){
    console.log(e);
    var keyData = $('.input-key').val();
    var valueData = $('.note-content').text();
    if(keyData === '') {
      alert('No title!');
    } else if(valueData === '') {
      alert('No note content!');t
    } else if(localStorage.getItem('data') === null) {
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
    // var displayText = keyData;
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    var dataObj = JSON.parse(localStorage.getItem('data'));
    // console.log(dataObj);
    $('.container-data').empty();
    for(var key in dataObj) {
      var $noteDiv = $('<div></div>');
      $noteDiv.addClass('note');
      $noteDiv.addClass(key);
      var date = Date().split(' ').slice(0,3).join(' ');
      $noteDiv.text(`${date} | ${key}`);
      // console.log($noteDiv);
      $('.container-data').append($noteDiv)
      // $noteDiv.appendTo('.container-data');      
    }
    // $noteDiv.addClass(keyData);
    // $noteDiv.text(displayText);
    // $noteDiv.appendTo('.container-data');

    // $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
    $('.input-key').val('');
    $('.note-content').html('');
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
    var obj = JSON.parse(localStorage.getItem('data'));
    var arr = event.currentTarget.innerText.split(' ');
    var key = arr[arr.length - 1];
    var text = obj[key];
    console.log(key);
    // console.log(text);
    $('.input-key').val(key);
    $('.note-content').text(text);
    // console.log(text);
    // console.log(event.currentTarget.classList[1])
  });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });
  

  $('.container-data').on('mouseover', '.note', function(event) {
    console.log(event);
    var obj = JSON.parse(localStorage.getItem('data'));
    var arr = event.currentTarget.innerText.split(' ');
    var key = arr[arr.length - 1];
    var settings = {
      width: 600,
      title: key
    }
    $('.popUp-dialogUI').html('');
    $('.popUp-dialogUI').html(obj[key]);
    $('.popUp-dialogUI').dialog(settings).dialog('open');
  })

  $('.container-data').on('mouseleave', '.note', function(event) {
    $('.popUp-dialogUI').dialog('close');
  })


});