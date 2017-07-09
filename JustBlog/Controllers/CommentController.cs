using System.Web.Mvc;
using System.Web.UI;
using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Utils;

namespace JustBlog.Controllers
{
    public class CommentController : Controller
    {
        private readonly IBlogRepository _blogRepository;

        public CommentController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None)]
        public JsonCamelCaseResult Comments()
        {
            return new JsonCamelCaseResult(new { data = _blogRepository.Comments() });
        }

        [HttpPost]
        public JsonCamelCaseResult Add(Comment comment)
        {
            _blogRepository.AddComment(comment);
            return new JsonCamelCaseResult("Add success");
        }

        [HttpPost]
        public JsonCamelCaseResult Delete(int id)
        {
            _blogRepository.DeleteComment(id);
            return new JsonCamelCaseResult("Delete success");
        }

        [HttpPost]
        public JsonCamelCaseResult Like(int id)
        {
            _blogRepository.LikeComment(id);
            return new JsonCamelCaseResult("Like success");
        }
    }
}