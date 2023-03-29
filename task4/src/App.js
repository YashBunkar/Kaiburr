import React, {Component} from 'react';
import axios from 'axios';
import {Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    servers: [],
    newServerModal: false,
    delServerModal: false,
    findServerByIdModal: false,
    findServerByNameModal: false,
    newServerObject: {
      id: '',
      name: '',
      language: '',
      framework: ''
    },
    serverId: '',
    serverName: ''
  }
  componentWillMount() {
    this.__refreshServersCollection();
    toast.configure({
      autoClose: 4000,
      draggable: false,
    });
  }
  __refreshServersCollection() {
    axios.get('http://127.0.0.1:8080/servers/getServer').then((response) => {
      this.setState({
        servers: response.data
      })
    });
  }
  toggleNewServerModal() {
    this.setState({
      newServerModal: ! this.state.newServerModal
    });
  }
  toggleDelServerModal() {
    this.setState({
      delServerModal: ! this.state.delServerModal
    });
  }
  toggleFindServerByIdModal() {
    this.setState({
      findServerByIdModal: ! this.state.findServerByIdModal
    });
  }
  toggleFindServerByNameModal() {
    this.setState({
      findServerByNameModal: ! this.state.findServerByNameModal
    });
  }
  handleChangeId(event) {
    this.setState({serverId: event.target.value});
  }
  handleChangeName(event) {
    this.setState({serverName: event.target.value});
  }
  createServer() {
    axios.put('http://127.0.0.1:8080/servers/createServer', this.state.newServerObject).then((response) => {
    let {servers} = this.state;
    servers.push(this.state.newServerObject);
    this.setState({servers, newServerModal: false, newServerObject: {
      id: '',
      name: '',
      language: '',
      framework: ''
    }});
    toast.success(response.data);
    });
  }
  deleteServer(id) {
    axios.delete('http://127.0.0.1:8080/servers/deleteServer?id=' + id).then((response) => {
      this.setState({serverId: '', delServerModal: false});
      console.log(response.status);
      if (response.data == "Server deleted successfully!") {
        this.__refreshServersCollection();
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    });
  }
  findServerById(id) {
    if (id == '') {
      this.setState({serverId: '', findServerByIdModal: false});
      this.__refreshServersCollection();
      return;
    }
    axios.get('http://127.0.0.1:8080/servers/getServer?id=' + id).then((response) => {
      this.setState({serverId: '', findServerByIdModal: false});
      this.setState({
        servers: [response.data]
      });
    }).catch(error => {
      toast.error("Server not found!");
  });
  }
  findServerByName(name) {
    if (name == '') {
      this.setState({serverName: '', findServerByNameModal: false});
      this.__refreshServersCollection();
      return;
    }
    axios.get('http://127.0.0.1:8080/servers/getServer?name=' + name).then((response) => {
      this.setState({serverName: '', findServerByNameModal: false});
      this.setState({
        servers: response.data
      });
    }).catch(error => {
      toast.error("Server not found!");
  });
  }
  render() {
    let servers = this.state.servers.map((server) => {
      return (
        <tr key={server.id}>
          <td>{server.id}</td>
          <td>{server.name}</td>
          <td>{server.language}</td>
          <td>{server.framework}</td>
           <td>
             <Button color="danger" size="sm" onClick={this.deleteServer.bind(this, server.id)}>DELETE</Button>
           </td> 
        </tr> 
      )
    });
    return (
      <div className="App container">
        <header>
          <center>
            <img src="https://www.kaiburr.com/wp-content/uploads/2018/09/kaiburrLogoText-212x43.png" alt="Kaiburr" />
          </center>
        </header>
        <Table>
          <thead>
            <tr>
              <th>
                <Button className="my-3" size="sm" color="warning" onClick={this.toggleNewServerModal.bind(this)}>Create Server</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="primary" onClick={this.toggleFindServerByIdModal.bind(this)}>Find By Id</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="primary" onClick={this.toggleFindServerByNameModal.bind(this)}>Find By Name</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="danger" onClick={this.toggleDelServerModal.bind(this)}>Delete By Id</Button>
              </th>
            </tr>
          </thead>
        </Table>
        <Modal isOpen={this.state.newServerModal} toggle={this.toggleNewServerModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewServerModal.bind(this)}>Create a new "server" object</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" id="id" placeholder="Server ID eg. 123" value={this.state.newServerObject.id} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.id = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" id="name" placeholder="Server Name eg. my centos" value={this.state.newServerObject.name} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.name = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="language">Language</Label>
              <Input type="text" id="language" placeholder="Programming Language eg. java" value={this.state.newServerObject.language} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.language = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="framework">Framework</Label>
              <Input type="text" id="framework" placeholder="Framework eg. spring boot" value={this.state.newServerObject.framework} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.framework = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createServer.bind(this)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewServerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.findServerByIdModal} toggle={this.toggleFindServerByIdModal.bind(this)}>
          <ModalHeader toggle={this.toggleFindServerByIdModal.bind(this)}>Find server by ID</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" placeholder="ID of server to find" value={this.state.serverId} onChange={this.handleChangeId.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findServerById.bind(this, this.state.serverId)}>Find</Button>{' '}
            <Button color="secondary" onClick={this.toggleFindServerByIdModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.findServerByNameModal} toggle={this.toggleFindServerByNameModal.bind(this)}>
          <ModalHeader toggle={this.toggleFindServerByNameModal.bind(this)}>Find servers by name</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" placeholder="Name of server to find eg. my centos" value={this.state.serverName} onChange={this.handleChangeName.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findServerByName.bind(this, this.state.serverName)}>Find</Button>{' '}
            <Button color="secondary" onClick={this.toggleFindServerByNameModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.delServerModal} toggle={this.toggleDelServerModal.bind(this)}>
          <ModalHeader toggle={this.toggleDelServerModal.bind(this)}>Delete a "server" object</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" placeholder="ID of server to delete eg. 123" value={this.state.serverId} onChange={this.handleChangeId.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteServer.bind(this, this.state.serverId)}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggleDelServerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Language</th>
              <th>Framework</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {servers} 
          </tbody>
        </Table>
        <footer class="container">
          <div class="column-left">
            <span>Yash bunkar (+91) 9669273880 </span> 
            <a href="https://www.linkedin.com/in/yash-bunkar-8645841a1/">     
              <img class="img123" alt="LinkedIn" src="https://media.licdn.com/dms/image/D4D35AQHqQsRD5f48fg/profile-framedphoto-shrink_200_200/0/1679727075358?e=1680624000&v=beta&t=_O5qIlwC9W_7nO_CQb4GA0D_6BVsNbYEu0Vu6t7RfOc" width="50" height="50" />
            </a>
          </div>
          <div class="column-center">
            <p>
              <a class="al123"href="mailto:yash.bunkar2019@vitbhopal.ac.in?Subject=Congratulations!" target="_top">bunkar1407@gmail.com </a>   
              <a href="https://github.com/YashBunkar">     
                <img class="img123" alt="GitHub" src="https://avatars0.githubusercontent.com/u/9919?s=280&v=4" width="50" height="50" />
              </a>
            </p>
          </div>
          <div class="column-right">
            <p>This Projected copyrighted by bunkar1407@gmail.com</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
