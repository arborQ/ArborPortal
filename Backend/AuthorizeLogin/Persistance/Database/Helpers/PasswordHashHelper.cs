using System;
using System.Security.Cryptography;
using System.Text;

namespace AuthorizeLogin.Persistance.Database.Helpers
{
    public static class PasswordHashHelper
    {
        public static byte[] HashPassword(string password, int salt)
        {
            var byteSalt = GetSalt(salt);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            byte[] preHashed = new byte[byteSalt.Length + passwordBytes.Length];
            Buffer.BlockCopy(passwordBytes, 0, preHashed, 0, passwordBytes.Length);
            Buffer.BlockCopy(byteSalt, 0, preHashed, passwordBytes.Length, byteSalt.Length);

            SHA1 sha1 = SHA1.Create();

            return sha1.ComputeHash(preHashed);
        }

        public static byte[] GetSalt(int salt)
        {
            var saltBytes = new byte[4];
            saltBytes[0] = (byte)(salt >> 24);
            saltBytes[1] = (byte)(salt >> 16);
            saltBytes[2] = (byte)(salt >> 8);
            saltBytes[3] = (byte)salt;

            return saltBytes;
        }

        public static int GetSaltValue()
        {
            var rng = new RNGCryptoServiceProvider();
            byte[] saltBytes = new byte[4];
            rng.GetNonZeroBytes(saltBytes);

            return (saltBytes[0] << 24) + (saltBytes[1] << 16) + (saltBytes[2] << 8) + saltBytes[3];
        }
    }
}
