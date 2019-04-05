﻿using System;
using System.Diagnostics.CodeAnalysis;
using System.Text;
using Castle.Windsor;
using Castle.Windsor.MsDependencyInjection;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.WebApi;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using WebApi.Areas.Account.Responses;
using WebApi.Models;
using WebApi.Services;

namespace CoreStart
{
    [ExcludeFromCodeCoverage]
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var castleContainer = new WindsorContainer();
            services.Configure<WebConfiguration>(Configuration);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AuthorizedClaimAccess", policy => policy.RequireClaim(nameof(AuthorizeResponseModel.UserId)));
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            //services.AddAuthentication(options =>
            //  {

            //      options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //      options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            //      options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            //  })
            //    .AddJwtBearer(cfg =>
            //    {
            //        var ValidIssuer = Configuration.GetValue<string>($"Jwt:Issuer");
            //        var ValidAudience = Configuration.GetValue<string>($"Jwt:Audience");
            //        var JwtKey = Configuration.GetValue<string>($"Jwt:Key");

            //        cfg.RequireHttpsMetadata = false;
            //        cfg.SaveToken = true;
            //        cfg.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidIssuer = ValidIssuer,
            //            ValidAudience = ValidAudience,
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey)),
            //            ClockSkew = TimeSpan.Zero // remove delay of token when expire
            //        };
            //    });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserPrincipalService, CurrentUserPrincipalProvider>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "Swagger XML Api Demo",
                    Version = "v1"
                });
            });

            services
                .RegisterServices(Configuration, castleContainer)
                .AddMvc()
                .AddFluentValidation()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            return WindsorRegistrationHelper.CreateServiceProvider(castleContainer, services);
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
                app.UseHsts();
            }
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Swagger XML Api Demo v1");
            });

            //app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}