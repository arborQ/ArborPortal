using System;
using System.Collections.Specialized;
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

            await sched.Start();

            // define the job and tie it to our HelloJob class
            IJobDetail job = JobBuilder.Create<ExternalUsersSync>()
                .Build();

            // Trigger the job to run now, and then every 40 seconds
            ITrigger trigger = TriggerBuilder.Create()
                .StartNow()
                .WithCronSchedule("0 0 1 * * ?")
            .Build();

            await sched.ScheduleJob(job, trigger);
        }
    }
}
