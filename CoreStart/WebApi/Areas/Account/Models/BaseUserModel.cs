namespace WebApi.Areas.Account.Models
{
    public abstract class BaseUserModel
    {
        public long Id { get; set; }

        public string Login { get; set; }

        public string FullName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public bool IsActive { get; set; }
    }
}
