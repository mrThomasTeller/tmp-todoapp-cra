const input = document.getElementById('name');

input.value = getCookie('name');

input.addEventListener('input', (event) => {
  const { value } = event.target;
  document.cookie = `name=${value ?? ''}`;
});

// localStorage
// input.value = localStorage.getItem('name') ?? '';

// input.addEventListener('input', (event) => {
//   const { value } = event.target;
//   localStorage.setItem('name', value);
// });

function getCookie(cName) {
  const name = `${cName}=`;
  const cDecoded = decodeURIComponent(document.cookie); // to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
