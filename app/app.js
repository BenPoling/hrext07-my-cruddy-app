/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
  

  var reloadTopics = function() {
    var dataObj = JSON.parse(localStorage.getItem('data'));
    $('.container-data').empty();
    for(var key in dataObj) {
      var $noteDiv = $('<div></div>');
      $noteDiv.addClass('topic');
      $noteDiv.class = (key);
      var date = Date().split(' ').slice(0,3).join(' ');
      $noteDiv.text(`${date} | ${key}`);
      $('.container-data').append($noteDiv)     
    }
  }
  reloadTopics();

  $('.btn-submit').on('click', function(e){
    var topic = $('.topic-list-input').val();
    // console.log(topic);
    var keyData = $('.input-key').val();
    var valueData = $('.note-content').text();
    if(keyData === '') {
      alert('No title!');
    } else if(valueData === '') {
      alert('No note content!');t
    } else if(topic === '') {
      alert('No topic!');
    } else if(localStorage.getItem('data') === null) {

      // {random: {title: note, title: note}, otherTopic: {title: note, title: note}};
      var obj = {};
      var noteObj = {};
      noteObj[keyData] = valueData;
      obj[topic] = noteObj;
      // obj[keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
      $('.input-key').val('');
      $('.note-content').html('');
      $('.topic-list-input').val('');
    } else if(JSON.parse(localStorage.getItem('data')).hasOwnProperty(topic)) {
      var obj = JSON.parse(localStorage.getItem('data'));
      obj[topic][keyData] = valueData;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
      $('.input-key').val('');
      $('.note-content').html('');  
      $('.topic-list-input').val('');    
    } else {
      var obj = JSON.parse(localStorage.getItem('data'));
      var noteObj = {};
      noteObj[keyData] = valueData;
      obj[topic] = noteObj;
      obj = JSON.stringify(obj);
      localStorage.setItem('data', obj);
      $('.input-key').val('');
      $('.note-content').html('');
      $('.topic-list-input').val('');
    }
    
    reloadTopics();

    // $('.input-key').val('');
    // $('.note-content').html('');
  });

  $('.container-data').on('click', '.note', function(event){
    console.log(event);
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var topicKey = event.currentTarget.className.split(' ');
    topicKey = topicKey[1];
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var text = obj[topicKey][key];
    console.log(key);
    $('.topic-list-input').val(topicKey);
    $('.input-key').val(key);
    $('.note-content').text(text);
    $('.popUp-dialogUI').dialog('close');
  });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
    $('.input-key').val('');
    $('.note-content').html('');
  });

  $('.container-data').on('mouseover', '.topic', function(event) {
    // console.log(event);
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('')
    var str = "-"
    // str += '\n';
    for(var prop in obj[key]) {
      str += '\n';
      str += prop;
    }
    console.log(str);
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
    console.log(event);
    var obj = JSON.parse(localStorage.getItem('data'));
    var key = event.currentTarget.innerText.split('');
    var index = key.indexOf('|');
    key = key.slice(index + 2).join('');
    console.log(key);
    $('.container-data').empty();
    for(var prop in obj[key]) {
      var $noteDiv = $('<div></div>');
      $noteDiv.addClass('note');
      $noteDiv.addClass(key);
      // $noteDiv.class = (key);
      var date = Date().split(' ').slice(0,3).join(' ');
      $noteDiv.text(`${date} | ${prop}`);
      $('.container-data').append($noteDiv)     
    }
    // $('.popUp-dialogUI').dialog('close');
  })  

  
  $('.container-data').on('mouseover', '.note', function(event) {
    // console.log(event);
    var obj = JSON.parse(localStorage.getItem('data'));
    // console.log(obj);
    var noteKey = event.currentTarget.innerText.split('');
    var key = event.currentTarget.className.split(' ');
    var index = noteKey.indexOf('|');
    noteKey = noteKey.slice(index + 2).join('')
    key = key[1];
    var settings = {
      width: 600,
      title: 'Title : ' + noteKey
    }
    // console.log('key', key);
    // console.log('note key:', noteKey)
    // console.log(obj[key][noteKey]);
    $('.popUp-dialogUI').html('');
    $('.popUp-dialogUI').html(obj[key][noteKey]);
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
    reloadTopics();   
  })

  $('.btn-clearInput').on('click', function(event) {
    $('.input-key').val('');
    $('.note-content').html('');
  })

});