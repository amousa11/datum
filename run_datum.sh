#!/bin/bash

#Shell script does not work
TODO: Package Encryption Server into .jar

javac ./EncryptionServer/src/main/java/com/datum/keygen/EncryptTools.java
javac ./EncryptionServer/src/main/java/com/datum/keygen/EncryptServer.java

java ./EncryptionServer/src/main/java/com/datum/keygen/EncryptTools.class
java ./EncryptionServer/src/main/java/com/datum/keygen/EncryptServer.class

node ./server/index.js