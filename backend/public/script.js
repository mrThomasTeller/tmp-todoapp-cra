// При клике на чекбокс мы хотим засабмитить форму, в которой лежит чекбокс
// отслеживаем клик по всему контейнеру с классом tasks
document.querySelector('.tasks')
  .addEventListener('click', async (event) => {
    // event.target - элемент, по которому произошёл клик,
    // если event.target - чекбокс, то
    if (event.target.type === 'checkbox') {
      const done = event.target.checked;
      const response = await fetch(`/api/tasks/${event.target.dataset.id}`, {
        method: 'PUT',
        body: JSON.stringify({ done }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }, true);

function removeTaskOnClick(button) {
  button.addEventListener('click', async (event) => {
    event.stopPropagation();
    await fetch(`/api/tasks/${event.target.dataset.id}`, {
      method: 'DELETE',
    });
    event.target.closest('.task').remove();
  });
}

document.querySelectorAll('.remove-task')
  .forEach((button) => removeTaskOnClick(button));

document.querySelector('#task-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: form.title.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    form.title.value = '';

    const taskHtml = await response.text();

    // const task = await response.json();
    //     const taskHtml = `
    // <div class="task">
    //   <input type="checkbox" data-id="${task.id}">
    //   ${task.title}
    //   <span>
    //     <button type="submit" class="remove-task" data-id="${task.id}">x</button>
    //   </span>
    // </div>
    // `;

    document.querySelector('.tasks').insertAdjacentHTML('afterbegin', taskHtml);

    removeTaskOnClick(document.querySelector('.remove-task'));
  });
