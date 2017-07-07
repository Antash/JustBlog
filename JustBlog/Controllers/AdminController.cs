using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Models;
using Newtonsoft.Json;
using System;
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

        [HttpPost, AllowAnonymous]
        public ContentResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false);
                    return Content("success");
                }
                ModelState.AddModelError("", "The user name or password provided is incorrect.");
            }
            return Content("fail");
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Login", "Admin");
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
    }
}