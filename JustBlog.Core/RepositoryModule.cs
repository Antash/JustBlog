using Ninject.Modules;
using Ninject.Web.Common;

namespace JustBlog.Core
{
    public class RepositoryModule : NinjectModule
	{
		public override void Load()
		{
            Bind<BlogDbContext>().To<BlogDbContext>().InRequestScope();
		}
	}
}