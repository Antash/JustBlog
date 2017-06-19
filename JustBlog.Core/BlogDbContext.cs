using JustBlog.Core.Models;
using MySql.Data.Entity;
using System.Data.Entity;

namespace JustBlog.Core
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class BlogDbContext : DbContext
    {
        public BlogDbContext() : base("JustBlogDbConnString")
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<BlogDbContext>());
            Database.SetInitializer(new BlogInitializer());
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}
