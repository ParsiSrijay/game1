import React,{ Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button} from 'reactstrap';
import { Alert } from 'react-bootstrap';

function CheckAnswer({correctAnswer,selectedOptions,display}){
  var c=0;
  if(display){
    for(var i=0;i<correctAnswer.length;i++){
      if(correctAnswer[i].options === selectedOptions[i].options){
        c=c+1
      }
      else{
        return(
          <Alert key={1} variant='danger'>
            Wrong Answer !!!
          </Alert>
        );
      }
    }
    return(
      <Alert key={1} variant='success'>
        Correct Answer !!!
      </Alert> 
    );
  }
  else{
    return(
      <div>
      </div>
    );
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

class OptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.options,
      dragDisabled:false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items:items
    });
  }

  handleDrag(){
    this.setState({
      dragDisabled:true
    });
  }

  
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <>  
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => ( 
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index} isDragDisabled={this.state.dragDisabled}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="col-12"
                        >
                          {item.options}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
        {' '}
        <div className="mt-2">
          <Button onClick={this.handleDrag}>
            <span>Submit</span>
          </Button>
        </div>
        <div className="mt-2">
          <CheckAnswer correctAnswer={this.props.correctAnswer} selectedOptions={this.state.items} display={this.state.dragDisabled}/>
        </div>
      </>
    );
  }
}

export default OptionDetails;