import React, { Component } from 'react';
import * as go from 'gojs';
import { GojsDiagram } from 'react-gojs';
import './MyDiagram.css'

class MyDiagram extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: {
                nodeDataArray: [
                ],
                linkDataArray: [
                ]                
            }
        };
    }

    createDiagram(diagramId) {
        const $ = go.GraphObject.make;

        const myDiagram =
      $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
        {
          // start everything in the middle of the viewport
          initialContentAlignment: go.Spot.Center,
          // have mouse wheel events zoom in and out instead of scroll up and down
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        });

    
    // define the Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // define the node's outer shape, which will surround the TextBlock
        $(go.Shape, "RoundedRectangle",
          {
            parameter1: 20,  // the corner has a large radius
            fill: $(go.Brush, "Linear"),
            stroke: null,
            portId: ""
          }),
        $(go.TextBlock,
          {
            font: "bold 11pt helvetica, bold arial, sans-serif",
            editable: true  // editing the text automatically updates the model data
          },
          new go.Binding("text").makeTwoWay())
      );

      myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
          curve: go.Link.Bezier, adjusting: go.Link.Scale,
          reshapable: false, relinkableFrom: false, relinkableTo: false,
          toShortLength: 10
        },
        new go.Binding("points").makeTwoWay(),
        new go.Binding("curviness"),
        $(go.Shape,  // the link shape
          { strokeWidth: 1.5 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null }),
        $(go.Panel, "Auto",
          $(go.Shape,  // the label background, which becomes transparent around the edges
            {
              fill: $(go.Brush, "Radial",
                      { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
              stroke: null
            }),
          $(go.TextBlock, "transition",  // the label text
            {
              textAlign: "center",
              font: "16pt helvetica, arial, sans-serif",
              margin: 4,
            },
            // editing the text automatically updates the model data
            new go.Binding("text").makeTwoWay())
        )
      );

        return myDiagram;
    }


    render() {
        if(this.props.objModel) {
            return (
                <GojsDiagram
                    diagramId="myDiagramDiv"
                    model={this.props.objModel.model}
                    createDiagram={this.createDiagram}
                    className="myDiagram"
                />
            )
        } else {
            return (
                ""
            )
        }
    }

}

export default MyDiagram;

