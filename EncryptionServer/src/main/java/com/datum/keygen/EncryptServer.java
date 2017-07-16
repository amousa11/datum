package com.datum.keygen;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.StringBuilder;
import java.util.HashMap;

import com.securityinnovation.jNeo.NtruException;
import com.securityinnovation.jNeo.ntruencrypt.NtruEncryptKey;
import org.json.JSONObject;
import org.json.JSONException;

import org.newsclub.net.unix.AFUNIXServerSocket;
import org.newsclub.net.unix.AFUNIXSocketAddress;

class EncryptServer {

//    TODO: Is there a better way to write the code so that I am not catching every exception known to man???
//    TODO: Create file with admin permissions. Might have to do this in packaging - when running the full program
    public static void main(String[] args) throws IOException, JSONException {

        HashMap<Socket, NtruEncryptKey> keyPairs = new HashMap();

        final File socketFile =
                new File(new File("/tmp"), "datum.sock");

        try {
            AFUNIXServerSocket server = AFUNIXServerSocket.newInstance();
            server.bind(new AFUNIXSocketAddress(socketFile));
            System.out.println("Server: " + server);

            while (!Thread.interrupted()) {
                System.out.println("Waiting for connection...");
                try {
                    Socket sock = server.accept();
                    System.out.println("Connected: " + sock);
                    InputStream is = sock.getInputStream();
                    OutputStream os = sock.getOutputStream();
                    //Converts input data to string and then to JSONObject.
                    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                    StringBuilder in = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        in.append(line);
                    }
                    System.out.println(in.toString());
                    reader.close();
                    try {
                        JSONObject data = new JSONObject(in.toString());
                        //Acts on the request sent by the client program.
                        String request = data.getString("request");

                        if (request.equals("new_keypair")) {
                            //Generate new keypair and send public key to client
                            try {
                                NtruEncryptKey key = EncryptTools.setupKeyPair();
                                keyPairs.put(sock, key);
                                os.write(key.getPubKey());
                            } catch (NtruException e) {
                                System.out.println(e);
                            }

                        } else if (request.equals("encrypt_with_pubKey")) {
                            byte[] pubKey = data.getString("pubKey").getBytes();
                            byte[] channelKey = data.getString("channelKey").getBytes();
                            try {
                                byte[] encryptedKey = EncryptTools.encryptWithPublicKey(pubKey, channelKey);
                                os.write(encryptedKey);
                            } catch (NtruException e) {
                                System.out.println(e);
                            }

                        } else if (request.equals("decrypt_message")) {
                            //Decrypt message and send unencrypted data to client
                            String cipherText = data.getString("message");
                            try {
                                byte[] plainText = EncryptTools.decryptMessage(cipherText, keyPairs.get(sock));
                                os.write(plainText);
                            } catch (NtruException e) {
                                System.out.println(e);
                            }
                        }
                        os.flush();
                    } catch (JSONException e) {
                        System.out.println("Incorrect input format");
                        os.write("Incorrect".getBytes());
                        sock.close();
                    }
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }

}