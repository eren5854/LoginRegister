using ED.GenericRepository;
using LoginRegisterServer.Domain.Entities;
using LoginRegisterServer.Infrastructure.Context;

namespace LoginRegisterServer.Infrastructure.Repository;
public sealed class AppUserRepository : Repository<AppUser, ApplicationDbContext>, IAppUserRepository
{
    public AppUserRepository(ApplicationDbContext context) : base(context)
    {
    }
}
