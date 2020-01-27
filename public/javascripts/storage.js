TodoStorage = (function(){
  try{
    function fetch(storage, key){
      return eval(storage).getItem(key)
    }

    function set(storage, key, hash){
      return eval(storage).setItem(key, hash)
    }

    function remove(storage, key){
      return eval(storage).removeItem(key)
    }

    return{
      fetch: fetch,
      set: set,
      remove: remove
    }
  }
  catch(e){
    console.log(e)
  }
})();