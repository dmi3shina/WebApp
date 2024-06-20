namespace WebApp.Server.Data
{
    public class Industry(int id, string? industryName)
    {
        public int Id { get; set; } = id;
        public string? IndustryName { get; set; } = industryName;
    }
}
