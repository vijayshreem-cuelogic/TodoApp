// ============Es6===============
class Person{
  constructor(name){
    this._name = name;
  }

  get name(){
    return this._name
  }

  set name(name){
    return this._name = name
  }
}

class Programmer extends Person{
  constructor(name, language){
    super(name)
    this.language = language;
  }

  get language(){
    return this._language
  }

  set language(language){
    this._language = language
  }

  writeCode(){
    return `${this.name} writes code in ${this.language}`
  }

  static getProgrammers(...obj){
    for(let programmer of obj){
      console.log(`Programmer ${programmer.name} Language ${programmer.language}`)
    }
  }
}

//==============ES5=================

function Person(name){
  this._name = name;
}

function Programmer(name, language){
  Person.call(this,name);
  this.language = language;

  this.getProgrammers = function(programmerObjects){
    for(let programmer in programmerObjects){
      console.log(`${programmer.name} writes code in ${programmer.language}`)
    }
  }
}

Person.prototype = {
  get name(){
    return this._name;
  },
  set name(newName){
    return this._name = newName;
  }
}

Programmer.prototype = {
  get language(){
    return this.language
  },
  set language(newLanguage){
    return this.language = newLanguage
  }
}
Programmer.prototype.writeCode =  function(){
  return `${this.name} writes code in ${this.language}`
}

Programmer.prototype = Object.create(Person)
Programmer.constructor = Programmer