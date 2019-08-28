﻿namespace AuthorizeLogin
{
    public class JwtConfigurationSettings
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string Key { get; set; }

        public int ExpiresMinutes { get; set; }
    }
}
