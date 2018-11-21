import React, { Component } from 'react';


class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.showData = this.showData.bind(this);
    }
    
    showData(event) {
        event.preventDefault();
        const inputArray = event.target.input.value.split("").filter(num => !isNaN(num)).filter(num => num !== " ")
        const condition = event.target.condition.value
        let isValid = true

        //Check condition does't contain in data
        for (let i = 0; i < condition.length; i++) {
            if(inputArray.indexOf(condition[i]) === -1) {
                isValid = false
            }
        }

        //Check multiple input
        for (let i = 0; i < inputArray.length; i++) {
            let count = 0
            for (let j = 0; j < inputArray.length; j++) {
                if(inputArray[i] === inputArray[j]) {
                    count++;
                }
            }
            if(count > 1) {
                isValid = false
            }
        }

        if(inputArray.length === 0 || condition.length === 0 || !isValid) {
            let alert = {
                showAlert: true
            }
            this.props.onAlertUpdate(alert)
            document.getElementById("finiteForm").reset();
            return
        } else {
            let alert = {
                showAlert: false
            }
            this.props.onAlertUpdate(alert)
        }

        // this.renderCanvasType1(inputArray, condition)
        this.renderCanvasType2(inputArray, condition)

        document.getElementById("finiteForm").reset();
    }

    renderCanvasType2(data, condition) {
        const conditionText = condition

        let ObjModel = {
            model: {
                nodeDataArray: [
                ],
                linkDataArray: [
                ]
            },
            data: data
        }


        //Create Node(State)
        for (let i = 0; i <= conditionText.length; i++) {
            let node = "S"+i
            ObjModel.model.nodeDataArray.push({key: node,
                 text: node,
                 transit: conditionText[i],
                 state: conditionText.substring(0, i),
                 error: [],
                 description: ""
                })
        }

        //Insert error input
        for (let i = 0; i < ObjModel.model.nodeDataArray.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if(ObjModel.model.nodeDataArray[i].transit !== data[j]){
                    ObjModel.model.nodeDataArray[i].error.push(data[j])
                }
            }
        }

        //Insert transit to linkDataArray
        for (let i = 0; i < ObjModel.model.nodeDataArray.length - 1; i++) {
            let node = ObjModel.model.nodeDataArray[i].key
            let nextNode = ObjModel.model.nodeDataArray[i+1].key
            ObjModel.model.linkDataArray.push({from: node, to: nextNode, text: conditionText[i]})
        }

        //Insert error transit to every node and ever case
        for (let i = 1; i < ObjModel.model.nodeDataArray.length - 1; i++) {
            for (let j = 0; j < ObjModel.model.nodeDataArray[i].error.length; j++) {
                const errorState = ObjModel.model.nodeDataArray[i].state + ObjModel.model.nodeDataArray[i].error[j]
                for (let k = i; k >= 0; k--) {
                    if(errorState.substring(errorState.length - k) === ObjModel.model.nodeDataArray[k].state) {
                        ObjModel.model.linkDataArray.push({from: ObjModel.model.nodeDataArray[i].key, to: ObjModel.model.nodeDataArray[k].key, text: ObjModel.model.nodeDataArray[i].error[j]})
                        break
                    }
                }
            }
        }

        //Inset error transit to first state
        const firstState = ObjModel.model.nodeDataArray[0]
        for (let i = 0; i < ObjModel.model.nodeDataArray[0].error.length; i++) {
            ObjModel.model.linkDataArray.push({from: firstState.key, to: firstState.key, text: firstState.error[i]})
        }

        //Insert error transit to last state
        const lastState = ObjModel.model.nodeDataArray[ObjModel.model.nodeDataArray.length - 1]
        for (let i = 0; i < lastState.error.length; i++) {
            ObjModel.model.linkDataArray.push({from: lastState.key, to: lastState.key, text: lastState.error[i]})
        }

        //sendDataObjectToDiagram and table
        this.props.onMyDiagramUpdate(ObjModel)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.showData.bind(this)} id="finiteForm">
                    <div class="form-group">
                        <label id="Input">Set of input </label>
                        <input type="text" class="form-control" id="input" placeholder="Please input input {x1, x2, x3, ..., xn}"></input>
                    </div>
                    <div class="form-group">
                        <label id="Input">Condition</label>
                        <input type="text" class="form-control" id="condition" placeholder="Please input Condition y1y2y3y4...yn "></input>
                    </div>
                    <button type="submit" class="btn btn-light ">Submit</button>
                </form>
            </div>
        )
    }
}

export default Form;