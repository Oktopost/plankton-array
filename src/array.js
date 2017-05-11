require('../namespace').namespace('Plankton', function(container) {
	'use strict';
	
	
	var is = container.Plankton.is;
	
	
	/**
	 * @name Plankton.array
	 * 
	 * @param {*} subject
	 * @return {Array}
	 */
	var array = function(subject) {
		if (is.undefined(subject)) {
			return [];
		}
		
		return (is.array(subject) ? subject : [subject]);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.forEach = function(subject, callback, scope) {
		array.forEach.key(subject, function(key) {
			return callback.call(scope, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.forEach.value = array.forEach;
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)} callback
	 * @param {*=} scope
	 */
	array.forEach.key = function(subject, callback, scope) {
		for (var key in subject) {
			if (!is.index(key)) {
				continue;
			}
			
			if (callback.call(scope, parseInt(key)) === false) {
				break;
			}
		}
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Number *)} callback
	 * @param {*=} scope
	 */
	array.forEach.pair = function(subject, callback, scope) {
		array.forEach.key(subject, function(key) {
			return callback.call(scope, key, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Array)} callback
	 * @param {*=} scope
	 */
	array.forEach.item = function(subject, callback, scope) {
		array.forEach.pair(subject, function(key, value) {
			var obj = {};
			obj[key] = value;
			return callback.call(scope, obj);
		});
	};
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last = function (subject) {
		if (subject.length === 0) {
			return undefined;
		}
		
		return subject[subject.length - 1];
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.last.key = function (subject) {
		if (subject.length === 0) {
			return undefined;
		}
		
		return subject.length - 1;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last.value = array.last;
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.first = function (subject) {
		var first = undefined;
		
		array.forEach.value(subject, function(value) {
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.first.key = function (subject) {
		var first = undefined;
		
		array.forEach.key(subject, function(value) {
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.first.value = array.first;
	
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.count = function (subject) {
		var count = 0;
		array.forEach(subject, function() { count++; });
		return count;
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.isNormalized = function (subject) {
		return subject.length === 0 || array.last.key(subject) === (array.count(subject) - 1);
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.normalize = function (subject) {
		var arr = [];
		
		array.forEach(subject, function(value) {
			arr.push(value);
		});
		
		return arr;
	};
	
	
	this.array = array;
});