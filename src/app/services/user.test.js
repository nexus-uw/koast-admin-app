'use strict';

describe('koast admin user service:', function() {
  beforeEach(module('koastAdminApp.service'));

  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('_koastHttp', function() {
      return {
        saveToken : function(val){
          if(val.token){
            _token = val.token;
          }else{
            _token = val;
          }
        },
        deleteToken : function(){
          _token = null;
        }
      };
    });
  }));

  var user, _koastHttp, _token;
  beforeEach(function(){
    _token = null;
    inject(function($injector){
      user = $injector.get('user');
    });
  });

  it('should exist',function(){
    expect(user).to.be.an('object');
    expect(user.login).to.be.a('function');
    expect(user.logout).to.be.a('function');
    expect(user.refreshToken).to.be.a('function');
    expect(user.isAuthenticated).to.be.a('function');
    expect(user.isAuthenticated()).to.be.false
  });

  it('should login',function(){
    return user.login('user','pass')
    .then(function(){
      expect(user.isAuthenticated()).to.be.true;
      expect(_token).to.not.be.null;
    });
  });

  it('should logout',function(){
    return user.login('user','pass')
    .then(user.logout)
    .then(function(){
      expect(user.isAuthenticated()).to.be.false;
      expect(_token).to.be.null;
    });
  });

  it('should try to refresh the token',function(){
    return
    user.login('user','pass')
    .then(user.refreshToken)
    .then(function(){
      expect(user.isAuthenticated()).to.be.true;
      expect(_token).to.not.be.null;
    });
  });

});
