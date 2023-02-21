using Microsoft.EntityFrameworkCore;

namespace Kosta_test.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Department> Department { get; set; } = null!;
        public DbSet<Employee> Employee { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
