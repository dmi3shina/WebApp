using Microsoft.AspNetCore.Identity;

namespace WebApp.Server.Data
{
    public class WebAppUser : IdentityUser
    {
        public string? CompanyName { get; set; }
        public int IndustryId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
