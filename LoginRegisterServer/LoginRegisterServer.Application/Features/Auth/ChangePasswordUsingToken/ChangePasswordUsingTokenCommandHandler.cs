using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.ChangePasswordUsingToken;
internal sealed class ChangePasswordUsingTokenCommandHandler(
    UserManager<AppUser> userManager) : IRequestHandler<ChangePasswordUsingTokenCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ChangePasswordUsingTokenCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Result<string>.Failure("User not found");
        }

        IdentityResult result = await userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
        if (!result.Succeeded)
        {
            return Result<string>.Failure("Error ");
        }

        return Result<string>.Succeed("New password is successful");
    }
}
