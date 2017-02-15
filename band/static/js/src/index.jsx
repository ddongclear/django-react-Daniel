
import React from 'react';
import {render} from 'react-dom';
import Loading from 'react-loading';

import { connect  } from 'react-redux';
import { showLoading, hideLoading  } from 'react-redux-loading-bar';
import { shuffle, slice  } from 'lodash';

import $ from 'jquery';

//react-redux-loading-bar-packages
var bands  = []

class App extends React.Component {
	constructor() {
		super();
		
	}

	render () {
		return (
			<div>
			      <Loading type='bars' color='#000' />
			</div>
		);
	}
};

var BandComponent = React.createClass({
		getInitialState: function() {
	    return {customText: "Text before the click",show:true};
		},
	
	componentDidMount: function() {
		//startLoadingBar
		$.ajax({
		xhr: function() {
				var xhr = new window.XMLHttpRequest();
				 // Download progress
				xhr.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// Do something with download progress
					console.log(percentComplete);
					}
				}, false);
				console.log(xhr);
				return xhr;
		},

			      url: "band/api.json",
			      dataType: 'json',
			      cache: false,
			success: function(data) {
					this.setState(
						{data:data}
					);

			}.bind(this),
			error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	//
	//	customClickFunction: function () {
	//		this.setState({customText: "You clicked the button "});
	//	},
	//
		render : function () {
			var bands = []
			for (var key in this.state.data) {
				bands.push(this.state.data[key])
			}

			var testStyle = {fontSize : '18px', marginRight : '20px' ,fontColor : 'Red'}
			return (
				<div style ={testStyle}>
					<h1>{this.state.customText}</h1>
					<button onClick={this.customClickFunction}>Click Me!! </button>

				{
					bands.map(function(band){
					return (
						<Band name={band.name} image={band.image} />
					)
				})
				}

				</div>
			)
		}
	}
);


var Band = React.createClass({
	render : function () {

		return (
			<div>
				<h2>{this.props.name} </h2>
				<img src={this.props.image} />
			</div>
		)
	}
});

render(<App/>, document.getElementById('loading-bar'));

render(
	<BandComponent bands={bands} />,
	document.getElementById("content"));

