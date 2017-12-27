using JustBlog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SimpleBlog.Core;
using SimpleBlog.Core.Models;

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
        public JsonResult Login(LoginModel model, string returnUrl)
        {
            if (IsAutorized())
            {
                return new JsonResult("success");
            }
            
            if (ModelState.IsValid)
            {
                /*
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false);
                    return new JsonResult("success");
                }
                ModelState.AddModelError("", "The user name or password provided is incorrect.");
                */
                return new JsonResult("success");
            }
                return new JsonResult("fail");
        }

        public JsonResult Logout()
        {
            //FormsAuthentication.SignOut();
            return new JsonResult("success");
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
            return true;
        }
    }
}