import * as mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  id: String,
  password: String 
});

const TestModel = mongoose.model('Test', TestSchema);

export { TestModel }