import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchUsers, createUser, deleteUser, updateUser } from './state/actions/UsersActions';


class App extends Component {


  state = {
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    edad: ""
  }

  componentDidMount() {
    this.props.fetchUsers();
  }
  

  handleInputChange = (e, input) => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    
    let data = {
      nombre: this.state.nombre,
      apellidos: {
        paterno: this.state.apellidoPaterno,
        materno: this.state.apellidoMaterno
      },
      edad: this.state.edad
    }

    await this.props.createUser(data);

    this.props.fetchUsers();
  }


  handleDelete = async(id) => {
    await this.props.deleteUser(id);
    this.props.fetchUsers();
  }

  handleUpdate = async (id) => {
    let data = {
      nombre: this.state.nombre,
      apellidos: {
        paterno: this.state.apellidoPaterno,
        materno: this.state.apellidoMaterno
      },
      edad: this.state.edad
    }
    await this.props.updateUser(id, data);
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="users-container">
            {this.props.users.map(user => {
            return (
              <div key={user._id}>
                <button onClick={()=>this.handleDelete(user._id)}>Eliminar usuario</button>
                <p>Nombre: {user.nombre}</p>

                <p>Apellidos: {user.apellidos.paterno} {user.apellidos.materno}</p>

                <p>Edad: {user.edad}</p>

                <button onClick={() => this.handleUpdate(user._id)}>Actuaizar usuario</button>
              </div>
            )
            })}
          </div>

          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input onChange={(e) => this.handleInputChange(e, 'nombre')} value={this.state.nombre} placeholder="Ingresa un nombre"></input>
            <input onChange={(e) => this.handleInputChange(e, 'apellidoMaterno')} value={this.state.apellidoMaterno} placeholder="Ingresa un apellido materno"></input>
            <input onChange={(e) => this.handleInputChange(e, 'apellidoPaterno')} value={this.state.apellidoPaterno} placeholder="Ingresa un apellido paterno"></input>
            <input onChange={(e) => this.handleInputChange(e, 'edad')} value={this.state.edad} placeholder="Ingresa una edad"></input>
            <input value="Agregar usuario" type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  fetchUsers, createUser, deleteUser, updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
