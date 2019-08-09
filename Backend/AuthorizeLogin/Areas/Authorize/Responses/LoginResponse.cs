namespace AuthorizeLogin.Areas.Authorize.Responses
{
    public class LoginResponse
    {
        public string Token { get; private set; }

        public bool IsSuccessfull { get; private set; }

        internal static LoginResponse FailResponse => new LoginResponse { IsSuccessfull = false };

        internal static LoginResponse SuccessResponse(string token) => new LoginResponse { IsSuccessfull = true, Token = token };
    }
}
