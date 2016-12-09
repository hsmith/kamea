function Kamea(options){
	var state = {};

  for(var i in options){
  	state[i] = Object.assign({},options[i](undefined,{type:'#'},undefined));
  }

  var ret = {
  	subscribers:[],
  	state:state,
    subscribe: function(s){
    	ret.subscribers.push(s)
    },
    dispatch: function(action){
    	var results = {};
    	for(var i in options){
      	var makeCommitter = function(name){
        	return function(commitDiff){
          	var intermediate = {};
            intermediate[name] = Object.assign({},ret.state[name],commitDiff);
          	ret.state = Object.assign({},ret.state,intermediate);
            for(var j in ret.subscribers){
              ret.subscribers[j](ret.state);
            }
          }
        }
        var makeGetState = function(name){
        	return function(){
          	return ret.state[name]
          }
        }
        var change = options[i](makeGetState(i),action,makeCommitter(i))
        if(change){
        	var diff = Object.assign(ret.state[i],change);
          if(typeof diff === "object"){
            results[i] = Object.assign({},ret.state[i],diff);
          }
        }
      }
      var keys = Object.keys(results);
      if(keys.length>0){
      	ret.state = Object.assign({},ret.state,results);
        for(var j in ret.subscribers){
        	ret.subscribers[j](ret.state);
        }
      }
    }
  }
  return ret;
}
