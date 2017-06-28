using JustBlog.Core.Models;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;
using System;

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
            var newPost = Context.Posts.Add(post);
            Context.SaveChanges();
            return newPost.Id;
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return Context.Posts.Count();
        }

        public int AddComment(Comment comment)
        {
            var newComment = Context.Comments.Add(comment);
            Context.SaveChanges();
            return newComment.Id;
        }

        public IList<Comment> Comments()
        {
            return Context.Comments.ToList();
        }

        public void DeleteComment(int id)
        {
            var comment = Context.Comments.Single(c => c.Id == id);
            if (comment != null)
            {
                Context.Comments.Remove(comment);
                Context.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException();
            }
        }

        public void LikeComment(int id)
        {
            var comment = Context.Comments.Single(c => c.Id == id);
            if (comment != null)
            {
                comment.Likes++;
                Context.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException();
            }
        }
    }
}