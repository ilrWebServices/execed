CRN.formValidation = ((CRN, $) => {
  const checkError = (field) => {
    if (field.validity.valid) return;
    if (field.validity.valueMissing) return `Please fill out this field.`;
    if (field.validity.typeMismatch) {
      if (field.type === 'email') return `Please enter a valid email.`;
    }
  };
  
  const showError = (field, error) => {
    const id = field.id || field.name;
    if (!id) return;

    let errorMessage = field.form.querySelector(`.error-message#error-for${id}`);
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.id = `error-for${id}`;
      field.parentNode.insertBefore(errorMessage, field.nextSibiling);
    }
    field.setAttribute('aria-describedby', `error-for-${id}`);
    errorMessage.innerHTML = `* ${error}`;
  };

  const removeError = (field) => {
    const id = field.id || field.name;
    if (!id) return;

    let errorMessage = field.form.querySelector(`.error-message#error-for${id}`);
    if (!errorMessage) return;
    errorMessage.innerHTML = '';
  };
  

  const init = () => {
    const forms = [...document.querySelectorAll('.js-webform form')];
    forms.forEach((form) => {
      form.setAttribute('novalidate', true);
      form.addEventListener('blur', (e) => {
        const input = e.target;
        const error = checkError(input);
        if (!input.validity.valid) {
          input.classList.add('invalid');
          showError(input, error);
          return;
        }
        input.classList.remove('invalid');
        removeError(input);
      }, true);
    });
  }

  return {
    init
  }

})(CRN, jQuery);