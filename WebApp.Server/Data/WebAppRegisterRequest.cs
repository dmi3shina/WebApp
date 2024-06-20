namespace WebApp.Server.Data
{
    public class WebAppRegisterRequest
    {
        public WebAppRegisterRequest() { }

        public required string CompanyName { get; init; }
        public required int IndustryId { get; init; }
        public required string FirstName { get; init; }
        public required string LastName { get; init; }
        public required string UserName { get; init; }
        public required string Password { get; init; }
        public string? Email { get; init; }
    }
}
