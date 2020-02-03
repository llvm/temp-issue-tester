module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(768);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 381:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 768:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const github = __webpack_require__(974);
const core = __webpack_require__(381);

async function run() {
  const token = core.getInput('token');
  const octokit = new github.GitHub(token);

  const issueID = github.context.issue.number;

   octokit.issues.createComment({
     owner: 'llvm',
     repo: 'temp-issue-tester',
     issue_number: issueID,
     body: '@llvm/issue-testers'
   })

}

run();


/***/ }),

/***/ 974:
/***/ (function() {

eval("require")("@actions/github");


/***/ })

/******/ });