using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BlazorStart.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace BlazorStart {
    public class Startup {
        public Startup (IWebHostEnvironment env) {
            var builder = new ConfigurationBuilder ()
                .SetBasePath (env.ContentRootPath)
                .AddJsonFile ("appsettings.json", optional : true, reloadOnChange : true)
                .AddJsonFile ($"appsettings.{env.EnvironmentName}.json", optional : true)
                .AddEnvironmentVariables ();
            Configuration = builder.Build ();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices (IServiceCollection services) {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddScoped<AuthorizeService>();
            services.AddScoped<RecipeService>();
            services.AddScoped<FavouriteService>();
            services.AddScoped<HttpClient>(s => {
                return new HttpClient {
                BaseAddress = new Uri ("http://localhost:5000")
                };
            });
            services.AddLocalization (opts => { opts.ResourcesPath = "Resources"; });
            services.Configure<RequestLocalizationOptions> (
                opts => {
                    var supportedCultures = new List<CultureInfo> {
                    new CultureInfo ("en-GB"),
                    new CultureInfo ("en-US"),
                    new CultureInfo ("en"),
                    new CultureInfo ("pl-PL"),
                    new CultureInfo ("pl"),
                    };

                    opts.DefaultRequestCulture = new RequestCulture ("pl-PL");
                    // Formatting numbers, dates, etc.
                    opts.SupportedCultures = supportedCultures;
                    // UI strings that we have localized.
                    opts.SupportedUICultures = supportedCultures;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseStaticFiles ();

            app.UseRouting ();

            app.UseEndpoints (endpoints => {
                endpoints.MapBlazorHub ();
                endpoints.MapFallbackToPage ("/_Host");
            });

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>> ();
            app.UseRequestLocalization (options.Value);

        }
    }
}