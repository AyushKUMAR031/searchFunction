const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Question = require('../models/searchModel');

const PROTO_PATH = __dirname + '/../grpc/grpcSearch.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const searchProto = protoDescriptor.SearchService;

const search = async (call, callback) => {
  const query = call.request.query;
  const questions = await Question.find({ title: new RegExp(query, 'i') });
  const response = questions.map(q => ({
    id: q._id.toString(),
    type: q.type,
    title: q.title,

    options: q.options ? q.options.map(opt => ({
      text: opt.text,
      isCorrectAnswer: opt.isCorrectAnswer,
    })) : [],

    solution: q.solution || '',
    
  }));
  callback(null, { questions: response });
};

const server = new grpc.Server();
server.addService(searchProto.service, { search });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running at http://0.0.0.0:50051');
  server.start();
});