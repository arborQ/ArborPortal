using System;
using System.Collections.Specialized;
using System.Threading;
using System.Threading.Tasks;
using ExternalUsersIntegrationService.Jobs;
using Quartz;
using Quartz.Impl;

namespace ExternalUsersIntegrationService
{
    internal static class StartQuartz
    {
        public static async Task Start(IServiceProvider serviceProvider)
        {
            NameValueCollection props = new NameValueCollection
                {
                    { "quartz.serializer.type", "binary" }
                };
            StdSchedulerFactory factory = new StdSchedulerFactory(props);

            // get a scheduler
            IScheduler sched = await factory.GetScheduler();

            sched.JobFactory = new JobFactory(serviceProvider);
            var cts = new CancellationTokenSource();

            await sched.Start(cts.Token);

            // define the job and tie it to our HelloJob class
            IJobDetail job = JobBuilder.Create<ExternalUsersSync>()
                .Build();

            // Trigger the job to run now, and then every 40 seconds
            ITrigger trigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(a => a.WithIntervalInSeconds(100).RepeatForever())
            .Build();
            await sched.ScheduleJob(job, trigger, cancellationToken: cts.Token);
            Task.Run(async () =>
            {
                await Console.Out.WriteLineAsync("Wait 5s");
                await Task.Delay(5000);
                await Console.Out.WriteLineAsync("Start Killing!");
                await sched.Interrupt(job.Key, cts.Token);
                await Console.Out.WriteLineAsync("Killed!");
            });
            Console.ReadLine();
            
            //cts.Cancel();
            //await sched.Shutdown(true, cts.Token);
        }
    }
}
