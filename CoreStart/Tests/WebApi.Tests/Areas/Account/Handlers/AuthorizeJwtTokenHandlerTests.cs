using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using WebApi.Areas.Account.Handlers;
using Xunit;

namespace WebApi.Tests.Areas.Account.Handlers
{
    public class AuthorizeJwtTokenHandlerTests
    {
        [Fact]
        public async Task AuthorizeJwtTokenHandler_Github_Authorized()
        {
            var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VVkZRalZGUWtKQk0wVkVORFJFUlRoQlJETXhORVJGTVRORk5ERXhNamhHTXpNME1rVkVRZyJ9.eyJuaWNrbmFtZSI6ImFyYm9yUSIsIm5hbWUiOiIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzMC5naXRodWJ1c2VyY29udGVudC5jb20vdS83NzA0MTIzP3Y9NCIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTA0VDE1OjExOjQ1LjA2OVoiLCJpc3MiOiJodHRwczovL2Rldi1rZzJ2YTd5My5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDc3MDQxMjMiLCJhdWQiOiJ0eWxWcURWeUQ5d0U5eU9weTV2aGFibHZ4NW1JTk03MSIsImlhdCI6MTU1NDM5MDcwNSwiZXhwIjoxNTU0NDI2NzA1LCJhdF9oYXNoIjoiQVhCSXZWbDVLZzk2cTFJb1ZYS3FsdyIsIm5vbmNlIjoiLjJ1Rm9OeGQyUmNlOV8yM0p3Q35GeVJVTWVDZ2tqLkQifQ.fyuyjhu_FJx4O8ks8CrYRN5jQQeeisajRfP4qLCzRjbcDXyVuE_noHr-3VRMDMiP9UmD6hJJS48M7mCL1EBwysYIzHvqSxFA6V_TaPxzTYgbG1jCAHkPa2f9C3UtjgBhUVxE-1dNoQ9MppjqE1ZKD2s1uChvXB4X2ybkj9Z8M3cliX1gbhDb7af1vQvhEAMcQi9nVj1xwezHbGtxix-AXG1ITv29AST0WYyswAcIi5vevi03oWC8DqiiOkUN9Eg-NuLPGywOMYGeA1dT1oyMrK3KpTa8W-0LWbVG5CzpGz8S2yH7YDULq6OHphH22ia7SoquxcjQu50ciraaBojePA";

            var autt = new AuthorizeJwtTokenHandler();

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                JwtToken = token
            }, new CancellationToken());

            result.Should().NotBeNull();

            result.IsAuthorized.Should().BeTrue();

            result.Source.Should().NotBeNullOrEmpty();
            result.Source.Should<string>().Be("github");

            result.UserId.Should().NotBeNull();
            result.UserId.Should().Be(7704123);

            result.UserName.Should().Be("arborQ");

            result.ExpireDate.Should().Be(new DateTime(2019, 4, 5, 1, 11, 45));
        }

        [Fact]
        public async Task AuthorizeJwtTokenHandler_Github_NotAuthorized()
        {
            var autt = new AuthorizeJwtTokenHandler();

            var result = await autt.Handle(new WebApi.Areas.Account.Models.JwtAuthorizeModel
            {
                JwtToken = "invalid_jwt_token"
            }, new CancellationToken());

            result.IsAuthorized.Should().BeFalse();
        }
    }
}
