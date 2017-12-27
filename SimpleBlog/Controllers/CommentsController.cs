using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Core;
using SimpleBlog.Core.Models;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private IBlogRepository Repository { get; }

        public CommentsController(IBlogRepository blogRepository)
        {
            Repository = blogRepository;
        }

        [HttpGet]
        public IActionResult All()
        {
            return new JsonResult(new { data = Repository.Comments() });
        }

        [HttpPost]
        public void Add(Comment comment)
        {
            Repository.AddComment(comment);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Repository.DeleteComment(id);
        }

        [HttpGet("like/{id}")]
        public void Like(int id)
        {
            Repository.LikeComment(id);
        }
    }
}