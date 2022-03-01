
$(function() {
	console.log( "ready!" );
	// Lorem ipsum
	// https://en.wikipedia.org/wiki/Lorem_ipsum

	addTodo('Lorem ipsum', 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.');

	// JQuery on()
	// https://api.jquery.com/on/

	// JS arrow function
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
	$("#add-btn").on("click", ()=>{
		// JQuery val()
		// https://api.jquery.com/val/
		let title = $('#new-todo-title-input').val();
		let content = $('#new-todo-content-input').val();
		addTodo(title, content);
		clearInput();
	});

});


function createTemplate(title, content, mode){
	// JS Template literals
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	
	let readComponent = `
	<div class="row  mb-1">
		<span class="todo-title">${title}</span>
	</div>
	<div class="row">
		<div class="col align-self-center todo-content">${content}</div>
	</div>
	`;
	let editComponent = `
  	<div class="row  mb-1">
  		<div>
  			<label>Title</label>
			<input class="form-control todo-title" value="${title}">
  		</div>
  	</div>
  	<div class="row">
		<div class="col align-self-center">
			<label>Content</label>
			<textarea class="form-control todo-content" rows="4">${content}</textarea>
		</div>
  	</div>
	`;

	// default: Read Mode
	let component = {
		'html': readComponent,
		'btn': 'Edit',
		'class': 'todo-edit'
	};

	// Edit Mode
	if(mode == 'edit'){
		component = {
			'html': editComponent,
			'btn': 'Done',
			'class': 'done-btn'
		}
	}

	let element = $(`
		<div class="col-12 todo-box">
			<div class="p-3 border bg-light">
				${component.html}
				<div class="d-grid gap-0 d-md-flex justify-content-md-end">
				<button type="button" class="btn btn-link todo-delete">Delete</button>
				<button type="button" class="btn btn-link ${component.class}">
					${component.btn}
				</button>
				</div>
			</div>
		</div>
	`);

	// bind delete event
	$('.todo-delete', element).on("click", (event)=>{
		deleteTodo(event);
	});
	// bind edit/done event
	if(mode == 'read'){
	//Read Mode
		$('.todo-edit', element).on("click", (event)=>{
			editTodo(event);
		});
	}else{
	// Edit Mode
		$('.done-btn', element).on("click", (event)=>{
			console.log('done');
			updateTodo(event);
		});
	}
	return element;

}

function addTodo(title, content){
	if(!content || /^\s*$/.test(content) || !title || /^\s*$/.test(title)){
		alert('empty');
		return;
	}
	let element = createTemplate(title, content, 'read');
	$('#todo-list').append(element);
}

function clearInput(){
	$('#new-todo-title-input').val("");
	$('#new-todo-content-input').val("");
}

function deleteTodo(event){
	let node = event.target.closest(".todo-box");
	node.remove();
}

function getTodoBox(event){

	let node = event.target.closest(".todo-box");
	let title;
	let content;

	let child = node.querySelector(".todo-title");

	if(child.nodeName.toLowerCase() == 'input'){
		title = child.value;
		content = node.querySelector(".todo-content").value;
	}else {
		title = child.textContent;
		content = node.querySelector(".todo-content").textContent;
	}

	return {
		'node': node,
		'title': title,
		'content': content
	}

}

function editTodo(event){
	let obj = getTodoBox(event);
	let element = createTemplate(obj.title, obj.content, 'edit');
	$(obj.node).replaceWith(element);
}

function updateTodo(event){

	let obj = getTodoBox(event);
	let node = obj.node;
	let title = obj.title;
	let content = obj.content;

	if(!content || /^\s*$/.test(content) || !title || /^\s*$/.test(title)){
		alert('empty');
		// console.log('empty');
		return;
	}

	let element = createTemplate(title, content, 'read');
	$(node).replaceWith(element);

}


