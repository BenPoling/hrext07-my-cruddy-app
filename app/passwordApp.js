$(document).ready(function(event) {
	
	// $('audio')[0].play();
    console.log($('audio'))
	$('.password').keypress(function(event) {
		var $passWord = $('.password').val();
		var $key = event.keyCode;
		console.log($key);
		if($passWord === 'NI!' && $key === 13) {
		// console.log($passWord);
         $(location).attr('href', 'index.html');
         $('.password').val('');
      }
      if($passWord !== 'NI!' && $key === 13) {
      	$('.password').val('');
      	alert('Wrong password!')
      }
	})
})