/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){

  var reloadNotes = function(topicKey) {
  var dataObj = JSON.parse(localStorage.getItem('data'));
  $('.container-data').empty();
    for(var key in dataObj[topicKey]) {
      var $noteDiv = $('<button></button>');
      $noteDiv.addClass('note');
      $noteDiv.addClass(topicKey);
      $noteDiv.text(`Note | ${key}`);
      $('.container-data').append($noteDiv)     
    }
  }
  
  var reloadTopicDropDown = function() {
    $('#topic-list').empty();
    var dataObj = JSON.parse(localStorage.getItem('data'));
    for(var key in dataObj) {
      var $option = `<option value=${key}>`;
      $($option).appendTo('#topic-list')
    }
  }
  reloadTopicDropDown();


  var reloadTopics = function() {
    var dataObj = JSON.parse(localStorage.getItem('data'));
    $('.container-data').empty();
    for(var key in dataObj) {
      var $noteDiv = $('<button></button>');
      $noteDiv.addClass('topic');
      $noteDiv.class = (key);
      $noteDiv.text(`Topic | ${key}`);
      $('.container-data').append($noteDiv)     
    }
  }
  reloadTopics();

  $('.btn-submit').on('click', function(e){
    var topic = $('.topic-list-input').val();
    var keyData = $('.input-key').val();
    var valueData = $('.note-content').text();
    if(topic === '') {
      alert('No topic!');
    } else if(keyData === '') {
      alert('No title!');t
    } else if(valueData === '') {
      alert('No Note Content!');
    } else if(localStorage.getItem('data') === null) {
      var obj = {};
      var noteObj = {};
      noteObj[keyData] = valueData;
      obj[topic] = noteObj;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
    } else if(JSON.parse(localStorage.getItem('data')).hasOwnProperty(topic)) {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[topic][keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);  
    } else {
      var obj = JSON.parse(localStorage.getItem('data'));
      var noteObj = {};
      noteObj[keyData] = valueData;
      obj[topic] = noteObj;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
    }
    reloadTopicDropDown();
    reloadNotes(topic);
  });

  $('.btn-delete').on('click', function(event) {
    var topicKey = $('.topic-list-input').val();
    var key = $('.input-key').val();
    var obj = JSON.parse(localStorage.getItem('data'));
    delete obj[topicKey][key];
    obj = JSON.stringify(obj);
    localStorage.setItem('data', obj); 
    $('.input-key').val('');
    $('.note-content').html('');
    reloadNotes(topicKey);  
  })

  $('.btn-clearInput').on('click', function(event) {
    $('.topic-list-input').val('');
    $('.input-key').val('');
    $('.note-content').html('');
  })

  $('.btn-topics').on('click', function(event) {
    reloadTopics();
    $('.topic-list-input').val('');
    $('.input-key').val('');
    $('.note-content').html('');
  })

  $('.btn-clear').click(function(){
    var topic = $('.topic-list-input').val();
    var obj = JSON.parse(localStorage.getItem('data'));
    delete obj[topic];
    obj = JSON.stringify(obj);
    localStorage.setItem('data', obj)
    reloadTopics();
    reloadTopicDropDown();
    $('.topic-list-input').val('');
    $('.input-key').val('');
    $('.note-content').html('');
  });

  $('.container-data').on('mouseover', '.topic', function(event) {
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var str = ""
    for(var prop in obj[key]) {
      str += '\n';
      str += '-';
      str += prop;
      str += '\n';
    }
    var settings = {
      width: 600,
      title: 'Topic : ' + key
    }
    $('.popUp-dialogUI').html('');
    $('.popUp-dialogUI').html(str);
    $('.popUp-dialogUI').dialog(settings).dialog('open');
  })

  $('.container-data').on('mouseleave', '.topic', function(event) {
    $('.popUp-dialogUI').dialog('close');
  })

  $('.container-data').on('click', '.topic', function(event) {
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('');
    reloadNotes(key);
    $('.topic-list-input').val(key);
    $('.popUp-dialogUI').dialog('close');
  }) 

  $('.container-data').on('click', '.note', function(event){
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var topicKey = event.currentTarget.className.split(' ');
    topicKey = topicKey[1];
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var text = obj[topicKey][key];
    $('.topic-list-input').val(topicKey);
    $('.input-key').val(key);
    $('.note-content').text(text);
    $('.popUp-dialogUI').dialog('close');
  }); 

  $('.container-data').on('mouseover', '.note', function(event) {
    var obj = JSON.parse(localStorage.getItem('data'));
    var noteKey = event.currentTarget.innerText.split('');
    var key = event.currentTarget.className.split(' ');
    var index = noteKey.indexOf('|');
    noteKey = noteKey.slice(index + 2).join('')
    key = key[1];
    var settings = {
      width: 600,
      title: 'Title : ' + noteKey
    }
    $('.popUp-dialogUI').html('');
    $('.popUp-dialogUI').html(obj[key][noteKey]);
    $('.popUp-dialogUI').dialog(settings).dialog('open');
  })

  $('.container-data').on('mouseleave', '.note', function(event) {
    $('.popUp-dialogUI').dialog('close');
  })

});