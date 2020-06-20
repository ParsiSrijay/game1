import React,{ Component } from 'react';
import { Card,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
//import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import OptionDetails from './OptionComponent';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AwesomeSlider from 'react-awesome-slider';
//import AwsSliderStyles from 'react-awesome-slider/src/components/react-awesome-frame/styles.scss';
import Slider from 'infinite-react-carousel';
import Carousel from 'react-elastic-carousel';
import { Alert } from 'react-bootstrap';

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
				<div className="mt-2">
					<OptionDetails options={question.options} correctAnswer={question.correctAnswer}/>
				</div>
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
					<div className="col-12">
						<Carousel>
							{questions}
						</Carousel>
					</div>
				</div>
			</div>
		);
	}

}
export default Questions;