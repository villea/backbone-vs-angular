var request = require('request')
  , app = require('../app')
  , should = require("should")


describe('REST API - Tests',function (){
	before(function (done){
		app.listen(3001, function(){
           console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
           done()
        });
	})

	describe('/api/',function (){
		it('should be up and running!',function (done){
			request('http://localhost:3001/api',function (error, response, body){
				response.statusCode.should.equal(200)
				done()
			})
		})
	})

	describe('/api/tasks POST',function (){
		it('should create new person',function (){
			var json = {firstname : 'Ville', surname : 'Anttonen'};
			request.post({url :'http://localhost:3001/api/tasks',
		                  body : json.toString()},function (error, response, body){
				response.statusCode.should.equal(200)
				done()
			})
		})
	})

	describe('/api/employees GET',function(){
		it('should list all employees',function (done){
			request('http://localhost:3001/api/tasks',function (error, response, body){
				response.statusCode.should.equal(200);
				done()
			})
		})
	})
})