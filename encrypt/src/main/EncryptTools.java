package main;

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
import com.sun.xml.internal.bind.v2.TODO;


public class EncryptTools {

    public static NtruEncryptKey setupKeyPair() throws IOException, NtruException {
        Random prng = createSeededRandom();
        OID oid = OID.valueOf("ees1087ep2");
        return NtruEncryptKey.genKey(oid, prng);

    }

    public static byte[] decryptMessage(String message, NtruEncryptKey ntrukey) {
        try
        {
//            TODO: decrypt message.
        } catch (java.security.GeneralSecurityException e) {
            System.out.println("Decryption Error: " + e);
        }
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
