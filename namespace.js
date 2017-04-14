'use strict';


const Namespace = require('oktopost-namespace');


const container = {
	Plankton: {
		is: require('oktopost-plankton-is').is
	}
};

const Plankton = new Namespace(container);


Plankton.namespace('Plankton');


module.exports = {
	Plankton: container.Plankton,
	namespace: Plankton.getCreator()
};