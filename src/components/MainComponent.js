import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/ActionCreators';
import Questions from './QuestionsComponent';

const mapStateToProps = state =>{
  return {
    questions : state.questions,
  }    
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions:() => {dispatch(fetchQuestions())},
});

class Main extends Component{
	constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchQuestions();
  }
	render(){
		return(
			<Questions questions={this.props.questions}/>
		)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);