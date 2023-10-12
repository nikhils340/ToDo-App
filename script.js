// window.addEventListener('load',()=>{
//     const form=document.querySelector("#new-task-form");
//     const input=document.querySelector("#new-task-input");
//     const list_el=document.querySelector("#tasks");

//     form.addEventListener('submit',(e)=>{
//         e.preventDefault();  // prevent reloading of the page after clicking the buttons which are not working

//         const task = input.value;

//         if(!task){
//             alert("Please fill out the form");
//             return;
//         }
        
//         const task_el=document.createElement("div");
//         task_el.classList.add("task");

//         const task_content_el=document.createElement("div");
//         task_content_el.classList.add("content");
//         // task_content_el.innerText=task;

//         task_el.appendChild(task_content_el);

//         const task_input_el = document.createElement("input");
//         task_input_el.classList.add("text")
//         task_input_el.type="text";
//         task_input_el.value=task;
//         task_input_el.setAttribute("readonly","readonly");

//         task_content_el.appendChild(task_input_el);

//         // task_el.appendChild(task_content_el);

//         list_el.appendChild(task_el);

//         const task_actions_el = document.createElement('div');
// 		task_actions_el.classList.add('actions');
		
// 		const task_edit_el = document.createElement('button');
// 		task_edit_el.classList.add('edit');
// 		task_edit_el.innerText = 'Edit';

// 		const task_delete_el = document.createElement('button');
// 		task_delete_el.classList.add('delete');
// 		task_delete_el.innerText = 'Delete';

// 		task_actions_el.appendChild(task_edit_el);
// 		task_actions_el.appendChild(task_delete_el);

// 		task_el.appendChild(task_actions_el);

// 		list_el.appendChild(task_el);

// 		input.value = '';

// 		task_edit_el.addEventListener('click', (e) => {
// 			if (task_edit_el.innerText.toLowerCase() == "edit") {
// 				task_edit_el.innerText = "Save";
// 				task_input_el.removeAttribute("readonly");
// 				task_input_el.focus();
// 			} else {
// 				task_edit_el.innerText = "Edit";
// 				task_input_el.setAttribute("readonly", "readonly");
// 			}
// 		});

// 		task_delete_el.addEventListener('click', (e) => {
// 			list_el.removeChild(task_el);
// 		});
//     })

// })

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Initialize tasks from localStorage when the page loads
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to update the tasks in localStorage
    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to create a new task element
    const createTaskElement = (task) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        // Add event listeners for edit and delete buttons
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                // Update the task in the tasks array
                const index = tasks.indexOf(task);
                if (index !== -1) {
                    tasks[index] = task_input_el.value;
                    updateLocalStorage();
                }
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            // Remove the task element from the DOM
            list_el.removeChild(task_el);
            // Remove the task from the tasks array
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                updateLocalStorage();
            }
        });
    };

    // Load tasks from localStorage and create task elements
    tasks.forEach((task) => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the form");
            return;
        }

        // Add the task to the tasks array and update localStorage
        tasks.push(task);
        updateLocalStorage();

        // Create a new task element for the added task
        createTaskElement(task);

        input.value = '';
    });
});
