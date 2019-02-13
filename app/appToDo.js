$(document).ready(function(event) {
  // var deleteClass = 'btn-delete'
  // var $listItem = `<li> <button class=${deleteClass}>delete</button></li>`
  var reloadToDo = function() {
  	$('.container-toDoList').empty();
    var toDoObj = JSON.parse(localStorage.getItem('dataToDo'));
    // if(toDoObj === undefined) {
    // 	$('')
    // }
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
    var deleteClass = 'btn-delete'
    var $listItem = `<li class=${$toDo}>${$toDo}<button class=${deleteClass} id=${$toDoID}>delete</button></li>`;
    // $listItem.addClass($toDo);
  	if($toDo === '') {
  		alert('No To Do Item!')
  	} else if(localStorage.getItem('dataToDo') === null){
      var objToDo = {}
      objToDo[$toDo] = $listItem;
      $($listItem).appendTo('.container-toDoList')
      localStorage.setItem('dataToDo', JSON.stringify(objToDo));
  	} else if(!JSON.parse(localStorage.getItem('dataToDo')).hasOwnProperty($toDo)) {
  	  var objToDo = JSON.parse(localStorage.getItem('dataToDo'))
  	  objToDo[$toDo] = $listItem;
      objToDo = JSON.stringify(objToDo)
      localStorage.setItem('dataToDo', objToDo);
      $($listItem).appendTo('.container-toDoList')
  	}
  	// console.log($toDo)
  })

  $('.container-toDoList').on('click', '.btn-delete', function(event) {
  	var key = event.currentTarget.id;
  	key = key.split('-').join(' ');
  	var objToDo = JSON.parse(localStorage.getItem('dataToDo'))
  	// console.log(key);
  	// console.log(objToDo[key]);
  	delete objToDo[key];
  	objToDo = JSON.stringify(objToDo);
  	localStorage.setItem('dataToDo', objToDo);
  	reloadToDo();
  })

})

      // <li> thing <button>delete</button></li>