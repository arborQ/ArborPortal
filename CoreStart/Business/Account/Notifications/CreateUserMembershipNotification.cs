using MediatR;

namespace CoreStart.Business.Account.Notifications
{
    public class CreateUserMembershipNotification : INotification
    {
        public string MembershipIdentifier { get; set; }

        public string MembershipKey { get; set; }
    }
}
