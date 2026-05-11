package com.opencode.flowerrates.crypto

import java.security.MessageDigest
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

object CryptoJSCompat {

    private const val AES_KEY = "EMoal12sdfbLj@ajh1njkasjdhfkhGBBjML"
    private const val SALT_MAGIC = "Salted__"
    private const val KEY_SIZE = 32
    private const val IV_SIZE = 16
    private const val SALT_SIZE = 8

    fun encrypt(plainText: String): String {
        val salt = ByteArray(SALT_SIZE)
        SecureRandom().nextBytes(salt)

        val (key, iv) = deriveKeyAndIV(AES_KEY.toByteArray(Charsets.UTF_8), salt)

        val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
        cipher.init(Cipher.ENCRYPT_MODE, SecretKeySpec(key, "AES"), IvParameterSpec(iv))

        val ciphertext = cipher.doFinal(plainText.toByteArray(Charsets.UTF_8))

        val salted = SALT_MAGIC.toByteArray(Charsets.UTF_8) + salt + ciphertext
        return Base64.getEncoder().encodeToString(salted)
    }

    private fun deriveKeyAndIV(password: ByteArray, salt: ByteArray): Pair<ByteArray, ByteArray> {
        val md5 = MessageDigest.getInstance("MD5")
        val passSalt = password + salt
        val totalLen = KEY_SIZE + IV_SIZE

        val derived = mutableListOf<Byte>()
        var previous: ByteArray? = null

        while (derived.size < totalLen) {
            val input = if (previous != null) previous + passSalt else passSalt
            val hash = md5.digest(input)
            derived.addAll(hash.toList())
            previous = hash
        }

        val combined = derived.toByteArray()
        val key = combined.copyOfRange(0, KEY_SIZE)
        val iv = combined.copyOfRange(KEY_SIZE, totalLen)

        return Pair(key, iv)
    }
}
