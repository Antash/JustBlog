using System.Data.Entity;

namespace JustBlog.Core
{
    public class BlogInitializer : DropCreateDatabaseIfModelChanges<BlogDbContext>
    {
        protected override void Seed(BlogDbContext context)
        {
            //context.SaveChanges();
        }
    }
}
