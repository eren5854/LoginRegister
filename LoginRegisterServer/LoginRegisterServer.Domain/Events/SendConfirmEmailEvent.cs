using FluentEmail.Core;
using GenericEmailService;
using LoginRegisterServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Domain.Events;
public sealed class SendConfirmEmailEvent(
    UserManager<AppUser> userManager,
    IFluentEmail fluentEmail) : INotificationHandler<AppUserEvent>
{
    public async Task Handle(AppUserEvent notification, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.FindByEmailAsync(notification.UserId.ToString());
        if (user is not null)
        {
            //await fluentEmail
            //    .To(user.Email)
            //    .Subject("Mail onayı")
            //    .Body(CreateBody(user), true)
            //    .SendAsync(cancellationToken);

            string body = CreateBody(user);
            string subject = "Verification Email";

            EmailConfigurations emailConfigurations = new(
             "smtp-mail.outlook.com",
             "jrshwtndwhseckly",
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
        }
    }
    private string CreateBody(AppUser user)
    {
        string body = $@"Mail adresinizi onaylamak için aşağıdaki linke tıklayın
<a href='http://localhost:4200/confirm-email/{user.Email}' target='_blank'>Maili Onaylamak için tıklayın
</a>";
        return body;
    }
}
