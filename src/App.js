import React, { Component } from 'react'
import styled from 'styled-components'

import Form from './Components/Form'
import MyDiagram from './Components/Canvas/MyDiagram'
import Table from './Components/Table/table'
import Alert from './Components/Alert/Alert'

const Container = styled.div`
  background: #D6D6D6;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
`

const ContainerDia = styled.div`
  margin: 0 auto;
  width: 80%;
`


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false
    }
    this.getStateForm = this.getStateForm.bind(this);
    this.getStateAlert = this.getStateAlert.bind(this);
  }

  getStateForm(diargram) {
    this.setState({
      diargram: diargram,
    })
  }

  getStateAlert(alert) {
    this.setState({
      showAlert: alert
    })
  }

  render() {

    return (
      <div>
        <Container>
          <Form onMyDiagramUpdate={this.getStateForm} onAlertUpdate={this.getStateAlert}/>
        </Container>
          <Alert showAlert={this.state.showAlert}/>
        <ContainerDia>
          <MyDiagram objModel={this.state.diargram} showAlert={this.state.showAlert}/>
          <Table objModel={this.state.diargram} showAlert={this.state.showAlert}/>
        </ContainerDia>
      </div>
    );
  }
}

export default App;
