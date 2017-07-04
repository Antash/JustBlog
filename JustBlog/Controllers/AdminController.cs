using System.Web.UI;
using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json.Serialization;
using JustBlog.Utils;

namespace JustBlog.Controllers
{
    //[Authorize]
    public class AdminController : Controller
    {
        private readonly IBlogRepository _blogRepository;

        public AdminController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        //[AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    return Redirect(returnUrl);

                return RedirectToAction("Manage");
            }

            ViewBag.ReturnUrl = returnUrl;

            return View();
        }

        //[HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false);

                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);

                    return RedirectToAction("Manage");
                }

                ModelState.AddModelError("", "The user name or password provided is incorrect.");
            }
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Login", "Admin");
        }

        public ActionResult Manage()
        {
            return View();
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