using System;
using System.IO;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database;
using ExternalUsersIntegrationService.Jobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NoSqlDatabase;
using Quartz.DependencyInjection.Microsoft.Extensions;

namespace ExternalUsersIntegrationService
{
    class Program
    {
        static void Main(string[] args)
        {
            IConfiguration config = new ConfigurationBuilder()
                      .SetBasePath(Directory.GetCurrentDirectory())
                      .AddJsonFile("appsettings.json", false, true)
                      .Build();
            var services = new ServiceCollection();
            services.AddTransient<MongoDatabaseContext>();
            services.AddTransient(typeof(IDatabaseContext), InitializeDatabaseContext.ResolveDatabaseContextType());
            services.AddTransient<ExternalUsersSync>();
            services.AddDbContext<DatabaseContext>(options =>
            {
                string conString =
                       ConfigurationExtensions
                       .GetConnectionString(config, "DefaultConnection");

                Console.WriteLine(conString);

                options.UseSqlServer(conString);
            }, ServiceLifetime.Scoped);

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSeq(config.GetSection("Seq"));
            });

            services.AddQuartz();
            var serviceProvider = services.BuildServiceProvider();

            Task.Run(async () => await StartQuartz.Start(serviceProvider));
            Console.ReadLine();
        }
    }
}
