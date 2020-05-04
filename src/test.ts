import { Handler, Context, Callback } from "aws-lambda";
import * as mongoose from 'mongoose';
import { TestModel } from './models/test';

interface HelloResponse {
  statusCode: number;
  body: string;
}

let connection:any = null;

const connect = async () =>{
  if(connection && mongoose.connection.readyState === 1) return Promise.resolve(connection);

  const conn = await mongoose.connect('mongodb+srv://lambda:k334k334@cluster0-nnnsh.gcp.mongodb.net/test?retryWrites=true&w=majority');
  connection = conn;
  return connection;
};


export const createTest : Handler = (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.body)
  const { id, password } = JSON.parse(event.body);
  connect().then(
    ()=>{
      const tests = new TestModel({ id, password })
      return tests.save();
    }
  ).then(
    tests => {
      const response: HelloResponse = {
        statusCode: 200,
        body: JSON.stringify({
          status: 200,
          body: tests
        })
      };
      cb(null, response);
    }
  ).catch(
    e => cb(e)
  );
};