using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LoginRegisterServer.Application.Features.Users.GetAllUser;
internal sealed class GetAllUserQueryHandler(
    UserManager<AppUser> userManager,
    IAppUserRepository appUserRepository) : IRequestHandler<GetAllUserQuery, Result<List<AppUser>>>
{
    public async Task<Result<List<AppUser>>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
    {
        var user = await appUserRepository.GetAll().ToListAsync(cancellationToken);

        return Result<List<AppUser>>.Succeed(user);
    }
}
