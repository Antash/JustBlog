using JustBlog.Core.Models;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;

namespace JustBlog.Core
{
    public class BlogRepository : IBlogRepository
	{
        [Dependency]
        internal BlogDbContext Context { get; set; }

        public IList<Post> Posts(int pageNo, int pageSize, string sortColumn, bool sortByAscending)
        {
            return Context.Posts.ToList();
        }

        public int AddPost(Post post)
        {
            return Context.Posts.Add(post).Id;
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return Context.Posts.Count();
        }

        public int AddComment(Comment comment)
        {
            return Context.Comments.Add(comment).Id;
        }

        public IList<Comment> Comments()
        {
            return Context.Comments.ToList();
        }
    }
}