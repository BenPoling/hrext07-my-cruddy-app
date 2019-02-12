/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
  var reloadNotes = function() {
    var dataObj = JSON.parse(localStorage.getItem('data'));
    $('.container-data').empty();
    for(var key in dataObj) {
      var $noteDiv = $('<div></div>');
      $noteDiv.addClass('note');
      $noteDiv.class = (key);
      var date = Date().split(' ').slice(0,3).join(' ');
      $noteDiv.text(`${date} | ${key}`);
      $('.container-data').append($noteDiv)     
    }
  }
  reloadNotes();

  $('.btn-submit').on('click', function(e){
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
      $('.input-key').val('');
      $('.note-content').html('');
    } else if(JSON.parse(localStorage.getItem('data')).hasOwnProperty(keyData)) {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
      $('.input-key').val('');
      $('.note-content').html('');      
    } else {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
      $('.input-key').val('');
      $('.note-content').html('');
    }
    
    reloadNotes();

    // $('.input-key').val('');
    // $('.note-content').html('');
  });

  $('.container-data').on('click', '.note', function(event){
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var text = obj[key];
    $('.input-key').val(key);
    $('.note-content').text(text);
  });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
    $('.input-key').val('');
    $('.note-content').html('');
  });
  
  $('.container-data').on('mouseover', '.note', function(event) {
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
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
    var obj = JSON.parse(localStorage.getItem('data'));
    delete obj[key];
    obj = JSON.stringify(obj);
    localStorage.setItem('data', obj); 
    $('.input-key').val('');
    $('.note-content').html('');
    reloadNotes();   
  })

  $('.btn-clearInput').on('click', function(event) {
    $('.input-key').val('');
    $('.note-content').html('');
  })

});