using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace AuthorizeLogin.HealthChecks
{
    public class DatabaseHealthCheck : IHealthCheck
    {
        private readonly IDatabaseContext _databaseContext;

        public DatabaseHealthCheck(IDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            var databaseExists = await _databaseContext.Exists(cancellationToken);

            if (databaseExists)
            {
                return HealthCheckResult.Healthy("The check indicates a healthy result.");
            }

            return HealthCheckResult.Unhealthy("The check indicates an unhealthy result.");
        }
    }
}
