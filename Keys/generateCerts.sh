@echo off
set OPENSSL_CONF=/System/Library/OpenSSL/openssl.cnf 

echo 生成私钥:
openssl genrsa -passout pass:1111 -des3 -out ca.key 4096

echo 生成根证书:
openssl req -passin pass:1111 -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=MyRootCA"

echo 生成服务端私钥:
openssl genrsa -passout pass:1111 -des3 -out server.key 4096

echo 创建证书请求文件CSR:
#使用域名的话 localhost替换成域名进行签发
openssl req -passin pass:1111 -new -key server.key -out server.csr -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=localhost"

echo 利用ca.crt来签署 server.csr:
openssl x509 -req -passin pass:1111 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

echo Remove passphrase from server key:
openssl rsa -passin pass:1111 -in server.key -out server.key

echo 生成客户端私钥:
openssl genrsa -passout pass:1111 -des3 -out client.key 4096

echo 创建证书请求文件CSR:
#使用域名的话 localhost替换成域名进行签发
openssl req -passin pass:1111 -new -key client.key -out client.csr -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=localhost"

echo 利用ca.crt来签署 client.csr:
openssl x509 -passin pass:1111 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

echo Remove passphrase from client key:
openssl rsa -passin pass:1111 -in client.key -out client.key