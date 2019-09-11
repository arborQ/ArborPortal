namespace AuthorizeLogin.Areas.Accounts.Models
{
    public class AccountModel
    {
        public long Id { get; set; }

        public bool IsActive { get; set; }

        public string Login { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
