package com.datum.keygen;

import java.io.IOException;
import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.DataInputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.io.DataOutputStream;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;

import com.securityinnovation.jNeo.NtruException;
import com.securityinnovation.jNeo.OID;
import com.securityinnovation.jNeo.Random;
import com.securityinnovation.jNeo.ntruencrypt.NtruEncryptKey;


public class EncryptTools {

    public static NtruEncryptKey setupKeyPair() throws IOException, NtruException {
        Random prng = createSeededRandom();
        OID oid = OID.valueOf("ees1087ep2");
        return NtruEncryptKey.genKey(oid, prng);

    }

    public static byte[] decryptMessage(String message, NtruEncryptKey ntrukey) throws IOException, NtruException {
//        TODO: The below code is taken from the sample. Make sure that this is correct.

        // Parse the contents of the encrypted message
        DataInputStream in = new DataInputStream(new FileInputStream(message));
        byte[] ivBytes = new byte[in.readInt()];
        in.readFully(ivBytes);
        byte[] wrappedKey = new byte[in.readInt()];
        in.readFully(wrappedKey);
        byte[] encFileContents = new byte[in.readInt()];
        in.readFully(encFileContents);

        byte[] fileContents = null;
        try
        {
            // Unwrap the AES key
            byte[] aesKeyBytes = ntrukey.decrypt(wrappedKey);
            SecretKeySpec aesKey = new SecretKeySpec(aesKeyBytes, "AES");
            java.util.Arrays.fill(aesKeyBytes, (byte) 0);

            // Decrypt the message
            IvParameterSpec iv = new IvParameterSpec(ivBytes);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, aesKey, iv);
            fileContents = cipher.doFinal(encFileContents);
        } catch (java.security.GeneralSecurityException e) {
            System.out.println("AES error: " + e);
        }
        return fileContents;
    }


    static Random createSeededRandom()
    {
        byte seed[] = new byte[32];
        java.util.Random sysRand = new java.util.Random();
        sysRand.nextBytes(seed);
        Random prng = new Random(seed);
        return prng;
    }


}
