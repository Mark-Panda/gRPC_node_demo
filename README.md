# gRPC学习node版本

## 项目结构

```text
.
├── Keys
│   ├── ca.crt
│   ├── ca.key
│   ├── client.crt
│   ├── client.csr
│   ├── client.key
│   ├── generateCerts.sh  签发证书的脚本
│   ├── server.crt
│   ├── server.csr
│   └── server.key
├── README.md
├── client 客户端
│   ├── Images
│   ├── client.js
│   └── clientImplementation.js
├── package.json
├── pb
│   └── messages.proto
└── server 服务端
    ├── server.js
    ├── serverImplementation.js
    └── users.js
```

## 备注

[文章借鉴](https://github.com/alulema/js-Node.Grpc)