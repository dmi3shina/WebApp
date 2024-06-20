using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Server.Data
{    public class ApplicationDbContext : IdentityDbContext<WebAppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        { }

        public DbSet<Industry> Industies { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Industry>().HasData(new Industry(1, "IT"), new Industry(2, "Automotive"), new Industry(3, "Healthcare"));

            builder.Entity<Industry>()
                .HasMany<WebAppUser>()
                .WithOne()
                .HasForeignKey(e => e.IndustryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}
