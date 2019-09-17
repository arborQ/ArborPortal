using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilesWebApi.HealthChecks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FilesWebApi
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

            services
                .AddHealthChecks()
                .AddAzureBlobStorage("DefaultEndpointsProtocol=https;AccountName=externalusersyn8508;AccountKey=o1ptek69KVvqxwRxYQlu4y0aL5fWgpxLl4oaSP1ZLvC5kXwQv8vjNJ2QkW+iUICZakrzwORmiTT/3qIDweyiBQ==;EndpointSuffix=core.windows.net")
        ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHealthChecks("/api/health");

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
