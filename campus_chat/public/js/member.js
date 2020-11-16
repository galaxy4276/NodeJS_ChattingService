const memberInput = document.querySelector('.make-setvalue__number');

const filter = e => {
  console.log(e);
  // eslint-disable-next-line no-unused-expressions
  parseInt(e.data, 10) > 10 ? (memberInput.data = 10) : e.target.data;
};

memberInput.addEventListener('input', e => filter(e));
