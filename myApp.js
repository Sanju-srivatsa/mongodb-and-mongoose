require('dotenv').config();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


mongoose.connect('mongodb+srv://dbSanju:DBpassword@cluster0.yblv8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
, { useNewUrlParser: true, useUnifiedTopology: true });


// let Person ;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);
// ...


const createAndSavePerson = (done) => {
  var sanjuSrivatsa = new Person ({
    name:'Sanju Srivatsa',
    age:23,
    favoriteFoods:['Munchuria','eggs','vegetables']
  })
  sanjuSrivatsa.save((err,data)=>{
  if (err) return done(err)
  done(null , data);
})
}



const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, people)=>{
  if (err) return done(err)
  done(null , people);
  })
};

const findPeopleByName = (personName, done) => {
 Person.find({name: personName},(err,peopleFind)=>{
   if (err) return done(err)
  done(null , peopleFind);
})
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,uniqueFood)=>{
  if (err) return done(err)
  done(null , uniqueFood);
})
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,uniqueId)=>{
  if (err) return done(err)
  done(null , uniqueId);
})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
Person.findById({_id:personId},(err,person)=>{
  person.favoriteFoods.push(foodToAdd);
  person.save((err,data)=>{
  if (err) return done(err)
  done(null , data);
})
});
};

const findAndUpdate = (personName, done) => {
Person.findOneAndUpdate({name:personName},{age:20},{new : true},(err,foundPerson)=>{
  if (err) return done(err)
  done(null , foundPerson);
})
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,removedPerson)=>{
  if (err) return done(err)
  done(null , removedPerson);
})
};

const removeManyPeople = (done) => {
  Person.deleteOne({name:"Mary"},(err,removedPerson)=>{
  if (err) return done(err)
  done(null , removedPerson);
})
};

const queryChain = (done) => {
Person.find({favoriteFoods:"burrito"})
      .sort({name:'asc'})
      .limit(2)
      .select('-age')
      .exec((err,result)=>{
  if (err) return done(err)
  done(null , result);
})
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
