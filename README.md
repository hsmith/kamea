<p align="center">
  <img src="http://i.imgur.com/pMKjQLZ.png" alt="Sigil.js logo"/>
</p>

#Kamea
Kamea is a store for producing immutable states for es5. It was created to address a number of issues with Redux:
* Object.assign is super useful but also messy
* Asynchronous operations are awkward to implement
* Simplification of extremely common patterns

# Installation
CDN:
```html
<script src="https://unpkg.com/kamea@latest/kamea.js"></script>
```

# Counter

```javascript
<script>
 var store = Kamea({
    counter : function(state,action,commit){
    	switch(action.type){
        case '#':
          //create initial value of state
          return {value:0};
      	case 'increment':
          //pass diff of state to apply
          return {value:state().value+1};
        case 'decrement':
          return {value:state().value-1};
        case 'step':
          //commit state changes at anytime
          commit({value:state().value+1});
          setTimeout(function(){
            //even asynchronously
          	commit({value:state().value+1});
            setTimeout(function(){
          	  commit({value:state().value+1});
  	        },1000)
          },1000)
          //returning undefined does no change
      }
    }
  })
  
  //Subscribe to new states
  store.subscribe(function(state){
  	console.log(state.counter.value);
  })
  
  //dispatch action
  store.dispatch({type:'increment'})
</script>
```
