using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Reflection;
using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using CoreStart.CrossCutting.Structure;
using CoreStart.CrossCutting.Structure.Factories;
using CoreStart.CrossCutting.Structure.Handlers;
using CoreStart.CrossCutting.Structure.IoC;
using CoreStart.CrossCutting.Structure.Search;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.Data.Entity;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Services;

namespace CoreStart.WebApi
{
    [ExcludeFromCodeCoverage]
    internal static class InitializeServices
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration, IWindsorContainer castle)
        {
            var declarations = Business.Authorize.InitializeServices.Register()
                .Concat(Business.Account.Account.InitializeAccountServices.Register())
                .Concat(Business.Recipes.InitializeRecipesServices.Register())
                .Concat(Data.Search.RegisterSearch.ResolveIndexer())
                .Concat(Data.Entity.InitializeServices.Register())
                .Concat(Data.BlobStorage.InitializeServicesBlobs.Register())
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
            castle.Register(Component.For<ICreateItemStrategyFactory>().AsFactory());

            castle.Register(Component.For<IContextAccessor>().ImplementedBy<WebContextAccessor>().LifestyleSingleton());

            castle.Register(Classes.FromAssembly(Assembly.GetExecutingAssembly()).BasedOn(typeof(IMapperService<,>)).WithService.FromInterface(typeof(IMapperService<,>)));

            services.AddMediatR(
                typeof(CoreStart.WebApi.InitializeServices).GetTypeInfo().Assembly,
                typeof(Business.Authorize.InitializeServices).GetTypeInfo().Assembly,
                typeof(Business.Account.Account.InitializeAccountServices).GetTypeInfo().Assembly,
                typeof(Business.Recipes.InitializeRecipesServices).GetTypeInfo().Assembly,
                typeof(Data.Search.RegisterSearch).GetTypeInfo().Assembly,
                typeof(Data.Entity.InitializeServices).GetTypeInfo().Assembly,
                typeof(Data.BlobStorage.InitializeServicesBlobs).GetTypeInfo().Assembly
                );
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
                       .GetConnectionString(configuration, "ForwardedHeaders") ?? "127.0.0.1";

                Console.WriteLine($"ForwardedHeaders: {forwardedHeaders}");
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;

                if (!string.IsNullOrEmpty(forwardedHeaders))
                {
                    options.KnownProxies.Add(IPAddress.Parse(forwardedHeaders));
                }
            });

            return services;
        }
    }
}