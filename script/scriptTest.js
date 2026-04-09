 
document.addEventListener('DOMContentLoaded', function () {
	const questions = document.querySelectorAll('.faq-question');
    
	questions.forEach(function (question) {
		question.addEventListener('click', function () {
			const item = this.parentElement;
          
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			} else {
				item.classList.add('active');
				
			}
		});
	});
});
