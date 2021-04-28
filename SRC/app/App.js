import React, {Component} from 'react'
import ReactDom, {render} from 'react-dom'
import task from '../models/task';
class App extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description : "",
            tasks: [],
            _id: "",
            leyend: "nuevo"
        }
        this.funcion_CapturadorEnvios = this.funcion_CapturadorEnvios.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.fetchTask = this.fetchTask.bind(this)
    }
    funcion_CapturadorEnvios(e){
        console.log("submit")
        if(this.state._id){
            fetch('/api/tasks/' + this.state._id,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type' : 'Application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: data.status})
                    this.setState({
                        title:'',description:'',_id:"",leyend:'nuevo'
                    })
                    this.fetchTask()
                })
                .catch(err => console.log(err))
        

        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type' : 'Application/json'
                }
            }).then(res => res.json())
            .then(data => {
                M.toast({html: 'tarea guardada'})
                this.setState({
                    title:'',description:'',_id:""
                })
                this.fetchTask()
            })
            .catch(err => console.log(err))
        }
        e.preventDefault();

    }
    handlechange(e){
        const {name, value} =e.target
        this.setState({
            [name] : value
        })
        }
    componentDidMount(){
            this.fetchTask()
        }
    fetchTask(){
        fetch('/api/tasks').then(
            res => res.json())
            .then(data => {
                this.setState({tasks:data})
                console.log(this.state.tasks)
            });
    }
    taksDelete(e){
        if(confirm("seguro deseas eliminarlo")){
            fetch(`/api/tasks/${e}`,{
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type' : 'Application/json'
                }
            }).then(res => res.json()).then(data =>{
                this.fetchTask()
                M.toast({html:data.status})
            })
        }    
    }
    taksEdit(e){
        fetch(`/api/tasks/${e}`)
        .then(res => res.json()).then(data =>{
            this.setState({
                title : data.title,
                description : data.description,
                _id: data._id,
                leyend:'actualizar'
            })
            this.fetchTask()
        })
            
        
    }
    render(){
        
        return(
            <div>
                {/* navegacion */}
               <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href='/'> MERN STAK</a>
                    </div>                   
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.funcion_CapturaDatos}>
                                        <div className="row">
                                            <div className=" imput-field col s12">
                                                <input value={this.state.title} onChange={this.handlechange} name="title" type="text" placeholder="titulo de tarea"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" imput-field col s12">
                                                <textarea value={this.state.description} onChange={this.handlechange} name="description" className="materialize-textarea" placeholder="titulo de tarea"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" imput-field col s12">
                                               <button className="btn light-blue" type="submit">{this.state.leyend}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>title</th>
                                        <th>description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(tasks=>{
                                        return(
                                            <tr key={tasks._id}>
                                                <td>{tasks.title}</td>
                                                <td>{tasks.description}</td>
                                                <td>
                                                    <button className='btn light-blue darken-4' style={{margin: '4px'}} onClick={() =>this.taksDelete(tasks._id)}><i className='material-icons'>delete</i></button>
                                                    <button className='btn light-blue darken-4' style={{margin: '4px'}} onClick={() =>this.taksEdit(tasks._id)}><i className='material-icons'>edit</i></button>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App