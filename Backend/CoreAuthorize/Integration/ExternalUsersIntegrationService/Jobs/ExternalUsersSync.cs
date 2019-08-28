using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database;
using ExternalUsersIntegrationService.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NoSqlDatabase;
using NoSqlDatabase.Models;
using Quartz;
using DbUser = AuthorizeLogin.Persistance.Database.Models.User;

namespace ExternalUsersIntegrationService.Jobs
{
    public class ExternalUsersSync : IJob
    {
        private readonly MongoDatabaseContext _mongoDatabaseContext;
        private readonly IDatabaseContext _databaseContext;
        private readonly ILogger<ExternalUsersSync> _logger;

        public ExternalUsersSync(MongoDatabaseContext mongoDatabaseContext, IDatabaseContext databaseContext, ILogger<ExternalUsersSync> logger)
        {
            _mongoDatabaseContext = mongoDatabaseContext;
            _databaseContext = databaseContext;
            _logger = logger;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            _logger.LogInformation("ExternalUsersSync Started");
            var users = (await _mongoDatabaseContext.Users.GetItems(u => !string.IsNullOrEmpty(u.Email))).ToList();

            await users.ForEachWithCancellationToken(async item => await SyncExternalUser(item), context.CancellationToken);
            stopwatch.Stop();
            _logger.LogInformation($"ExternalUsersSync Finished in : {stopwatch.ElapsedMilliseconds}ms");
        }

        private async Task SyncExternalUser(User user)
        {
            _logger.LogInformation($"ExternalUsersSync try sync user: {user.Email}");
            var dbUserExists = await _databaseContext.Users.AnyAsync(u => u.EmailAddress == user.Email);

            if (!dbUserExists)
            {
                var newDbUser = new DbUser
                {
                    EmailAddress = user.Email,
                    FirstName = user.FirstName,
                    UserName = user.Email,
                    LastName = user.LastName
                };

                await _databaseContext.Users.AddAsync(newDbUser);
                await _databaseContext.SaveChangesAsync();
                _logger.LogInformation($"ExternalUsersSync added user: {user.Email}");
            }
            else
            {
                _logger.LogInformation($"ExternalUsersSync already sync'ed user: {user.Email}");
            }
        }
    }
}
