#!/bin/bash

#Shell script does not work
#TODO: Package Encryption Server into .jar

echo "Starting Encryption Server and client server..."
java -cp ./EncryptionServer/target/encryption-server-1.0-SNAPSHOT.jar com.datum.keygen.EncryptServer

#& node ./server/index.js && fg



trap 'kill $(jobs -p)' SIGINT SIGTERM EXIT