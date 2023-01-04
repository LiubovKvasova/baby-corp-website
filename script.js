"use strict";

document.addEventListener('DOMContentLoaded', function () {
  const form = this.getElementById('form');
  form.addEventListener('submit', formSend);

  function formSend(e){
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      form.classList.add('sending');
      console.log('ok');

      let response = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      const serviceID = '[SERVICE_ID]';
      const templateID = '[TEMPLATE_ID]';
    
      emailjs.send(serviceID, templateID, response).then((res) => {
        console.log(res);

        if (res.status === 200) {
          alert('The message has been sent');
          form.reset();
          form.classList.remove('sending');
          console.log('res=200');
        } else {
          alert('error');
        form.classList.remove('sending');
        }
      });

    } else {
      alert('Fill in the send');
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.req')

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input){
    input.parentElement.classList.add('error');
    input.classList.add('error');
  }

  function formRemoveError(input){
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

document.addEventListener('hide.bs.modal', function () {
  const form = this.getElementById('form');
  form.classList.remove('sending');
  console.log('Modal is closed');
});
