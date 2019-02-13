$(document).ready(function(event) {
  // var deleteClass = 'btn-delete'
  // var $listItem = `<li> <button class=${deleteClass}>delete</button></li>`
  $('.btn-addToDo').on('click', function(event) {
  	var $toDo = $('.input-toDo').val();
  	if($toDo === '') {
  		alert('No To Do Item!')
  	} else {
      var deleteClass = 'btn-delete';
      var $listItem = `<li class=${$toDo}>${$toDo}<button class=${deleteClass}>delete</button></li>`;
      $($listItem).appendTo('.container-toDoList')
  	}
  	console.log($toDo)
  })

})

      // <li> thing <button>delete</button></li>