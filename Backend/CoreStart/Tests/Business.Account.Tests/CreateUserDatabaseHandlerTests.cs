using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Handlers.Users;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Moq;
using Xunit;

namespace Business.Account.Tests
{
    public class CreateUserDatabaseHandlerTests
    {
        //[Fact]
        //public async Task CreateUserDatabaseHandler_NoUser_ThrowsException()
        //{
        //    // Assign
        //    var unitOfWorkMock = new Mock<AccountUnitOfWork>();
        //    var mediatorMock = new Mock<IMediator>();
        //    var userValidator = new Mock<IValidator<IUser>>();

        //    userValidator.Setup(v => v.Validate(It.IsAny<IUser>()))
        //        .Returns(
        //            new ValidationResult(new[] { new ValidationFailure("aa", "")
        //        }));

        //    var handler = new CreateUserDatabaseHandler(
        //        unitOfWorkMock.Object,
        //        mediatorMock.Object,
        //        new[] { userValidator.Object }
        //        );

        //    // Act
        //    await handler.Handle(new CreateRequestModel<IUser>
        //    {

        //    }, new CancellationToken());

        //    // Assert

        //    userValidator.Verify(v => v.Validate(It.IsAny<IUser>()), Times.Once);
        //}
    }
}
