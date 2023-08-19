const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

storedTasks.forEach((task) => {
  createTaskItem(task);
});

addBtn.addEventListener("click", function () {
  const taskInput = document.getElementById("task");
  const deadlineInput = document.getElementById("deadline");
  const priorityInput = document.getElementById("priority");

  const task = taskInput.value;
  const deadline = deadlineInput.value;
  const priority = priorityInput.value;

  if (task && deadline && priority) {
    const newTask = { task, deadline, priority };
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    createTaskItem(newTask);

    taskInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "Tinggi";
  }
});

function createTaskItem(task) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
      <p>Tugas : ${task.task}</p>
      <p>Deadline : ${task.deadline}</p>
      <p>Prioritas : ${task.priority}</p>
      <button class="delete-btn">Hapus</button>
    `;
  taskList.appendChild(taskItem);

  const deleteBtn = taskItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    const taskIndex = storedTasks.findIndex(
      (item) =>
        item.task === task.task &&
        item.deadline === task.deadline &&
        item.priority === task.priority
    );
    if (taskIndex !== -1) {
      storedTasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
    taskItem.remove();
  });
}
