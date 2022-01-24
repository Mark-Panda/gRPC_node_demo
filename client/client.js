const PROTO_PATH = __dirname + "/../pb/messages.proto";
const fs = require("fs");
const parseArgs = require("minimist");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const implementation = require("./clientImplementation");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const userService = grpc.loadPackageDefinition(packageDefinition).userService;

const cacert = fs.readFileSync(__dirname + "/../Keys/ca.crt");
const cert = fs.readFileSync(__dirname + "/../Keys/client.crt");
const key = fs.readFileSync(__dirname + "/../Keys/client.key");
const kvpair = {
    private_key: key,
    cert_chain: cert,
};

function main() {
    const argv = parseArgs(process.argv.slice(2), {
        string: "target",
    });
    let target;
    if (argv.target) {
        target = argv.target;
    } else {
        target = "localhost:50051";
    }
    const client = new userService.UserService(
        target,
        grpc.credentials.createInsecure()
    );

    implementation.getByUserId(client);
    implementation.getAll(client);
    implementation.addImage(client);
    implementation.saveAll(client);
    implementation.sayHello(client);
}

main();