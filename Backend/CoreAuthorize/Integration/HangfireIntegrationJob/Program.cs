using System;
using Hangfire;
using Hangfire.SqlServer;

namespace HangfireIntegrationJob
{
    class Program
    {
        static void Main(string[] args)
        {
            GlobalConfiguration.Configuration
               .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
               .UseColouredConsoleLogProvider()
               .UseSimpleAssemblyNameTypeSerializer()
               .UseRecommendedSerializerSettings()
               .UseSqlServerStorage("Data Source=.;Initial Catalog=CoreAuthorizeLogin;Integrated Security=True;", new SqlServerStorageOptions
               {
                   CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                   SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                   QueuePollInterval = TimeSpan.Zero,
                   UseRecommendedIsolationLevel = true,
                   UsePageLocksOnDequeue = true,
                   DisableGlobalLocks = true
               });

            var jobId = BackgroundJob.Schedule(
                 () => Console.WriteLine("Delayed!"),
                 TimeSpan.FromSeconds(2));

            using (var server = new BackgroundJobServer())
            {
                Console.ReadLine();
            }
        }
    }
   
}
