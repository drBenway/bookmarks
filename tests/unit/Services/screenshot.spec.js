const chai = require('chai');
const rewire = require('rewire');
const chaiHttp = require('chai-http');
const { expect } = chai;
const scrnsht = require('../../../Services/screenshot.js');
chai.use(chaiHttp);

describe('screenshots', function(){

    it('should return an object with a thumbs property', function () {
      expect(scrnsht('JohnDoe')).to.return.an('object');
      let returnval = scrnsht('johndoe');
      expect(returnval.thum).to.have.own.property('thumb');
    });
    it('should return a thumbs property with a string containing thumb/', function () {
      let returnval = scrnsht('janedoe');
      expect(returnval.thumb).to.include('thumb/');
    });
});
