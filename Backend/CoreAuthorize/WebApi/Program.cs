﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace AuthorizeLogin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
            .CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel()
                .ConfigureKestrel((context, options) =>
                    {
                        // Set properties and call methods on options
                    });
    }
}
