using ED.GenericRepository;
using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.ChangePassword;
internal sealed class ChangePasswordCommandHandler(
    UserManager<AppUser> userManager,
    IUnitOfWork unitOfWork) : IRequestHandler<ChangePasswordCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByIdAsync(request.Id.ToString());
        if (user is null)
        {
            return Result<string>.Failure("User not found");
        }

        IdentityResult result = await userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (!result.Succeeded)
        {
            return Result<string>.Failure("Eski şifre yanış");
        }
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<string>.Succeed("Passwrod change is successful");
    }
}