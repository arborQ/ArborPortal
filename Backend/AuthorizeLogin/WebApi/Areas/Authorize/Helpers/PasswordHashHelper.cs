using System;
using System.Security.Cryptography;
using System.Text;

namespace AuthorizeLogin.Areas.Authorize.Services
{
    public static class PasswordHashHelper
    {
        public static byte[] HashPassword(string password, byte[] salt)
        {
            byte[] passwordBytes = UTF8Encoding.UTF8.GetBytes(password);

            byte[] preHashed = new byte[salt.Length + passwordBytes.Length];
            System.Buffer.BlockCopy(passwordBytes, 0, preHashed, 0, passwordBytes.Length);
            System.Buffer.BlockCopy(salt, 0, preHashed, passwordBytes.Length, salt.Length);

            SHA1 sha1 = SHA1.Create();

            return sha1.ComputeHash(preHashed);
        }

        public static byte[] GetSalt(int salt)
        {
            var saltBytes = new byte[4];
            saltBytes[0] = (byte)(salt >> 24);
            saltBytes[1] = (byte)(salt >> 16);
            saltBytes[2] = (byte)(salt >> 8);
            saltBytes[3] = (byte)(salt);

            return saltBytes;
        }

        public static int GetSaltValue()
        {
            var rng = new RNGCryptoServiceProvider();
            byte[] saltBytes = new byte[4];
            rng.GetNonZeroBytes(saltBytes);

            return (((int)saltBytes[0]) << 24) + (((int)saltBytes[1]) << 16) + (((int)saltBytes[2]) << 8) + ((int)saltBytes[3]);
        }
    }
}
