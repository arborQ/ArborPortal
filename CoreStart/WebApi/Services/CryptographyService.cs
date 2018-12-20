using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Structure.Services;
using System;
using System.Security.Cryptography;

namespace WebApi.Services
{
    public class CryptographyService : ICryptography
    {
        public byte[] GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        public string HashPassword(string password, byte[] salt)
        {
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8)
            );

            return hashed;
        }
    }
}
