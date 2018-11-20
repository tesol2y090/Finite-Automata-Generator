import React, { Component } from 'react'

class Table extends Component {

    showTable() {

        const sortData = this.props.objModel.model.linkDataArray.sort((a,b) => (parseInt(a.from.substring(1)) > parseInt(b.from.substring(1))) ? 1 : ((parseInt(b.from.substring(1)) > parseInt(a.from.substring(1))) ? -1 : 0))
        const dataLength = [...this.props.objModel.data]
        let newArray = []
        
        for(let i = 0; i <= sortData.length - dataLength.length; i+=dataLength.length) {
                newArray.push({"from": sortData[i].from, "text":[]})
        }

        for (let i = 0; i < newArray.length; i++) {
            for (let j = 0; j < sortData.length; j++) {
                if(newArray[i].from === sortData[j].from) {
                    newArray[i].text.push({[sortData[j].to]: sortData[j].text})
                }
            }
        }

        for (let i = 0; i < newArray.length; i++) {
            newArray[i].text.sort((a,b) => (Object.values(a) > Object.values(b)) ? 1 : ((Object.values(b) > Object.values(a)) ? -1 : 0))
        }

        //Inset description to every node
        for (let i = 0; i < this.props.objModel.model.nodeDataArray.length; i++) {
            if(i === 0){
                newArray[0]["des"] = newArray[0].from + "  (With nothing)"
            } else if(i === this.props.objModel.model.nodeDataArray.length - 1) {
                newArray[this.props.objModel.model.nodeDataArray.length - 1]["des"] = newArray[this.props.objModel.model.nodeDataArray.length - 1].from + "  (Final Staet) " + this.props.objModel.model.nodeDataArray[i].state
            } else {
                newArray[i]["des"] = newArray[i].from + "  (Ending with  )  " + this.props.objModel.model.nodeDataArray[i].state
            }
        }

        return (
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th colspan={dataLength.length} style={{"text-align": "center"}}>Function/Input</th>
                    </tr>
                    <tr>
                        <th scope="col">State</th>
                        {this.props.objModel.data.map(r => (
                            <th scope="col">{r}</th>
                        ))}
                    </tr>
                    {
                        newArray.map(row => (
                            <tr>
                                <th scope="col">{row.des}</th>
                                {row.text.map(e => (
                                    <th scope="col">{Object.keys(e)}</th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
            </table>
        )
    }

    render() {
        if(this.props.objModel && !this.props.showAlert.showAlert) {
            return (
                this.showTable()
            )
        } else {
            return (
                ""
            )
        }
    }
}

export default Table;