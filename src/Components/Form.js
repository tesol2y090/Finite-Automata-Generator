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

        this.renderCanvas(inputArray, condition)

        document.getElementById("finiteForm").reset();
    }

    renderCanvas(data, condition) {
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

        for (let i = 0; i <= conditionText.length; i++) {
            let node = "S"+i
            ObjModel.model.nodeDataArray.push({key: node, text: node, transit: conditionText[i.toString()]})
        }

        for (let i = 0; i < ObjModel.model.nodeDataArray.length - 1; i++) {
            let node = ObjModel.model.nodeDataArray[i].key
            let nextNode = ObjModel.model.nodeDataArray[i+1].key
            ObjModel.model.linkDataArray.push({from: node, to: nextNode, text: conditionText[i]})
        }

        for (let i = 0; i < ObjModel.model.nodeDataArray.length; i++) {
            let node = ObjModel.model.nodeDataArray[i].key
            let originNode = ObjModel.model.nodeDataArray[0].key
            for (let j = 0; j < data.length; j++) {
                if(i === ObjModel.model.nodeDataArray.length - 1) {
                    ObjModel.model.linkDataArray.push({from: node, to: node, text: data[j]})                    
                } else if(ObjModel.model.nodeDataArray[i].transit !== data[j]) {
                    ObjModel.model.linkDataArray.push({from: node, to: originNode, text: data[j]})
                }
                
            }
        }
        this.props.onMyDiagramUpdate(ObjModel)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.showData.bind(this)} id="finiteForm">
                    <div class="form-group">
                        <label id="Input">Set of input </label>
                        <input type="text" class="form-control" id="input" placeholder="Please input input"></input>
                    </div>
                    <div class="form-group">
                        <label id="Input">Condition</label>
                        <input type="text" class="form-control" id="condition" placeholder="Please input Condition"></input>
                    </div>
                    <button type="submit" class="btn btn-light ">Submit</button>
                </form>
            </div>
        )
    }
}

export default Form;