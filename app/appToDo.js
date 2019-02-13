$(document).ready(function(event) {
  // var deleteClass = 'btn-delete'
  // var $listItem = `<li> <button class=${deleteClass}>delete</button></li>`
  $('.btn-addToDo').on('click', function(event) {
  	var $toDo = $('.input-toDo').val();
    var deleteClass = 'btn-delete';
    var $listItem = `<li class=${$toDo}>${$toDo}<button class=${deleteClass}>delete</button></li>`;
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
  	console.log('hello')
  })

})

      // <li> thing <button>delete</button></li>