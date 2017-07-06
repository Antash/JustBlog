using System.Web.Mvc;
using System.Web.UI;
using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Utils;

namespace JustBlog.Controllers
{
    public class CommentController
    {
        private readonly IBlogRepository _blogRepository;

        public CommentController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public JsonCamelCaseResult Comments()
        {
            return new JsonCamelCaseResult(new { data = _blogRepository.Comments() }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(Comment comment)
        {
            _blogRepository.AddComment(comment);
            return new JsonCamelCaseResult("Add success", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteComment(int id)
        {
            _blogRepository.DeleteComment(id);
            return new JsonCamelCaseResult("Delete success", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult LikeComment(int id)
        {
            _blogRepository.LikeComment(id);
            return new JsonCamelCaseResult("Like success", JsonRequestBehavior.AllowGet);
        }
    }
}