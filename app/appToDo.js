$(document).ready(function(event) {
  var reloadToDo = function() {
  	$('.container-toDoList').empty();
    var toDoObj = JSON.parse(localStorage.getItem('dataToDo'));
    for(var key in toDoObj) {
      $(toDoObj[key]).appendTo('.container-toDoList')
    }
  }
  if(localStorage.getItem('dataToDo') != null) {
    reloadToDo();
  }

  $('.btn-addToDo').on('click', function(event) {
  	var $toDo = $('.input-toDo').val();
  	var $toDoID = $('.input-toDo').val()
  	$toDoID = $toDoID.split(' ').join('-');
  	var liClass = 'toDoItem'
    var deleteClass = 'btn-delete'
    var $listItem = `<li class=${liClass}>${$toDo}<button class=${deleteClass} id=${$toDoID}>delete</button></li>`;
  	if($toDo === '') {
  	  alert('No To Do Item!')
  	} else if(localStorage.getItem('dataToDo') === null){
      var objToDo = {}
      objToDo[$toDo] = $listItem;
      $($listItem).appendTo('.container-toDoList')
      localStorage.setItem('dataToDo', JSON.stringify(objToDo));
      $('.input-toDo').val('');
  	} else if(!JSON.parse(localStorage.getItem('dataToDo')).hasOwnProperty($toDo)) {
  	  var objToDo = JSON.parse(localStorage.getItem('dataToDo'))
  	  objToDo[$toDo] = $listItem;
      objToDo = JSON.stringify(objToDo)
      localStorage.setItem('dataToDo', objToDo);
      $($listItem).appendTo('.container-toDoList')
      $('.input-toDo').val('');
  	}
  })

  $('.container-toDoList').on('click', '.btn-delete', function(event) {
  	var key = event.currentTarget.id;
  	key = key.split('-').join(' ');
  	var objToDo = JSON.parse(localStorage.getItem('dataToDo'))
  	delete objToDo[key];
  	objToDo = JSON.stringify(objToDo);
  	localStorage.setItem('dataToDo', objToDo);
  	reloadToDo();
  })

  $('.btn-clear').on('click', function(event) {
    localStorage.removeItem('dataToDo');
    reloadToDo();
  })

})