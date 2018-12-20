namespace Structure.Services
{
    public interface ICryptography
    {
        string HashPassword(string password, byte[] salt);

        byte[] GenerateSalt();
    }
}
