/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
    // console.log(dataObj);
  var reloadNotes = function() {
    var dataObj = JSON.parse(localStorage.getItem('data'));
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
  }
  reloadNotes();

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
    reloadNotes();
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
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var text = obj[key];
    console.log(event);
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
    var obj = JSON.parse(localStorage.getItem('data'));
    var arr = event.currentTarget.innerText.split(' ');
    var key = arr[arr.length - 1];
    var settings = {
      width: 600,
      title: 'Title : ' + key
    }
    $('.popUp-dialogUI').html('');
    $('.popUp-dialogUI').html(obj[key]);
    $('.popUp-dialogUI').dialog(settings).dialog('open');
  })

  $('.container-data').on('mouseleave', '.note', function(event) {
    $('.popUp-dialogUI').dialog('close');
  })

  $('.btn-delete').on('click', function(event) {
    var key = $('.input-key').val();
    console.log(key);
    var obj = JSON.parse(localStorage.getItem('data'));
    delete obj[key];
    obj = JSON.stringify(obj);
    localStorage.setItem('data', obj); 
    reloadNotes();   
  })


});