 
// Ce script gere l'ouverture des questions FAQ et l'envoi du formulaire de contact.
function ouvrirMessagerie(lienMail) {
	window.location.href = lienMail;
}

document.addEventListener('DOMContentLoaded', function () {
	const questions = document.querySelectorAll('.faq-question');
	const contactForm = document.querySelector('#contact-form');
	const formStatus = document.querySelector('#contact-form-status');
    
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

	if (contactForm && formStatus) {
		contactForm.addEventListener('submit', function (event) {
			event.preventDefault();

			const nameField = document.getElementById('contact-name');
			const emailField = document.getElementById('contact-email');
			const subjectField = document.getElementById('contact-subject');
			const messageField = document.getElementById('contact-message');

			let recipient = '';
			let name = '';
			let email = '';
			let subject = '';
			let message = '';

			if (contactForm.dataset.recipient) {
				recipient = contactForm.dataset.recipient;
			}

			if (nameField) {
				name = nameField.value.trim();
			}

			if (emailField) {
				email = emailField.value.trim();
			}

			if (subjectField) {
				subject = subjectField.value.trim();
			}

			if (messageField) {
				message = messageField.value.trim();
			}

			if (recipient === '' || name === '' || email === '' || subject === '' || message === '') {
				formStatus.textContent = 'Merci de remplir tous les champs avant l\'envoi.';
				formStatus.classList.add('is-error');
				formStatus.classList.remove('is-success');
				return;
			}

			const body = [
				`Nom : ${name}`,
				`Email : ${email}`,
				'',
				'Message :',
				message,
			].join('\n');

			const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

			formStatus.textContent = 'Votre application mail va s\'ouvrir pour envoyer le message.';
			formStatus.classList.add('is-success');
			formStatus.classList.remove('is-error');

			ouvrirMessagerie(mailtoLink);
		});
	}
});
