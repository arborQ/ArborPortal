using System;
using System.Threading.Tasks;
using Quartz;

namespace SynchronizeDataScheduler.Jobs
{
    public class UserSynchronizationJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            await Console.Out.WriteLineAsync("Synch user job working :)");
        }
    }
}
