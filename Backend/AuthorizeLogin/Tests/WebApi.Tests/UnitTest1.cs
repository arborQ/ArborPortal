using AuthorizeLogin.Areas.Authorize.Services;
using AuthorizeLogin.Persistance.Database.Helpers;
using NUnit.Framework;

namespace Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void PasswordHashHelper_dsads_ShouldHashPassword()
        {
            var saltValue = PasswordHashHelper.GetSaltValue();
            var newSalt = PasswordHashHelper.GetSalt(saltValue);
            var str = System.Text.Encoding.UTF8.GetString(newSalt, 0, newSalt.Length);
            var hash = PasswordHashHelper.HashPassword("test1234!", newSalt);

            Assert.IsNotEmpty(hash);
        }
    }
}