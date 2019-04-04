using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Services;
using Moq;
using WebApi.Areas.Account.Handlers;
using WebApi.Areas.Account.Responses;
using Xunit;

namespace WebApi.Tests.Areas.Account.Handlers
{
    public class CookieBasedAuthorizeHandlerTests
    {
        [Fact]
        public async Task CookieBasedAuthorizeHandler_DoNothing_IfNotAuthorized()
        {
            var contextMock = new Mock<IContextAccessor>();

            var handler = new CookieBasedAuthorizeHandler(contextMock.Object);

            await handler.Handle(new AuthorizeResponseModel { UserId = null }, new CancellationToken());

            contextMock.Verify(d => d.SignInAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<bool>()), Times.Never);
        }

        [Theory]
        [InlineData(2222, "longer_name")]
        [InlineData(111, "name")]
        [InlineData(1, "a")]
        public async Task CookieBasedAuthorizeHandler_UseClaims_IfAuthorized(long userId, string name)
        {
            var contextMock = new Mock<IContextAccessor>();

            var handler = new CookieBasedAuthorizeHandler(contextMock.Object);

            await handler.Handle(new AuthorizeResponseModel { UserId = userId, UserName = name }, new CancellationToken());

            contextMock.Verify(d => d.SignInAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<bool>()), Times.Once);
            // TODO: check claims
        }
    }
}
