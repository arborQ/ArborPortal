using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Data.Entity;
using Elasticsearch.Net;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using Structure.Search;
using Structure.Services;
using System;
using System.Linq;
using System.Net;
using WebApi.Services;

namespace CoreStart.WebApi
{
    internal static class InitializeServices
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration, IWindsorContainer castle)
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

            castle.AddFacility<TypedFactoryFacility>();

            castle.Register(Component.For<ICryptography>().ImplementedBy<CryptographyService>().LifestyleSingleton());

            foreach (var functionDeclaration in functionDeclarations)
            {
                castle.Register(Component.For(functionDeclaration.InstanceType).Instance(functionDeclaration.ResolveService()).LifestyleSingleton());
            }

            foreach (var declaration in declarations)
            {
                castle.Register(Component.For(declaration.DeclarationType).ImplementedBy(declaration.InstanceType).Named(declaration.ComponentName).LifestyleTransient());
            }

            castle.Register(Component.For<ISearchIndexerFactory>().AsFactory());

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

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                var forwardedHeaders = ConfigurationExtensions
                       .GetConnectionString(configuration, "ForwardedHeaders");

                Console.WriteLine($"ForwardedHeaders: {forwardedHeaders}");

                if (!string.IsNullOrEmpty(forwardedHeaders))
                {
                    //options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
                    //options.KnownProxies.Add(IPAddress.Parse("172.22.0.1"));
                    options.KnownProxies.Add(IPAddress.Parse(forwardedHeaders));
                }
            });

            return services;
        }
    }
}