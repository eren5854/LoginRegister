using ED.Result;
using GenericEmailService;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.SendForgotPasswordEmail;
internal sealed class SendForgotPasswordEmailCommandHandler(
    UserManager<AppUser> userManager) : IRequestHandler<SendForgotPasswordEmailCommand, Result<string>>
{
    public async Task<Result<string>> Handle(SendForgotPasswordEmailCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Result<string>.Failure("User not found");
        }
        string body = CreateBody(user);
        string subject = "ForgotPassword";

        EmailConfigurations emailConfigurations = new(
           "smtp-mail.outlook.com",
           "bvojhoufxdomhfdb",
           587,
           false,
           true);

        EmailModel<Stream> emailModel = new(
            emailConfigurations,
            "erendelibas58@outlook.com",
            new List<string> { user.Email ?? "" },
            subject,
            body,
            null);

        await EmailService.SendEmailWithMailKitAsync(emailModel);

        return Result<string>.Succeed("Yeni şifre maili gönderildi");
    }

    private string CreateBody(AppUser user)
    {
        string body = $@"Şifrenizi değiştirmek için aşağıdaki linke tıklayın
<a href='http://localhost:4200/forgot-password/{user.Email}' target='_blank'>Şifrenizi değiştirmek için tıklayın
</a>";
        return body;
    }
}
