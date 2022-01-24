const PROTO_PATH = __dirname + "/../pb/messages.proto";
const fs = require("fs");
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
const PORT = 50051;

const cacert = fs.readFileSync(__dirname + "/../Keys/ca.crt");
const cert = fs.readFileSync(__dirname + "/../Keys/client.crt");
const key = fs.readFileSync(__dirname + "/../Keys/client.key");

const credentials = grpc.credentials.createSsl(cacert, key, cert);

function main() {
    // 如果是域名进行签发的证书 这里localhost需要替换为对应的域名
    let target = `localhost:${PORT}`;

    const client = new userService.UserService(
        target,
        // credentials // SSL安全传输
        grpc.credentials.createInsecure() //不进行加密传输
    );
    implementation.getByUserId(client);
    implementation.getAll(client);
    implementation.addImage(client);
    implementation.saveAll(client);
    implementation.sayHello(client);
}

main();