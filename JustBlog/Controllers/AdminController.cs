using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Models;
using JustBlog.Utils;
using Newtonsoft.Json;
using System.Web.Mvc;
using System.Web.Security;

namespace JustBlog.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private readonly IBlogRepository _blogRepository;

        public AdminController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        [AllowAnonymous]
        public JsonCamelCaseResult Login(LoginModel model, string returnUrl)
        {
            if (IsAutorized())
            {
                return new JsonCamelCaseResult("success");
            }
            if (ModelState.IsValid)
            {
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false);
                    return new JsonCamelCaseResult("success");
                }
                ModelState.AddModelError("", "The user name or password provided is incorrect.");
            }
            return new JsonCamelCaseResult("fail");
        }

        public JsonCamelCaseResult Logout()
        {
            FormsAuthentication.SignOut();
            return new JsonCamelCaseResult("success");
        }

        [HttpPost]
        public ContentResult AddPost(Post post)
        {
            string json;

            if (ModelState.IsValid)
            {
                var id = _blogRepository.AddPost(post);

                json = JsonConvert.SerializeObject(new
                {
                    id = id,
                    success = true,
                    message = "Post added successfully."
                });
            }
            else
            {
                json = JsonConvert.SerializeObject(new
                {
                    id = 0,
                    success = false,
                    message = "Failed to add the post."
                });
            }

            return Content(json, "application/json");
        }

        private bool IsAutorized()
        {
            return System.Web.HttpContext.Current.User != null
                && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
        }
    }
}