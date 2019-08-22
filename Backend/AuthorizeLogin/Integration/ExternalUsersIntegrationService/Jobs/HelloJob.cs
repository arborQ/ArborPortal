using System;
using System.Linq;
using System.Threading.Tasks;
using NoSqlDatabase;
using Quartz;

namespace ExternalUsersIntegrationService.Jobs
{
    public class HelloJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            var mongo = new MongoDatabaseContext();

            var dd = await mongo.Users.GetAllItems();

            await Console.Out.WriteLineAsync($"HelloJob is executing: {dd.Count()}");

        }
    }
}
