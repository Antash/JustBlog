using JustBlog.Core.Objects;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.Transform;
using System.Collections.Generic;
using System.Linq;

namespace JustBlog.Core
{
	public class BlogRepository : IBlogRepository
	{
		// NHibernate object
		private readonly ISession _session;

		public BlogRepository(ISession session)
		{
			_session = session;
		}

        public IList<Post> Posts(int pageNo, int pageSize, string sortColumn,
                                            bool sortByAscending)
        {
            IList<Post> posts;
            IList<int> postIds;

            switch (sortColumn)
            {
                case "Title":
                    if (sortByAscending)
                    {
                        posts = _session.Query<Post>()
                                        .OrderBy(p => p.Title)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderBy(p => p.Title)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    else
                    {
                        posts = _session.Query<Post>()
                                        .OrderByDescending(p => p.Title)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderByDescending(p => p.Title)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    break;
                case "Published":
                    if (sortByAscending)
                    {
                        posts = _session.Query<Post>()
                                        .OrderBy(p => p.Published)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderBy(p => p.Published)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    else
                    {
                        posts = _session.Query<Post>()
                                        .OrderByDescending(p => p.Published)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderByDescending(p => p.Published)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    break;
                case "PostedOn":
                    if (sortByAscending)
                    {
                        posts = _session.Query<Post>()
                                        .OrderBy(p => p.PostedOn)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderBy(p => p.PostedOn)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    else
                    {
                        posts = _session.Query<Post>()
                                        .OrderByDescending(p => p.PostedOn)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                        .Where(p => postIds.Contains(p.Id))
                                        .OrderByDescending(p => p.PostedOn)
                                        .FetchMany(p => p.Tags)
                                        .ToList();
                    }
                    break;
                case "Modified":
                    if (sortByAscending)
                    {
                        posts = _session.Query<Post>()
                                        .OrderBy(p => p.Modified)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderBy(p => p.Modified)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    else
                    {
                        posts = _session.Query<Post>()
                                        .OrderByDescending(p => p.Modified)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderByDescending(p => p.Modified)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    break;
                case "Category":
                    if (sortByAscending)
                    {
                        posts = _session.Query<Post>()
                                        .OrderBy(p => p.Category.Name)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderBy(p => p.Category.Name)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    else
                    {
                        posts = _session.Query<Post>()
                                        .OrderByDescending(p => p.Category.Name)
                                        .Skip(pageNo * pageSize)
                                        .Take(pageSize)
                                        .Fetch(p => p.Category)
                                        .ToList();

                        postIds = posts.Select(p => p.Id).ToList();

                        posts = _session.Query<Post>()
                                          .Where(p => postIds.Contains(p.Id))
                                          .OrderByDescending(p => p.Category.Name)
                                          .FetchMany(p => p.Tags)
                                          .ToList();
                    }
                    break;
                default:
                    posts = _session.Query<Post>()
                                    .OrderByDescending(p => p.PostedOn)
                                    .Skip(pageNo * pageSize)
                                    .Take(pageSize)
                                    .Fetch(p => p.Category)
                                    .ToList();

                    postIds = posts.Select(p => p.Id).ToList();

                    posts = _session.Query<Post>()
                                      .Where(p => postIds.Contains(p.Id))
                                      .OrderByDescending(p => p.PostedOn)
                                      .FetchMany(p => p.Tags)
                                      .ToList();
                    break;
            }

            return posts;
        }

        public int AddPost(Post post)
        {
            using (var tran = _session.BeginTransaction())
            {
                _session.Save(post);
                tran.Commit();
                return post.Id;
            }
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return _session.Query<Post>()
                    .Where(p => !checkIsPublished || p.Published == true)
                    .Count();
        }
	}
}