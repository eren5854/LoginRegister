using ED.Result;
using GenericEmailService;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Application.Features.Auth.SendConfirmEmal;
internal sealed class SendConfirmEmailCommandHandler(
    UserManager<AppUser> userManager) : IRequestHandler<SendConfirmEmailCommand, Result<string>>
{
    public async Task<Result<string>> Handle(SendConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null) 
        {
            return Result<string>.Failure("User not found");
        }

        if (user.EmailConfirmed)
        {
            return Result<string>.Failure("Mail address already confirmed");
        }

        string body = CreateBody(user);
        string subject = "Verification Email";

        EmailConfigurations emailConfigurations = new(
           "smtp-mail.outlook.com",
           "*****",
           587,
           false,
           true);

        EmailModel<Stream> emailModel = new(
            emailConfigurations,
            "example@outlook.com",
            new List<string> { user.Email ?? "" },
            subject,
            body,
            null);

        await EmailService.SendEmailWithMailKitAsync(emailModel);

        //await mediator.Publish(new AppUserEvent(user.Id));

        return Result<string>.Succeed("Confirmation email sent successfully");
    }

    private string CreateBody(AppUser user)
    {
        string body = $@"Click on the link to confirm your email address.
<a href='http://localhost:4200/confirm-email/{user.Email}' target='_blank'>Click to confirm email
</a>";
        return body;
    }
}
