using ED.GenericRepository;
using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.ConfirmEmail;
internal class ConfirmEmailCommandHandler(
    UserManager<AppUser> userManager,
    IUnitOfWork unitOfWork) : IRequestHandler<ConfirmEmailCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Result<string>.Failure("Kullanıcı bulunamadı");
        }

        if (user.EmailConfirmed)
        {
            return Result<string>.Failure("Mail adresi zaten onaylı");
        }

        user.EmailConfirmed = true;
        await userManager.UpdateAsync(user);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<string>.Succeed("Mail adresi başarıyla onaylandı");
    }
}
