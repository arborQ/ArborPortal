using Data.Entity;
using Elasticsearch.Net;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using Structure.Services;
using System;
using System.Linq;
using WebApi.Services;

namespace CoreStart.WebApi
{
    internal static class InitializeServices
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            var declarations = Business.Authorize.InitializeServices.Register()
                .Concat(Business.Account.InitializeServices.Register())
                .Concat(Data.Search.RegisterSearch.ResolveIndexer())
                .ToList();

            var esNode = configuration.GetValue<string>("ElasticSearch:DefaultNode");
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.WriteLine($"ElasticSearch: {esNode}");

            var functionDeclarations = Data.Search.RegisterSearch.ResolveIndexerFunctions(new[] { esNode })
                .ToList();

            services.AddSingleton<ICryptography, CryptographyService>();

            foreach (var functionDeclaration in functionDeclarations)
            {
                services.AddTransient(functionDeclaration.InstanceType, (sp) => functionDeclaration.ResolveService());
            }

            foreach (var declaration in declarations)
            {
                services.AddTransient(declaration.DeclarationType, declaration.InstanceType);
            }

            services.AddMediatR();
            services.AddHttpContextAccessor();
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string conString =
                       ConfigurationExtensions
                       .GetConnectionString(configuration, "DefaultConnection");

                Console.BackgroundColor = ConsoleColor.Blue;
                Console.WriteLine(conString);

                options.UseSqlServer(conString);
            }, ServiceLifetime.Scoped);

            return services;
        }
    }
}