
var todoVue;

function init() {
	console.log( "init!" );
	todoVue = new Vue({
		el: "#app",
		data: {
			todoList: [],
			newTitle: "",
			newContent: "",
		},
		methods: {
			addTodo: function(title, content){
				this.todoList.push({
					title: title,
					content: content,
					isEdit: false
				});
			},
			clearInput: function(){
				this.newTitle = "";
				this.newContent = "";
			},
			newTodo: function(){
				if (this.newTitle == "" || this.newContent == ""){
					alert("Empty!");
					return ;
				}
				this.addTodo(this.newTitle, this.newContent);
				this.clearInput();
			},
			deleteTodo(index){
				this.todoList.splice(index, 1);
			}
		},
	});
	
	// Lorem ipsum
	// https://en.wikipedia.org/wiki/Lorem_ipsum
	todoVue.addTodo('Lorem ipsum', 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.');
	console.log( "ready!" );
}