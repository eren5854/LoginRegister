using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.ForgotPassword;
internal sealed class ForgotPasswordCommandHandler(
    UserManager<AppUser> userManager) : IRequestHandler<ForgotPasswordCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Result<string>.Failure("User not found");
        }

        string token = await userManager.GeneratePasswordResetTokenAsync(user);

        return token;
    }
}
