const PROTO_PATH = __dirname + "/../pb/messages.proto";
const fs = require("fs");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const implementation = require("./serverImplementation");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const allPackage = grpc.loadPackageDefinition(packageDefinition).userService;

const cacert = fs.readFileSync(__dirname + "/../Keys/ca.crt");
const cert = fs.readFileSync(__dirname + "/../Keys/client.crt");
const key = fs.readFileSync(__dirname + "/../Keys/client.key");
const kvpair = {
    private_key: key,
    cert_chain: cert,
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    const server = new grpc.Server();
    server.addService(allPackage.UserService.service, {
        getByUserId: implementation.getByUserId,
        getAll: implementation.getAll,
        save: implementation.save,
        saveAll: implementation.saveAll,
        addImage: implementation.addImage,
        sayHello: implementation.sayHello,
    });
    server.bindAsync(
        "0.0.0.0:50051",
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start();
        }
    );
}

main();