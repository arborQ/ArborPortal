﻿using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database;
using ExternalUsersEvents;
using ExternalUsersEvents.EventHandlers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ExternalUserEvents
{
    class Program
    {
        static async Task Main(string[] args)
        {
            IConfiguration config = new ConfigurationBuilder()
                     .SetBasePath(Directory.GetCurrentDirectory())
                     .AddJsonFile("appsettings.json", false, true)
                     .Build();
            var services = new ServiceCollection();
            services.AddTransient(typeof(IDatabaseContext), InitializeDatabaseContext.ResolveDatabaseContextType());
            //services.AddTransient<ExternalUsersSync>();
            services.AddDbContext<DatabaseContext>(options =>
            {
                string conString =
                       ConfigurationExtensions
                       .GetConnectionString(config, "DefaultConnection");

                Console.WriteLine(conString);

                options.UseSqlServer(conString);
            }, ServiceLifetime.Scoped);

            services.AddTransient<IEventHandler, CreateUserEventHandler>();
            services.AddTransient<QueueConnection>();

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSeq(config.GetSection("Seq"));
            });

            var provider = services.BuildServiceProvider();
            var queue = provider.GetService<QueueConnection>();

            var cts = new CancellationTokenSource();
            Task.Run(async () => {
                queue.Connect(cts.Token);
            });
            Console.WriteLine("Publish message?");
            await queue.Publish(Console.ReadLine());
            Console.WriteLine("Terminate?");
            Console.ReadLine();
            cts.Cancel();
        }
    }
}
