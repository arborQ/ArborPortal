using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ExternalUsersIntegrationService.Helpers
{
    public static class CollectionHelper
    {
        public static async Task ForEachWithCancellationToken<T>(this IEnumerable<T> collection, Func<T, Task> action, CancellationToken cancelationToken)
        {
            foreach (var item in collection)
            {
                if (cancelationToken.IsCancellationRequested)
                {
                    return;
                }

                await Task.Run(async () => await action(item));
            }
        }
    }
}
