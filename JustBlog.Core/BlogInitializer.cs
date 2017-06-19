using JustBlog.Core.Models;
using System;
using System.Data.Entity;

namespace JustBlog.Core
{
    //public class BlogInitializer : DropCreateDatabaseIfModelChanges<BlogDbContext>
    public class BlogInitializer : DropCreateDatabaseAlways<BlogDbContext>
    {
        protected override void Seed(BlogDbContext context)
        {
            context.Posts.Add(new Post()
            {
                Description = "Test post",
                Title = "Test post title",
                ShortDescription = "Test",
                PostedOn = DateTime.Now,
                Meta = "foo"
            });
            context.SaveChanges();
        }
    }
}
