using System;
using System.Reflection;
using AuthorizeLogin.HealthChecks;
using AuthorizeLogin.Persistance.Database;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace AuthorizeLogin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddMediatR(typeof(Startup).GetTypeInfo().Assembly);
            services.AddDbContext<DatabaseContext>(options =>
            {
                string conString =
                       ConfigurationExtensions
                       .GetConnectionString(Configuration, "DefaultConnection");

                Console.WriteLine(conString);

                options.UseSqlServer(conString);
            }, ServiceLifetime.Scoped);

            services.Configure<JwtConfigurationSettings>(Configuration.GetSection("Jwt"));
            services.AddTransient(typeof(IDatabaseContext), InitializeDatabaseContext.ResolveDatabaseContextType());
            services
                .AddHealthChecks()
                .AddCheck<DatabaseHealthCheck>("MsSql database exists check", failureStatus: HealthStatus.Degraded);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseHealthChecks("/api/health");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseForwardedHeaders();
            app.UseMvc();
        }
    }
}
