
class App{
    init() {
        console.log(this);
        this.render();
    }

    render(){
        const app = document.getElementById('app');
    }
}

const AppComponent = new App();
AppComponent.init();

class Input {
    constructor(id, type, placeholder, parent, req){
        this.id = id;
        this.type = type;
        this.placeholder = placeholder;
        this.parent = parent;
        this.req = req;

        this.value = "";
        this.state = {};
        //<input>
        this.nodeElementInput = document.createElement('input');
        this.nodeElementInput.type = this.type;
        this.nodeElementInput.placeholder = this.placeholder;
        this.nodeElementInput.id = this.id;

        if(this.req){
            this.nodeElementInput.required = true;
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.nodeElementInput.addEventListener('change', this.handleChange);
    }
    init(){
        this.render();
    }

    handleChange(event){
        this.value = event.target.value;
    }

    render(){
        this.parent.appendChild(this.nodeElementInput);
    }
    
}

class FormElement {
    constructor(title, id, action, parent, input){
        this.title = title
        this.id = id;
        this.action = action;
        this.parent = parent;
        this.allInput = input;
        this.variables = [];

        this.nodeParent = document.querySelector(`#${parent}`);
        this.nodeElement = document.createElement('form');
        this.nodeElement.id = this.id;
        this.nodeElement.innerHTML = `<h2>${this.title}</h2>`;

        this.allInput.forEach(el => {
            this.variables.push(el.id);
            let i = this.variables.indexOf(el.id);
            this.variables[i] = new Input(el.id, el.type, el.id, this.nodeElement, el.req);
        });

        this.init();

        this.submitButton = document.createElement('button');
        this.submitButton.type = 'submit';
        this.submitButton.innerText = 'Submit';
        this.nodeElement.appendChild(this.submitButton);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.nodeElement.addEventListener('submit', this.handleSubmit);
    }

    init(){
        this.render();
    }

    handleSubmit(event){
        event.preventDefault();
        let body = {};
        this.variables.forEach(el => {
            body[el.id] = el.value;
        })
        console.log(body, this.action);
        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            response.json().then(data => {
                console.log(data);
            })
        })
    }

    render(){
        this.nodeParent.appendChild(this.nodeElement);
        this.variables.forEach(el => el.init());
    }
}

const NewLoginForm = new FormElement('Login','loginForm', 'http://localhost:3000/api/user/authenticate', 'app', [{id: 'namefield', type: 'text', req: true},{id: 'password', type: 'password', req: true}])
NewLoginForm

const NewRegisterForm = new FormElement('Register','registerForm', 'http://localhost:3000/api/user/register', 'app', [{id: 'username', type: 'text', req: true},{id: 'email', type: 'email', req: true},{id: 'password', type: 'password', req: true}])
NewRegisterForm