using System.Web.Mvc;

namespace JustBlog.Controllers
{
    public class ReactController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}