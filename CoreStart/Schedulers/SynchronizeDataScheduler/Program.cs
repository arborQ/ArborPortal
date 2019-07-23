using System;
using System.Threading.Tasks;
using Quartz;
using Quartz.Impl;
using SynchronizeDataScheduler.Jobs;

namespace SynchronizeDataScheduler
{
    class Program
    {
        static void Main(string[] args)
        {
            var schedulerFactory = new StdSchedulerFactory();
            var scheduler = schedulerFactory.GetScheduler().GetAwaiter().GetResult();

            var trigger = TriggerBuilder
                .Create()
                .StartNow()
                .WithCronSchedule("0/15 * * ? * *")
                .Build();

            var processOutboxJob = JobBuilder.Create<UserSynchronizationJob>().Build();

            var awaiter = scheduler.ScheduleJob(processOutboxJob, trigger).GetAwaiter();
            awaiter.OnCompleted(() =>
            {
                Console.WriteLine("Complete?");
            });
            awaiter.GetResult();
            Console.WriteLine("Hello World!");
            Console.ReadKey();
        }
    }
}
