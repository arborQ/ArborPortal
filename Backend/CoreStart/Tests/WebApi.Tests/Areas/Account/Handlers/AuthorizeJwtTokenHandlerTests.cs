using System;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using WebApi.Areas.Account.Handlers;
using Xunit;

namespace WebApi.Tests.Areas.Account.Handlers
{
    public class AuthorizeJwtTokenHandlerTests
    {
        Mock<IOptions<JwtConfiguration>> JwtConfiguration = new Mock<IOptions<JwtConfiguration>>();

        [Fact]
        public async Task AuthorizeJwtTokenHandler_Facebook_Authorized()
        {
            var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VVkZRalZGUWtKQk0wVkVORFJFUlRoQlJETXhORVJGTVRORk5ERXhNamhHTXpNME1rVkVRZyJ9.eyJnaXZlbl9uYW1lIjoixYF1a2FzeiIsImZhbWlseV9uYW1lIjoiV8OzamNpayIsIm5pY2tuYW1lIjoixYF1a2FzeiBXw7NqY2lrIiwibmFtZSI6IsWBdWthc3ogV8OzamNpayIsInBpY3R1cmUiOiJodHRwczovL3Njb250ZW50Lnh4LmZiY2RuLm5ldC92L3QxLjAtMS9wNTB4NTAvNDM1NzY4NzNfMTAyMTUyODQzNjY2NTUzMTZfNTI1MjIwMjQ0OTg1NDI2NzM5Ml9uLmpwZz9fbmNfY2F0PTEwMyZfbmNfaHQ9c2NvbnRlbnQueHgmb2g9MTUwMDU4ZDUwNjVlNGZkMzY2MTJhNWU5MjQ1ODBjODAmb2U9NUQwNjk5RjAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNC0wNVQxMDozNTo0Mi4xMjJaIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LWtnMnZhN3kzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJmYWNlYm9va3wxNjE5Mjg2NjI4IiwiYXVkIjoidHlsVnFEVnlEOXdFOXlPcHk1dmhhYmx2eDVtSU5NNzEiLCJpYXQiOjE1NTQ0NjA1NDIsImV4cCI6MTU1NDQ5NjU0MiwiYXRfaGFzaCI6Ims0cFVUMHh3a2REZjVjYVpPRXZDNFEiLCJub25jZSI6IlE2eFM2OEJfbjBRT0FJN2pPWVlrM2tTS1Q4RDMtLWltIn0.r9tT81exHgL14jg9t713OWG-nN7jqLHLYqi0EOkxFPyv-DGdQsQiPPGWB30LmZOCCD9h2drWL3I8drF5Iepm56HjTFva2xDF8M7qCRZZCgvBB35dlbS-jpD9R5s4X0yQMPVc_mIiDfQVf28yuFSEqRUCHbchWW94Yo1ETgxMCXt7jexcl2uKiQJnUzrnsG19Vg3-FInDFu428WfnAgjs1bwh9mH61sdtdqu9-Dn5hhncXZbVW9TezSNt9hyhAH-HN4f5aVjHTMw7thT9zyyZhb6ncL2cINEjn6JN9mCjjxLdw6Ockq72ki5RakQkUviJkmoK-LxDO6AGNXIREiqyUQ";

            var autt = new AuthorizeJwtTokenHandler(JwtConfiguration.Object);

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                Token = token
            }, new CancellationToken());

            result.Should().NotBeNull();

            result.IsAuthorized.Should().BeTrue();

            result.Source.Should().NotBeNullOrEmpty();
            result.Source.Should<string>().Be("facebook");

            result.UserId.Should().NotBeNull();
            result.UserId.Should().Contain("1619286628");

            result.UserName.Should().Be("Łukasz Wójcik");

