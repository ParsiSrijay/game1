import React,{ Component } from 'react';
import { Card,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
//import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import OptionDetails from './OptionComponent';


function RenderQuestions({question}){
	return(
		<Card>
			<center><CardTitle>{question.id}.  {question.category}</CardTitle></center>
			<CardBody>{question.question}</CardBody>
		</Card>
	);
}

const Questions = (props) =>{
	const questions = props.questions.questions.map((question)=>{
		return(
			<div key={question.id} className="col-12 m-1">
				<RenderQuestions question={question} />
				<OptionDetails options={question.options} />
			</div>
		);
	});
	if(props.questions.isLoading){
		return(
			<div className="container">
				<div className="row">
					<Loading/>
				</div>
			</div>
		);
	}
	else if(props.questions.errMess){
		return(
			<div className="container">
				<div className="row">
					<h4>{props.questions.errMess}</h4>
				</div>
			</div>
		);
	}
	else{
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h3>Questions</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					{questions}
				</div>
			</div>
		);
	}

}
export default Questions;