            result.ExpireDate.Should().Be(new DateTime(2019, 4, 5, 20, 35, 42));
        }

        [Fact]
        public async Task AuthorizeJwtTokenHandler_Google_Authorized()
        {
            var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VVkZRalZGUWtKQk0wVkVORFJFUlRoQlJETXhORVJGTVRORk5ERXhNamhHTXpNME1rVkVRZyJ9.eyJnaXZlbl9uYW1lIjoixYF1a2FzeiIsImZhbWlseV9uYW1lIjoiV8OzamNpayIsIm5pY2tuYW1lIjoiYXJib3Iuc29mdHdhcmUiLCJuYW1lIjoixYF1a2FzeiBXw7NqY2lrIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8teUstMEVubTV3dVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBbzAvT1pQUzBlVUFNNmMvcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6InBsIiwidXBkYXRlZF9hdCI6IjIwMTktMDQtMDVUMTA6Mjk6NTEuOTAzWiIsImVtYWlsIjoiYXJib3Iuc29mdHdhcmVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LWtnMnZhN3kzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjI3OTExMzg5NDk2NzY3NDY5MCIsImF1ZCI6InR5bFZxRFZ5RDl3RTl5T3B5NXZoYWJsdng1bUlOTTcxIiwiaWF0IjoxNTU0NDYwMTkyLCJleHAiOjE1NTQ0OTYxOTIsImF0X2hhc2giOiJXYlgzZ3p4RDVwTkhGZGVsN2txZUFBIiwibm9uY2UiOiJMT3duakFqbHhTRTZ1cjZjSHk1X25tcjN3SmtYOUlubSJ9.nRELToEVZoXqqrCnNEDLAO3EdvuNC3su1l2aWlpmHJvZ8Dt7g4rXv6jKS91E6U5k4ioCrw28MDTiVbaMuyEAzdLi6IfDMeI-GNGtQSrvJTvXxcn2k7yOgNzWQU1hIe46aZaDkYaGSrSNinXaN9ML7GFgUgI1AMJESDwiRSLVBxkALNjIiVPdK-0_A9vLaHriJDO0wnYOlmpVb-chqSQLY08BjK9Hobi7ZzBynis4nhfBtkuQz7aE45NYHg0tZMocelsFSZ9d0VBPoZNBRK1gVCqwMTty-wcv34xKk5jRcnzOsnM-BuFwZJHhGpwt1en61ZY1NohJ5bG3ieaCrLBWtg";

            var autt = new AuthorizeJwtTokenHandler(JwtConfiguration.Object);

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                Token = token
            }, new CancellationToken());

            result.Should().NotBeNull();

            result.IsAuthorized.Should().BeTrue();

            result.Source.Should().NotBeNullOrEmpty();
            result.Source.Should<string>().Be("google-oauth2");

            result.UserId.Should().NotBeNull();
            result.UserId.Should().Contain("106279113894967674690");

            result.UserName.Should().Be("arbor.software");

            result.ExpireDate.Should().Be(new DateTime(2019, 4, 5, 20, 29, 52));
        }

        [Fact]
        public async Task AuthorizeJwtTokenHandler_Github_Authorized()
        {
            var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VVkZRalZGUWtKQk0wVkVORFJFUlRoQlJETXhORVJGTVRORk5ERXhNamhHTXpNME1rVkVRZyJ9.eyJuaWNrbmFtZSI6ImFyYm9yUSIsIm5hbWUiOiIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzMC5naXRodWJ1c2VyY29udGVudC5jb20vdS83NzA0MTIzP3Y9NCIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTA0VDE1OjExOjQ1LjA2OVoiLCJpc3MiOiJodHRwczovL2Rldi1rZzJ2YTd5My5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDc3MDQxMjMiLCJhdWQiOiJ0eWxWcURWeUQ5d0U5eU9weTV2aGFibHZ4NW1JTk03MSIsImlhdCI6MTU1NDM5MDcwNSwiZXhwIjoxNTU0NDI2NzA1LCJhdF9oYXNoIjoiQVhCSXZWbDVLZzk2cTFJb1ZYS3FsdyIsIm5vbmNlIjoiLjJ1Rm9OeGQyUmNlOV8yM0p3Q35GeVJVTWVDZ2tqLkQifQ.fyuyjhu_FJx4O8ks8CrYRN5jQQeeisajRfP4qLCzRjbcDXyVuE_noHr-3VRMDMiP9UmD6hJJS48M7mCL1EBwysYIzHvqSxFA6V_TaPxzTYgbG1jCAHkPa2f9C3UtjgBhUVxE-1dNoQ9MppjqE1ZKD2s1uChvXB4X2ybkj9Z8M3cliX1gbhDb7af1vQvhEAMcQi9nVj1xwezHbGtxix-AXG1ITv29AST0WYyswAcIi5vevi03oWC8DqiiOkUN9Eg-NuLPGywOMYGeA1dT1oyMrK3KpTa8W-0LWbVG5CzpGz8S2yH7YDULq6OHphH22ia7SoquxcjQu50ciraaBojePA";

            var autt = new AuthorizeJwtTokenHandler(JwtConfiguration.Object);

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                Token = token
            }, new CancellationToken());

            result.Should().NotBeNull();

            result.IsAuthorized.Should().BeTrue();

            result.Source.Should().NotBeNullOrEmpty();
            result.Source.Should<string>().Be("github");

            result.UserId.Should().NotBeNull();
            result.UserId.Should().Contain("7704123");

            result.UserName.Should().Be("arborQ");

            result.ExpireDate.Should().Be(new DateTime(2019, 4, 5, 1, 11, 45));
        }

        [Fact]
        public async Task AuthorizeJwtTokenHandler_Github_NotAuthorized()
        {
            var autt = new AuthorizeJwtTokenHandler(JwtConfiguration.Object);

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                Token = "invalid_jwt_token"
            }, new CancellationToken());

            result.IsAuthorized.Should().BeFalse();
        }
    }
}
